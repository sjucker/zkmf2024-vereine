import {Component, Input} from '@angular/core';
import {VereinMessageDTO} from "../rest";
import {BackendService} from "../service/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  @Input({required: true})
  messages: VereinMessageDTO[] = [];

  message = '';

  saving = false;

  constructor(private service: BackendService,
              public snackBar: MatSnackBar  ) {
  }

  saveMessage() {
    this.saving = true;

    this.service.saveMessag(this.message).subscribe({
      next: value => {
        this.messages = [...this.messages, value];
        this.saving = false;
        this.message = '';
        this.snackBar.open('Nachricht gesendet', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 2000,
          panelClass: 'success'
        });
      },
      error: ()=> {
        this.saving = false;
        this.snackBar.open("Es ist ein Fehler aufgetreten...", undefined, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'error'
        });
      }
    });
  }

  get hasMessages(): boolean {
    return this.messages.length > 0;
  }
}
