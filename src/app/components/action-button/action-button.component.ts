import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent {

  @Input({required: true})
  buttonLabel = ''

  @Input({required: true})
  processing = false

  @Input()
  disabled = false;

  @Output()
  buttonClicked = new EventEmitter<any>()

  constructor() {
  }

}
