import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-validation-state',
  templateUrl: './validation-state.component.html',
  styleUrls: ['./validation-state.component.scss']
})
export class ValidationStateComponent {

  @Input({required: true})
  valid = false;

}
