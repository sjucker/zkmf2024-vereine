import {Component, Input} from '@angular/core';
import {KontaktDTO} from "../../rest";

@Component({
  selector: 'app-kontakt-form',
  templateUrl: './kontakt-form.component.html',
  styleUrls: ['./kontakt-form.component.scss']
})
export class KontaktFormComponent {

  @Input()
  kontakt: KontaktDTO = {};

  constructor() {
  }

}
