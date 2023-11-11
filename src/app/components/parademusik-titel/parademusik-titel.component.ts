import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TitelDTO} from "../../rest";
import {durationPattern, formatDuration, toDurationInSeconds} from "../duration-input/duration-input.component";

@Component({
  selector: 'app-parademusik-titel',
  templateUrl: './parademusik-titel.component.html',
  styleUrls: ['./parademusik-titel.component.scss']
})
export class ParademusikTitelComponent implements OnInit {

  durationPattern = durationPattern;

  @Input({required: true})
  titel!: TitelDTO;

  @Input({required: true})
  label: string = '';

  @Input({required: true})
  readOnly = false;

  @Output()
  changed = new EventEmitter<void>();

  titelDuration = '';

  ngOnInit(): void {
    this.titelDuration = formatDuration(this.titel.durationInSeconds);
  }

  get valid(): boolean {
    return !!this.titel.titelName && !!this.titel.composer &&
      this.isValidDuration();
  }

  private isValidDuration() {
    return this.titelDuration != undefined && this.durationPattern.test(this.titelDuration);
  }

  updateDuration() {
    if (this.isValidDuration()) {
      this.titel.durationInSeconds = toDurationInSeconds(this.titelDuration) ?? 0;
    }
    this.onChange();
  }

  onChange() {
    if (this.valid) {
      this.changed.emit();
    }
  }
}
