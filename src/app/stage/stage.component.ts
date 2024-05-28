import {Component, computed, HostListener, Input, OnInit, signal} from '@angular/core';
import init, {add_editor, add_viewer, is_data_dirty, read_data_for_save} from "../../assets/stage/wasm_stage"
import {BackendService} from "../service/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VereinStageSetupDTO} from "../rest";
import {Router} from "@angular/router";
import {combineLatestWith, delay, Observable, of} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {UnsavedChangesDialogComponent} from "../unsaved-changes-dialog/unsaved-changes-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  @Input({required: false})
  readOnly = false;

  maxFileSize = 4 * 1024 * 1024;

  canvasId = 'stage-canvas';

  stageSetup: VereinStageSetupDTO = {stageSetup: "{}", dirigentenpodest: false, locationIdentifier: "", vereinId: 0, hasAdditionalImage: false};

  pendingChanges = signal(false);

  loading = signal(false);
  saving = signal(false);
  uploading = signal(false);

  showProgressBar = computed(() => this.loading() || this.saving() || this.uploading());

  constructor(private backendService: BackendService,
              private router: Router,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loading.set(true);

    try {
      const wasm$ = fromPromise(init("/assets/stage/stager.wasm"));
      const data$ = this.backendService.getStageSetup();

      wasm$.pipe(
        combineLatestWith(data$),
        delay(200)
      ).subscribe((data) => {
        this.stageSetup = data[1];
        this.addToCanvas(data[1].stageSetup);
        this.loading.set(false);
      });
    } catch (e) {
      this.generalErrorHandling(e);
    }
  }

  save() {
    if (this.stageSetup) {
      this.saving.set(true);
      this.backendService.updateStageSetup({...this.stageSetup, stageSetup: read_data_for_save()})
        .subscribe({
          next: () => {
            this.saving.set(false);
            this.pendingChanges.set(false);
            this.snackBar.open('Speichern war erfolgreich', undefined, {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 2000,
              panelClass: 'success'
            });
          },
          error: () => {
            this.saving.set(false);
            this.snackBar.open('Es ist ein Fehler aufgetreten...', undefined, {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 3000,
              panelClass: 'error'
            });
          }
        });
    }
  }

  onDrop(event: NgxDropzoneChangeEvent) {
    if (event.rejectedFiles.length > 0) {
      let errorMessage = "Es sind nur Dateien vom Typ 'jpg' erlaubt.";
      if (event.rejectedFiles[0].size > this.maxFileSize) {
        errorMessage = "Maximal-Grösse von 4 MB überschritten.";
      }

      this.snackBar.open(errorMessage, undefined, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'info'
      });
    }

    if (event.addedFiles.length === 1) {
      this.upload(event.addedFiles[0]);
    }
  }

  private upload(file: File) {
    this.uploading.set(true);
    this.backendService.uploadAdditionalStageSetup(file).subscribe({
      next: () => {
        this.uploading.set(false);
        this.snackBar.open("Bild-Upload war erfolgreich", undefined, {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'success'
        });
        this.stageSetup = {
          ...this.stageSetup,
          hasAdditionalImage: true
        };
      },
      error: () => {
        this.uploading.set(false);
        this.snackBar.open("Es ist ein Fehler aufgetreten...", undefined, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'error'
        });
      }
    });
  }

  public deleteAdditionalImage() {
    this.uploading.set(true);
    this.backendService.deleteAdditionalStageSetup().subscribe({
      next: () => {
        this.snackBar.open("Erfolgreich gelöscht", undefined, {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'success'
        });
        this.stageSetup = {
          ...this.stageSetup,
          hasAdditionalImage: false
        };
        this.uploading.set(false);
      },
      error: () => {
        this.uploading.set(false);
        this.snackBar.open("Es ist ein Fehler aufgetreten...", undefined, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'error'
        });
      },
    })
  }

  downloadAdditionalImage() {
    this.backendService.getAdditionalStageSetup().subscribe({
      next: response => {
        saveAs(response, "skizze.jpg");
      },
    });
  }

  private addToCanvas(data: string): void {
    if (this.stageSetup) {
      try {
        if (this.readOnly) {
          add_viewer(this.canvasId, 900, this.stageSetup.locationIdentifier, data, false);
        } else {
          add_editor(this.canvasId, 900, this.stageSetup.locationIdentifier, data);
        }
      } catch (e) {
        this.generalErrorHandling(e);
      }
    }
  }

  private generalErrorHandling(e: unknown) {
    console.error(e);
    this.snackBar.open('Es ist ein Fehler aufgetreten. Bitte die Seite neu laden.', undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 5000,
      panelClass: 'error'
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  handleClose($event: BeforeUnloadEvent) {
    if (this.hasUnsavedChanges()) {
      $event.preventDefault();
    }
  }

  canDeactivate(): Observable<boolean> {
    if (this.hasUnsavedChanges()) {
      return this.dialog.open(UnsavedChangesDialogComponent, {
        disableClose: true,
        autoFocus: false
      }).afterClosed();
    } else {
      return of(true);
    }
  }

  private hasUnsavedChanges() {
    return this.pendingChanges() || is_data_dirty();
  }

  navigateBack() {
    this.router.navigate(['/']).catch(reason => {
      console.error(reason);
    })
  }

  onChange() {
    this.pendingChanges.set(true);
  }

  get percussionListUrl(): string {
    return `https://www.zkmf2024.ch/info/perkussion/${this.stageSetup.locationIdentifier}.pdf`;
  }
}
