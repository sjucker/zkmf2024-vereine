import {Component, OnInit} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {Klasse, PhaseStatus, VereinDTO} from "../rest";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {environment} from "../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {GeneralInfoDialogComponent} from "../general-info-dialog/general-info-dialog.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  HOECHSTKLASSE = Klasse.HOECHSTKLASSE;
  KLASSE_1 = Klasse.KLASSE_1;
  KLASSE_2 = Klasse.KLASSE_2;
  KLASSE_3 = Klasse.KLASSE_3;
  KLASSE_4 = Klasse.KLASSE_4;
  OBERSTUFE = Klasse.OBERSTUFE;
  MITTELSTUFE = Klasse.MITTELSTUFE;
  UNTERSTUFE = Klasse.UNTERSTUFE;

  maxFileSize = 1000000;

  verein?: VereinDTO;

  notFound = false;
  error = false;

  saving = false;
  uploading = false;

  logo?: File;
  bild?: File;

  constructor(private backendService: BackendService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.backendService.get().subscribe({
      next: response => {
        this.verein = response;
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

  saveAnmeldung() {
    if (this.verein) {
      if (this.verein.anmeldung.modulA && !this.verein.anmeldung.klasseModulA) {
        this.snackBar.open("Stärkeklasse Modul A auswählen", undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 2000,
          panelClass: 'error'
        })
        return;
      }

      if (this.verein.anmeldung.modulB && !this.verein.anmeldung.klasseModulB) {
        this.snackBar.open("Stärkeklasse Modul B auswählen", undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 2000,
          panelClass: 'error'
        })
        return;
      }

      if (this.verein.anmeldung.modulH && !this.verein.anmeldung.klasseModulH) {
        this.snackBar.open("Stärkeklasse Modul H auswählen", undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 2000,
          panelClass: 'error'
        })
        return;
      }

      this.save();
    }
  }

  save() {
    if (this.verein) {
      this.saving = true;
      this.backendService.update(this.verein).subscribe({
        next: value => {
          this.verein = value;
          this.saving = false;
          this.snackBar.open('Speichern war erfolgreich', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 2000,
            panelClass: 'success'
          });
        },
        error: _ => {
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

  onDrop(event: NgxDropzoneChangeEvent, logo: boolean) {
    console.log(event);
    if (event.rejectedFiles.length > 0) {
      let errorMessage = "Es sind nur Datein vom Typ 'jpeg' erlaubt."
      if (event.rejectedFiles[0].size > this.maxFileSize) {
        errorMessage = "Maximal-Grösse von 1 MB überschritten."
      }

      this.snackBar.open(errorMessage, undefined, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'info'
      });
    }

    if (event.addedFiles.length === 1) {
      if (logo) {
        this.logo = event.addedFiles[0];
      } else {
        this.bild = event.addedFiles[0];
      }
    }
  }

  onRemove(logo: boolean) {
    if (logo) {
      this.logo = undefined;
    } else {
      this.bild = undefined;
    }
  }

  upload() {
    this.uploading = true;
    this.backendService.upload(this.logo, this.bild).subscribe({
      next: _ => {
        this.load();
        this.uploading = false;
        this.snackBar.open("Bild-Upload war erfolgreich", undefined, {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'success'
        });

      },
      error: _ => {
        this.uploading = false;
        this.snackBar.open("Es ist ein Fehler aufgetreten...", undefined, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'error'
        });
      }
    })
  }

  get logoImgSrc(): string {
    return `${environment.baseUrl}/public/image/${this.verein?.info.logoImgId}`;
  }

  get bildImgSrc(): string {
    return `${environment.baseUrl}/public/image/${this.verein?.info.bildImgId}`;
  }

  get harmonieVisible(): boolean {
    if (this.verein) {
      return this.verein.anmeldung.modulA ||
        this.verein.anmeldung.modulB ||
        this.verein.anmeldung.modulC ||
        this.verein.anmeldung.modulD ||
        this.verein.anmeldung.modulE ||
        this.verein.anmeldung.modulF;
    }
    return false;
  }

  get brassBandVisible(): boolean {
    return this.harmonieVisible
  }

  get fanfareVisible(): boolean {
    return this.harmonieVisible
  }

  get tambourenVisible(): boolean {
    if (this.verein) {
      return this.verein.anmeldung.modulG;
    }
    return false;
  }

  get perkussionsensembleVisible(): boolean {
    if (this.verein) {
      return this.verein.anmeldung.modulC || this.verein.anmeldung.modulH;
    }
    return false;
  }

  get noModulSelected(): boolean {
    return !(this.harmonieVisible || this.tambourenVisible || this.perkussionsensembleVisible)
  }

  isPhaseDone(status: PhaseStatus): boolean {
    return status === PhaseStatus.DONE;
  }

  openInfoDialog() {
    this.dialog.open(GeneralInfoDialogComponent, {
      maxHeight: '80vh'
    })
  }
}
