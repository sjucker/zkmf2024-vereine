import {Component, EventEmitter, Input, Output, TrackByFunction} from '@angular/core';
import {VereinDTO, VereinProgrammDTO} from "../rest";

@Component({
  selector: 'app-phase2',
  templateUrl: './phase2.component.html',
  styleUrls: ['./phase2.component.scss']
})
export class Phase2Component {

  @Input({required: true})
  verein!: VereinDTO;
  @Input({required: true})
  saving: boolean = false;
  @Input({required: true})
  unsavedChanges = false;
  @Input({required: true})
  readOnly = false;

  @Output()
  changed = new EventEmitter<void>();
  @Output()
  doSave = new EventEmitter<void>();

  get trackById(): TrackByFunction<VereinProgrammDTO> {
    return (index, item) => item.id;
  }
}
