import {Component, HostListener, OnInit, signal} from '@angular/core';
import init, {add_editor, is_data_dirty, read_data_for_save} from "../../assets/stage/wasm_stage"
import {BackendService} from "../service/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VereinStageSetupDTO} from "../rest";
import {Router} from "@angular/router";
import {combineLatestWith, Observable, of} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {UnsavedChangesDialogComponent} from "../unsaved-changes-dialog/unsaved-changes-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  canvasId = 'stage-canvas';

  stageSetup: VereinStageSetupDTO = {stageSetup: "{}", dirigentenpodest: false, locationIdentifier: ""};

  pendingChanges = signal(false);

  loading = signal(false);
  saving = signal(false);

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
        combineLatestWith(data$)
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

  private addToCanvas(data: string): void {
    if (this.stageSetup) {
      try {
        add_editor(this.canvasId, 900, this.stageSetup.locationIdentifier, data);
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
