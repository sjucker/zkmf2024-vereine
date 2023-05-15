import {Component, EventEmitter, Input, Output, TrackByFunction} from '@angular/core';
import {formatDuration, toDurationInSeconds} from "../components/duration-input/duration-input.component";
import {TitelDTO, VereinProgrammDTO, VereinProgrammTitelDTO} from "../rest";

@Component({
  selector: 'app-phase2',
  templateUrl: './phase2.component.html',
  styleUrls: ['./phase2.component.scss']
})
export class Phase2Component {

  protected readonly formatDuration = formatDuration;

  durationPattern = new RegExp('[0-9]{1,2}:[0-9]{2}', '');
  gradPattern = new RegExp('[1-6](\\.[0-9])?', '');

  @Input()
  titel: TitelDTO[] = [];
  @Input()
  programme: VereinProgrammDTO[] = [];
  @Input()
  saving: boolean = false;

  @Output()
  doSave = new EventEmitter<void>();

  newTitel: TitelDTO = {
    pflichtStueck: false,
    durationInSeconds: 0
  };

  newTitelDuration = '';

  selectedTitel?: TitelDTO;

  get newTitelValid(): boolean {
    return !!this.newTitel.titelName && !!this.newTitel.composer &&
      (this.newTitel.grad != undefined && this.gradPattern.test(this.newTitel.grad.toString())) &&
      (this.newTitelDuration != undefined && this.durationPattern.test(this.newTitelDuration))
  }

  addNewTitel() {
    this.titel = [...this.titel, {
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

  deleteTitel(titel: TitelDTO) {
    const index = this.titel.findIndex(dto => dto === titel);
    if (index > -1) {
      this.titel.splice(index, 1);
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

  save() {
    this.doSave.emit();
  }
}
