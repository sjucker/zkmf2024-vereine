import {Component, EventEmitter, Input, Output} from '@angular/core';
import {KontaktDTO} from "../../rest";

@Component({
  selector: 'app-kontakt-form',
  templateUrl: './kontakt-form.component.html',
  styleUrls: ['./kontakt-form.component.scss']
})
export class KontaktFormComponent {

  @Input({required: true})
  kontakt!: KontaktDTO;

  @Output()
  changed = new EventEmitter<void>();

  onChange() {
    this.changed.emit();
  }

}
