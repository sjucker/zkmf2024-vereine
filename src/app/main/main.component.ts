import {Component, HostListener, OnInit} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {Modul, VereinDTO} from "../rest";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {GeneralInfoDialogComponent} from "../general-info-dialog/general-info-dialog.component";
import {ConfirmRegistrationDialogComponent} from "../confirm-registration-dialog/confirm-registration-dialog.component";
import {Observable, of} from "rxjs";
import {UnsavedChangesDialogComponent} from "../unsaved-changes-dialog/unsaved-changes-dialog.component";
import {FestkartenDialogComponent} from "../festkarten-dialog/festkarten-dialog.component";
import {FEEDBACK_PATH} from "../app-routing.module";

export interface UploadData {
  logo?: File;
  bild?: File;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  verein?: VereinDTO;

  notFound = false;
  error = false;

  saving = false;
  confirming = false;
  uploading = false;

  anmeldungDisabled = true;
  unsavedChanges = false;

  suisaConfirmed = false;

  constructor(private backendService: BackendService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.load();
  }

  @HostListener('window:beforeunload', ['$event'])
  handleClose($event: BeforeUnloadEvent) {
    if (this.unsavedChanges) {
      $event.preventDefault();
    }
  }

  private load() {
    this.backendService.get().subscribe({
      next: response => {
        this.verein = response;
        this.anmeldungDisabled = response.registrationConfirmed;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.notFound = true;
        } else {
          this.error = true;
        }
      }
    });
  }

  save(programmUpdated: boolean) {
    // first, some validations, don't do this per panel only since user is not forced to save before leaving a panel
    if (this.verein) {
      if (this.verein.angaben.direktionDoppeleinsatz && !this.verein.angaben.direktionDoppeleinsatzVerein) {
        this.snackBar.open("Bitte Vereinsname angeben, für welchen Dirigent/in auch noch teilnimmt", undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        });
        return;
      }

      if (this.verein.anmeldung.modulA && !this.verein.anmeldung.klasseModulA) {
        this.snackBar.open("Stärkeklasse Modul A auswählen", undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        });
        return;
      }

      if (this.verein.anmeldung.modulB && !this.verein.anmeldung.klasseModulB) {
        this.snackBar.open("Stärkeklasse Modul B auswählen", undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        });
        return;
      }

      if (this.verein.anmeldung.modulH && !this.verein.anmeldung.klasseModulH) {
        this.snackBar.open("Stärkeklasse Modul H auswählen", undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        });
        return;
      }

      if (this.verein.anmeldung.modulG &&
        (!this.verein.anmeldung.tambourenKatA && !this.verein.anmeldung.tambourenKatB && !this.verein.anmeldung.tambourenKatC)) {
        this.snackBar.open("Mindestens eine Wettspielkategorien auswählen", undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        });
        return;
      }

      this.saving = true;
      this.backendService.update({...this.verein, programmUpdated: programmUpdated}).subscribe({
        next: value => {
          this.saving = false;
          this.unsavedChanges = false;
          this.anmeldungDisabled = value.registrationConfirmed;
          this.verein = value;
          this.snackBar.open('Speichern war erfolgreich', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 2000,
            panelClass: 'success'
          });
        },
        error: () => {
          this.saving = false;
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


  upload(uploadData: UploadData) {
    this.uploading = true;
    this.backendService.upload(uploadData.logo, uploadData.bild).subscribe({
      next: () => {
        this.load();
        this.uploading = false;
        this.snackBar.open("Bild-Upload war erfolgreich", undefined, {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'success'
        });
      },
      error: () => {
        this.uploading = false;
        this.snackBar.open("Es ist ein Fehler aufgetreten...", undefined, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'error'
        });
      }
    });
  }

  deleteImage(imageId: number) {
    this.uploading = true;
    this.backendService.deleteImage(imageId).subscribe({
      next: () => {
        this.load();
        this.uploading = false;
      },
      error: () => {
        this.uploading = false;
        this.snackBar.open("Es ist ein Fehler aufgetreten...", undefined, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'error'
        });
      }
    });
  }

  openFestkartenDialog() {
    this.dialog.open(FestkartenDialogComponent);
  }

  openInfoDialog() {
    this.dialog.open(GeneralInfoDialogComponent);
  }

  canConfirmRegistration(): boolean {
    if (this.verein) {
      return !this.verein.registrationConfirmed && this.verein.anmeldung.valid;
    }
    return false;
  }

  confirmRegistration() {
    if (this.verein?.anmeldung.valid) {
      this.dialog.open(ConfirmRegistrationDialogComponent).afterClosed().subscribe(decision => {
        if (decision) {
          this.doConfirmRegistration();
        }
      });
    }
  }

  private doConfirmRegistration() {
    this.confirming = true;
    this.backendService.confirmRegistration().subscribe({
      next: value => {
        this.confirming = false;
        this.verein = value;
        this.anmeldungDisabled = value.registrationConfirmed;
        this.snackBar.open("Anmeldung wurde bestätigt!", undefined, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'success'
        });
      },
      error: () => {
        this.confirming = false;
        this.snackBar.open("Es ist ein Fehler aufgetreten...", undefined, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'error'
        });
      }
    });
  }

  onChange() {
    this.unsavedChanges = true;
  }

  get phase2Enabled(): boolean {
    if (this.verein) {
      return this.verein.registrationConfirmed;
    }

    return false;
  }

  canDeactivate(): Observable<boolean> {
    if (this.unsavedChanges) {
      return this.dialog.open(UnsavedChangesDialogComponent, {
        disableClose: true,
        autoFocus: false
      }).afterClosed();
    } else {
      return of(true);
    }
  }

  get someModulC(): boolean {
    return this.verein?.programme.some(programm => programm.modul === Modul.C) ?? false;
  }

  get everyModulC(): boolean {
    return this.verein?.programme.every(programm => programm.modul === Modul.C) ?? false;
  }

  get hasStageSetup(): boolean {
    return this.verein?.programme.some(programm => programm.modul === Modul.A || programm.modul === Modul.B || programm.modul === Modul.H) ?? false;
  }

  get phase2ReadOnly(): boolean {
    return !!this.verein?.phase2ConfirmedAt;
  }

  get phase4ReadOnly(): boolean {
    return !!this.verein?.phase4ConfirmedAt;
  }

  get stageSetupReadOnly(): boolean {
    return !!this.verein?.stageSetupConfirmedAt;
  }

  get hasTimetableEntries(): boolean {
    return (this.verein?.timetableEntries.length ?? 0) > 0;
  }

  get hasErrata(): boolean {
    return (this.verein?.errata.length ?? 0) > 0;
  }

  get showFesthymne(): boolean {
    if (this.verein) {
      return this.verein.anmeldung.modulA || this.verein.anmeldung.modulB || this.verein.anmeldung.modulC;
    }
    return false;
  }

  get brassBand(): boolean {
    if (this.verein) {
      return this.verein.anmeldung.brassBand;
    }
    return false;
  }

  protected readonly FEEDBACK_PATH = FEEDBACK_PATH;
}
