import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Modul, TambourenGrundlage, TitelDTO, VereinProgrammDTO, VereinProgrammTitelDTO} from "../rest";
import {
  durationPattern,
  formatDuration,
  toDurationInSeconds
} from "../components/duration-input/duration-input.component";

@Component({
  selector: 'app-programm',
  templateUrl: './programm.component.html',
  styleUrls: ['./programm.component.scss']
})
export class ProgrammComponent implements OnChanges {

  protected readonly formatDuration = formatDuration;

  WIRBEL = TambourenGrundlage.WIRBEL;
  RUF = TambourenGrundlage.RUF;
  BATAFLAFLA = TambourenGrundlage.BATAFLAFLA;
  DOUBLE = TambourenGrundlage.DOUBLE;

  durationPattern = durationPattern;
  gradPattern = /^[1-6](\.\d)?$/;

  @Input({required: true})
    // @ts-ignore
  programm: VereinProgrammDTO;

  @Input({required: true})
  saving: boolean = false;

  @Input({required: true})
  readOnly = false;

  @Output()
  changed = new EventEmitter<void>();
  @Output()
  doSave = new EventEmitter<void>();

  newTitel: TitelDTO = {
    pflichtStueck: false,
    durationInSeconds: 0,
    valid: false
  };

  newTitelDuration = '';

  unsavedChanges = false;

  get newTitelValid(): boolean {
    return !!this.newTitel.titelName && !!this.newTitel.composer &&
      (!this.isModulAB || (this.newTitel.grad != undefined && this.gradPattern.test(this.newTitel.grad.toString()))) &&
      (this.isModulC || this.newTitelDuration != undefined && this.durationPattern.test(this.newTitelDuration)) &&
      (!this.isModulH || !!this.newTitel.schwierigkeitsgrad);
  }

  addNewProgrammTitel() {
    if (this.newTitelValid) {
      if (this.newTitel.id) {
        // edit
        this.newTitel.grad = this.toGrad(this.newTitel.grad);
        this.newTitel.durationInSeconds = toDurationInSeconds(this.newTitelDuration) ?? 0;
      } else {
        // create
        this.programm.ablauf = [...this.programm.ablauf, {
          titel: {
            titelName: this.newTitel.titelName,
            composer: this.newTitel.composer,
            arrangeur: this.newTitel.arrangeur,
            grad: this.toGrad(this.newTitel.grad),
            durationInSeconds: toDurationInSeconds(this.newTitelDuration) ?? 0,
            pflichtStueck: false,
            valid: true,
            schwierigkeitsgrad: this.newTitel.schwierigkeitsgrad
          }
        }];
      }
    }
    this.newTitel = {
      pflichtStueck: false,
      durationInSeconds: 0,
      valid: false
    };
    this.newTitelDuration = '';

    this.programm.totalDurationInSeconds = this.calculateTotalDurationInSeconds(this.programm.ablauf);
    this.onChange();
  }

  private toGrad(grad?: number): number | undefined {
    return grad ? (Math.round(grad * 10) / 10) : undefined;
  }

  deleteProgrammTitel(vereinProgrammTitel: VereinProgrammTitelDTO) {
    if (vereinProgrammTitel.titel.pflichtStueck) {
      return;
    }
    const index = this.programm.ablauf.findIndex(dto => dto === vereinProgrammTitel);
    if (index > -1) {
      this.programm.ablauf.splice(index, 1);
      this.programm.totalDurationInSeconds = this.calculateTotalDurationInSeconds(this.programm.ablauf);
    }
    this.onChange();
  }


  editProgrammTitel(entry: VereinProgrammTitelDTO) {
    if (entry.titel.pflichtStueck) {
      return;
    }

    this.newTitel = entry.titel;
    this.newTitelDuration = formatDuration(entry.titel.durationInSeconds);
  }

  updateApplaus(vereinProgrammTitel: VereinProgrammTitelDTO, duration: number) {
    vereinProgrammTitel.applausInSeconds = duration;
    this.programm.totalDurationInSeconds = this.calculateTotalDurationInSeconds(this.programm.ablauf);
    this.onChange();
  }

  private calculateTotalDurationInSeconds(ablauf: VereinProgrammTitelDTO[]) {
    const totalDurationInSeconds = ablauf.map(value => value.titel.durationInSeconds)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    const totalApplausInSeconds = ablauf.map(value => value.applausInSeconds)
      .reduce((previousValue, currentValue) => (previousValue ?? 0) + (currentValue ?? 0), 0);

    return totalDurationInSeconds + (totalApplausInSeconds ?? 0);
  }

  get isInRange(): boolean {
    if (this.programm.totalDurationInSeconds && this.programm.minDurationInSeconds && this.programm.maxDurationInSeconds) {
      return this.programm.totalDurationInSeconds >= this.programm.minDurationInSeconds && this.programm.totalDurationInSeconds <= this.programm.maxDurationInSeconds;
    }
    return true;
  }

  get diffToVorgabe(): number {
    if (this.programm.totalDurationInSeconds && this.programm.minDurationInSeconds && this.programm.maxDurationInSeconds) {
      if (this.programm.totalDurationInSeconds < this.programm.minDurationInSeconds) {
        return this.programm.totalDurationInSeconds - this.programm.minDurationInSeconds;
      } else {
        return this.programm.totalDurationInSeconds - this.programm.maxDurationInSeconds;
      }
    }
    return 0;
  }

  moveUp(entry: VereinProgrammTitelDTO) {
    const index = this.programm.ablauf.indexOf(entry);
    [this.programm.ablauf[index - 1], this.programm.ablauf[index]] = [this.programm.ablauf[index], this.programm.ablauf[index - 1]];

    this.updateApplausAndTotalDuration();
  }

  moveDown(entry: VereinProgrammTitelDTO) {
    const index = this.programm.ablauf.indexOf(entry);
    [this.programm.ablauf[index], this.programm.ablauf[index + 1]] = [this.programm.ablauf[index + 1], this.programm.ablauf[index]];

    this.updateApplausAndTotalDuration();
  }

  private updateApplausAndTotalDuration(): void {
    // latest entry does not have applause
    this.programm.ablauf[this.programm.ablauf.length - 1].applausInSeconds = undefined;
    this.programm.totalDurationInSeconds = this.calculateTotalDurationInSeconds(this.programm.ablauf);
    this.onChange();
  }

  onChange() {
    this.unsavedChanges = true;
    this.changed.emit();
  }

  get isModulAB(): boolean {
    return this.programm.modul === Modul.A || this.programm.modul === Modul.B;
  }

  get isModulB(): boolean {
    return this.programm.modul === Modul.B;
  }

  get isModulC(): boolean {
    return this.programm.modul === Modul.C;
  }

  get isModulD(): boolean {
    return this.programm.modul === Modul.D;
  }

  get isModulDEF(): boolean {
    return this.programm.modul === Modul.D || this.programm.modul === Modul.E || this.programm.modul === Modul.F;
  }

  get isModulG(): boolean {
    return this.programm.modul === Modul.G;
  }

  get isModulH(): boolean {
    return this.programm.modul === Modul.H;
  }

  get isModulGH(): boolean {
    return this.programm.modul === Modul.G || this.programm.modul === Modul.H;
  }

  get hasVorgabeDauer(): boolean {
    return !!(this.programm.minDurationInSeconds && this.programm.maxDurationInSeconds);
  }

  save() {
    this.doSave.emit();
  }

  get selbstwahlTitel(): TitelDTO[] {
    return this.programm.ablauf.map(e => e.titel).filter(t => !t.pflichtStueck);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.unsavedChanges = false;
  }
}
