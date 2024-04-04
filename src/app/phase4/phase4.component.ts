import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {VereinsanmeldungDetailDTO} from "../rest";
import {MatDialog} from "@angular/material/dialog";
import * as moment from "moment";
import {Moment} from "moment";
import {Router} from "@angular/router";
import {STAGE_PATH} from "../app-routing.module";

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
  @Input({required: true})
  showStageSetup = true;
  @Input({required: true})
  readOnly = false;

  @Output()
  changed = new EventEmitter<void>();
  @Output()
  doSave = new EventEmitter<void>();

  partiturenSentAt?: Moment;

  constructor(private router: Router,
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

  addNichtmitglieder(): void {
    this.detail.nichtmitglieder = [...this.detail.nichtmitglieder, {}]

  }

  isInvalidAnzahlMenus(): boolean {
    if (this.detail.festkartenMusikerAmount) {
      return (this.detail.festkartenMusikerAmount + (this.detail.festkartenBegleiterAmount ?? 0))
        !== ((this.detail.verpflegungMeat ?? 0) + (this.detail.verpflegungVegan ?? 0) + (this.detail.verpflegungAllergies ?? 0) + (this.detail.verpflegungNone ?? 0));
    }

    return false;
  }

  navigateToStage(): void {
    this.router.navigate([STAGE_PATH]).catch(reason => {
      console.error(reason);
    });
  }
}
