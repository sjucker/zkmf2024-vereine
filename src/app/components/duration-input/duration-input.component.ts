import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

export function formatDuration(durationInSeconds?: number): string {
  if (durationInSeconds) {
    const seconds = Math.abs(durationInSeconds);
    let formatted = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

    if (durationInSeconds < 0) {
      formatted = "-" + formatted;
    }

    return formatted;
  }

  return '';
}

export function toDurationInSeconds(duration: string): number | undefined { // TODO test this
  const parts = duration.split(":");
  if (parts.length == 2 && parts[0].length > 0 && parts[1].length == 2) {
    return (parseInt(parts[0]) * 60) + parseInt(parts[1]);
  } else if (duration.length == 0) {
    return 0;
  } else {
    return undefined;
  }
}

export const durationPattern = /^\d{1,2}:\d{2}$/;

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss']
})
export class DurationInputComponent implements OnInit, OnChanges {

  @Input({required: true})
  durationInSeconds: number = 0;
  @Input()
  maxDurationInSeconds: number = 30;
  @Input({required: true})
  readOnly = false;

  durationFormatted: string = "";
  invalid = false;

  @Output()
  valueChanged: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.durationFormatted = formatDuration(this.durationInSeconds);
  }

  ngOnChanges(): void {
    this.durationFormatted = formatDuration(this.durationInSeconds);
  }

  onChange(value: string): void {
    this.invalid = false;
    const duration = toDurationInSeconds(value);
    if (duration !== undefined) {
      if (duration <= this.maxDurationInSeconds) {
        this.valueChanged.emit(duration);
      } else {
        this.invalid = true;
      }
    }
  }

}
