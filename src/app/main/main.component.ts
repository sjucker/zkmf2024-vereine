import {Component, OnInit, TrackByFunction} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {Klasse, TitelDTO, VereinDTO, VereinProgrammDTO, VereinProgrammTitelDTO} from "../rest";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {environment} from "../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {GeneralInfoDialogComponent} from "../general-info-dialog/general-info-dialog.component";
import {ConfirmRegistrationDialogComponent} from "../confirm-registration-dialog/confirm-registration-dialog.component";
import {formatDuration, toDurationInSeconds} from "../components/duration-input/duration-input.component";

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

  newTitel: TitelDTO = {
    pflichtStueck: false,
    durationInSeconds: 0
  };
  newTitelDuration = '';

  selectedTitel?: TitelDTO;

  notFound = false;
  error = false;

  saving = false;
  confirming = false;
  uploading = false;

  logo?: File;
  bild?: File;

  anmeldungDisabled = true;
  unsavedChanges = false;

  durationPattern = new RegExp('[0-9]{1,2}:[0-9]{2}', '');
  gradPattern = new RegExp('[1-6](\\.[0-9])?', '');

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
        this.anmeldungDisabled = response.registrationConfirmed
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

  saveVereinsangaben() {
    if (this.verein) {
      if (this.verein.angaben.direktionDoppeleinsatz && !this.verein.angaben.direktionDoppeleinsatzVerein) {
        this.snackBar.open("Bitte Vereinsname angeben, für welchen Dirigent/in auch noch teilnimmt", undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        })
        return;
      }

      this.save()
    }
  }

  saveAnmeldung() {
    if (this.verein) {
      if (this.verein.anmeldung.modulA && !this.verein.anmeldung.klasseModulA) {
        this.snackBar.open("Stärkeklasse Modul A auswählen", undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        })
        return;
      }

      if (this.verein.anmeldung.modulB && !this.verein.anmeldung.klasseModulB) {
        this.snackBar.open("Stärkeklasse Modul B auswählen", undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        })
        return;
      }

      if (this.verein.anmeldung.modulH && !this.verein.anmeldung.klasseModulH) {
        this.snackBar.open("Stärkeklasse Modul H auswählen", undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
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
          this.saving = false;
          this.unsavedChanges = false;
          this.verein = value;
          this.anmeldungDisabled = value.registrationConfirmed
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
      this.upload()
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
        this.logo = undefined
        this.bild = undefined
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

  deleteImage(imageId?: number) {
    if (imageId) {
      this.uploading = true
      this.backendService.deleteImage(imageId).subscribe({
        next: _ => {
          this.load()
          this.uploading = false;
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

  openInfoDialog() {
    this.dialog.open(GeneralInfoDialogComponent)
  }

  direktionDoppeleinsatzChanged($event: boolean) {
    if (this.verein && !$event) {
      this.verein.angaben.direktionDoppeleinsatzVerein = ''
    }
  }

  canConfirmRegistration(): boolean {
    if (this.verein) {
      return !this.verein.registrationConfirmed && this.verein.anmeldung.valid;
    }
    return false;
  }

  confirmRegistration() {
    if (this.verein && this.verein.anmeldung.valid) {
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
        this.anmeldungDisabled = value.registrationConfirmed
        this.snackBar.open("Anmeldung wurde bestätigt!", undefined, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'success'
        });
      },
      error: _ => {
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

  get newTitelValid(): boolean {
    return !!this.newTitel.titelName && !!this.newTitel.composer &&
      (this.newTitel.grad != undefined && this.gradPattern.test(this.newTitel.grad.toString())) &&
      (this.newTitelDuration != undefined && this.durationPattern.test(this.newTitelDuration))
  }

  addNewTitel() {
    if (this.verein) {
      this.verein.titel = [...this.verein.titel, {
        titelName: this.newTitel.titelName,
        composer: this.newTitel.composer,
        arrangeur: this.newTitel.arrangeur,
        grad: Math.round((this.newTitel.grad ?? 0) * 10) / 10,
        durationInSeconds: toDurationInSeconds(this.newTitelDuration) ?? 0,
        pflichtStueck: false
      }];
      this.newTitel = {
        pflichtStueck: false,
        durationInSeconds: 0
      }
      this.newTitelDuration = ''
    }
  }

  deleteTitel(titel: TitelDTO) {
    if (this.verein) {
      const index = this.verein.titel.findIndex(dto => dto === titel);
      if (index > -1) {
        this.verein.titel.splice(index, 1);
      }
    }
  }

  get trackById(): TrackByFunction<VereinProgrammDTO> {
    return (index, item) => item.id;
  }

  addNewProgrammTitel(programm: VereinProgrammDTO) {
    if (this.selectedTitel) {
      programm.ablauf = [...programm.ablauf, {
        titel: this.selectedTitel
      }];
    }
    programm.totalDurationInSeconds = this.calculateTotalDurationInSeconds(programm.ablauf);
  }

  deleteProgrammTitel(programm: VereinProgrammDTO, vereinProgrammTitel: VereinProgrammTitelDTO) {
    const index = programm.ablauf.findIndex(dto => dto === vereinProgrammTitel);
    if (index > -1) {
      programm.ablauf.splice(index, 1);
      programm.totalDurationInSeconds = this.calculateTotalDurationInSeconds(programm.ablauf);
    }
  }

  updateApplaus(programm: VereinProgrammDTO, vereinProgrammTitel: VereinProgrammTitelDTO, duration: number) {
    vereinProgrammTitel.applausInSeconds = duration;
    programm.totalDurationInSeconds = this.calculateTotalDurationInSeconds(programm.ablauf);
  }

  private calculateTotalDurationInSeconds(ablauf: VereinProgrammTitelDTO[]) {
    // TODO latest applause not counted
    const totalDurationInSeconds = ablauf.map(value => value.titel.durationInSeconds)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    const totalApplausInSeconds = ablauf.map(value => value.applausInSeconds)
      .reduce((previousValue, currentValue) => (previousValue ?? 0) + (currentValue ?? 0), 0);

    return totalDurationInSeconds + (totalApplausInSeconds ?? 0);
  }

  isInRange(programm: VereinProgrammDTO) {
    if (programm.totalDurationInSeconds && programm.minDurationInSeconds && programm.maxDurationInSeconds) {
      return programm.totalDurationInSeconds >= programm.minDurationInSeconds && programm.totalDurationInSeconds <= programm.maxDurationInSeconds;
    }
    return true;
  }

  getDiffToVorgabe(programm: VereinProgrammDTO): number {
    if (programm.totalDurationInSeconds && programm.minDurationInSeconds && programm.maxDurationInSeconds) {
      if (programm.totalDurationInSeconds < programm.minDurationInSeconds) {
        return programm.totalDurationInSeconds - programm.minDurationInSeconds;
      } else {
        return programm.totalDurationInSeconds - programm.maxDurationInSeconds;
      }
    }
    return 0;
  }

  protected readonly formatDuration = formatDuration;

  moveUp(programm: VereinProgrammDTO, entry: VereinProgrammTitelDTO) {
    const index = programm.ablauf.indexOf(entry);
    [programm.ablauf[index - 1], programm.ablauf[index]] = [programm.ablauf[index], programm.ablauf[index - 1]];
  }

  moveDown(programm: VereinProgrammDTO, entry: VereinProgrammTitelDTO) {
    const index = programm.ablauf.indexOf(entry);
    [programm.ablauf[index], programm.ablauf[index + 1]] = [programm.ablauf[index + 1], programm.ablauf[index]];

    // latest entry does not have applause
    if (index + 1 == programm.ablauf.length - 1) {
      entry.applausInSeconds = 0;
      programm.totalDurationInSeconds = this.calculateTotalDurationInSeconds(programm.ablauf);
    }
  }
}
