import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DoppelEinsatzDTO, Klasse, VereinDTO, VereinSelectionDTO} from "../rest";
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

  @Input({required: true})
    // @ts-ignore
  verein: VereinDTO;
  @Input({required: true})
  saving = false;
  @Input({required: true})
  uploading = false;
  @Input({required: true})
  anmeldungDisabled = true;
  @Input({required: true})
  unsavedChanges = false;

  @Output()
  changed = new EventEmitter<void>();
  @Output()
  doSave = new EventEmitter<void>();
  @Output()
  doUpload = new EventEmitter<UploadData>();
  @Output()
  doDeleteImage = new EventEmitter<number>();

  doppeleinsatzName: string = '';
  doppeleinsatzVerein?: VereinSelectionDTO;

  constructor(public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  onChange() {
    this.changed.emit();
  }

  direktionDoppeleinsatzChanged($event: boolean) {
    if (this.verein && !$event) {
      this.verein.angaben.direktionDoppeleinsatzVerein = '';
    }
    this.onChange();
  }

  save(): void {
    this.doSave.emit();
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
    return this.harmonieVisible;
  }

  get fanfareVisible(): boolean {
    return this.harmonieVisible;
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
    return !(this.harmonieVisible || this.tambourenVisible || this.perkussionsensembleVisible);
  }

  onDrop(event: NgxDropzoneChangeEvent, logo: boolean) {
    if (event.rejectedFiles.length > 0) {
      let errorMessage = "Es sind nur Dateien vom Typ 'jpg' erlaubt.";
      if (event.rejectedFiles[0].size > this.maxFileSize) {
        errorMessage = "Maximal-Grösse von 1 MB überschritten.";
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

  get newDoppeleinsatzValid(): boolean {
    return this.doppeleinsatzName.length > 0 && !!this.doppeleinsatzVerein;
  }

  addNewDoppeleinsatz() {
    if (this.doppeleinsatzVerein) {
      this.verein.doppelEinsatz = [...this.verein.doppelEinsatz, {
        otherVerein: this.doppeleinsatzVerein,
        mitspielerName: this.doppeleinsatzName
      }];

      this.doppeleinsatzName = '';
      this.doppeleinsatzVerein = undefined;

      this.onChange();
    }
  }

  deleteDoppeleinsatz(doppelEinsatz: DoppelEinsatzDTO) {
    const index = this.verein.doppelEinsatz.findIndex(dto => dto === doppelEinsatz);
    if (index > -1) {
      this.verein.doppelEinsatz.splice(index, 1);
      this.onChange();
    }
  }
}
