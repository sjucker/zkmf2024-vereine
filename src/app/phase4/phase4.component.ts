import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {VereinsanmeldungDetailDTO} from "../rest";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import * as moment from "moment";
import {Moment} from "moment";

@Component({
  selector: 'app-phase4',
  templateUrl: './phase4.component.html',
  styleUrl: './phase4.component.scss'
})
export class Phase4Component implements OnChanges {
  @Input({required: true})
  detail!: VereinsanmeldungDetailDTO;
  @Input({required: true})
  saving = false;
  @Input({required: true})
  unsavedChanges = false;

  @Output()
  changed = new EventEmitter<void>();
  @Output()
  doSave = new EventEmitter<void>();

  partiturenSentAt?: Moment;

  constructor(public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnChanges(): void {
    this.partiturenSentAt = this.detail?.partiturenSentAt !== undefined ? moment(this.detail.partiturenSentAt) : undefined;
  }

  onChange() {
    this.changed.emit();
  }

  save(): void {
    this.doSave.emit();
  }

  onDateChange(): void {
    if (this.partiturenSentAt) {
      this.detail.partiturenSentAt = this.partiturenSentAt.format('YYYY-MM-DD');
    }

    this.onChange();
  }

  addAdhocTeilnehmer(): void {
    this.detail.adhocOrchesterTeilnehmer = [...this.detail.adhocOrchesterTeilnehmer, {}]
  }
}
