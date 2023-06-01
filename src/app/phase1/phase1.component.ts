import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Klasse, VereinDTO} from "../rest";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../environments/environment";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {UploadData} from "../main/main.component";


@Component({
  selector: 'app-phase1',
  templateUrl: './phase1.component.html',
  styleUrls: ['./phase1.component.scss']
})
export class Phase1Component {

  HOECHSTKLASSE = Klasse.HOECHSTKLASSE;
  KLASSE_1 = Klasse.KLASSE_1;
  KLASSE_2 = Klasse.KLASSE_2;
  KLASSE_3 = Klasse.KLASSE_3;
  KLASSE_4 = Klasse.KLASSE_4;
  OBERSTUFE = Klasse.OBERSTUFE;
  MITTELSTUFE = Klasse.MITTELSTUFE;
  UNTERSTUFE = Klasse.UNTERSTUFE;

  maxFileSize = 1000000;

  @Input()
    // @ts-ignore
  verein: VereinDTO;
  @Input()
  saving = false;
  @Input()
  uploading = false;
  @Input()
  anmeldungDisabled = true;
  @Input()
  unsavedChanges = false;

  @Output()
  changed = new EventEmitter<void>();
  @Output()
  doSave = new EventEmitter<boolean>();
  @Output()
  doUpload = new EventEmitter<UploadData>();
  @Output()
  doDeleteImage = new EventEmitter<number>();

  constructor(public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  onChange() {
    this.changed.emit();
  }

  direktionDoppeleinsatzChanged($event: boolean) {
    if (this.verein && !$event) {
      this.verein.angaben.direktionDoppeleinsatzVerein = ''
    }
    this.onChange();
  }

  save(silent: boolean): void {
    this.doSave.emit(silent);
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

      this.doSave.emit();
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

      this.doSave.emit();
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
      this.doUpload.emit({
        logo: logo ? event.addedFiles[0] : undefined,
        bild: !logo ? event.addedFiles[0] : undefined
      });
    }
  }

  deleteImage(imageId?: number) {
    if (imageId) {
      this.doDeleteImage.emit(imageId);
    }
  }

  modulTambourenChanged(selected: boolean) {
    this.verein.anmeldung.tambouren = selected;
    this.onChange();
  }

  modulPerkussionsensChanged(selected: boolean) {
    this.verein.anmeldung.perkussionsensemble = selected;
    this.onChange();
  }
}
