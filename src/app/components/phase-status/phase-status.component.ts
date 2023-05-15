import {Component, Input} from '@angular/core';
import {PhaseStatus} from "../../rest";

@Component({
  selector: 'app-phase-status',
  templateUrl: './phase-status.component.html',
  styleUrls: ['./phase-status.component.scss']
})
export class PhaseStatusComponent {
  @Input({required: true})
  status: PhaseStatus = PhaseStatus.NEW;

  isPhaseDone(status: PhaseStatus): boolean {
    return status === PhaseStatus.DONE;
  }
}
