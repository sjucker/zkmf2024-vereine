import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TitelDTO} from "../../rest";

@Component({
  selector: 'app-tambouren-titel',
  templateUrl: './tambouren-titel.component.html',
  styleUrls: ['./tambouren-titel.component.scss']
})
export class TambourenTitelComponent {

  klassePattern = /^[1-6]$/;

  @Input({required: true})
    // @ts-ignore
  titel: TitelDTO;

  @Input({required: true})
  readOnly = false;

  @Output()
  changed = new EventEmitter<void>();

  get valid(): boolean {
    return !!this.titel.titelName && !!this.titel.composer &&
      (this.titel.grad != undefined && this.klassePattern.test(this.titel.grad.toString()));
  }

  onChange() {
    if (this.valid) {
      this.changed.emit();
    }
  }
}
