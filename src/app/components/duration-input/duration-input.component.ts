import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

export function toDurationInSeconds(duration: string): number {
  const parts = duration.split(":");
  if (parts.length == 2 && parts[0].length > 0 && parts[1].length > 0) {
    return (parseInt(parts[0]) * 60) + parseInt(parts[1]);
  } else {
    return 0;
  }
}

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss']
})
export class DurationInputComponent implements OnInit {

  @Input()
  durationInSeconds: number = 0;

  durationFormatted: string = "";

  @Output()
  valueChanged: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.durationFormatted = formatDuration(this.durationInSeconds);
  }

  onChange(value: string): void {
    this.valueChanged.emit(toDurationInSeconds(value));
  }
}
