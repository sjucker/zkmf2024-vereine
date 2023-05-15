import {Component, EventEmitter, Input, Output, TrackByFunction} from '@angular/core';
import {VereinDTO, VereinProgrammDTO} from "../rest";

@Component({
  selector: 'app-phase2',
  templateUrl: './phase2.component.html',
  styleUrls: ['./phase2.component.scss']
})
export class Phase2Component {

  @Input({required: true})
    // @ts-ignore
  verein: VereinDTO;
  @Input({required: true})
  saving: boolean = false;
  @Input({required: true})
  unsavedChanges = false;

  @Output()
  doSave = new EventEmitter<boolean>();

  get trackById(): TrackByFunction<VereinProgrammDTO> {
    return (index, item) => item.id;
  }

  onChange(silent: boolean) {
    this.doSave.emit(silent);
  }
}
