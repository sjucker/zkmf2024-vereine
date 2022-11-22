import {Component, OnInit} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {VereinDTO} from "../rest";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  verein?: VereinDTO;

  notFound = false;
  error = false;

  saving = false;

  constructor(private backendService: BackendService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.backendService.get().subscribe({
      next: response => {
        this.verein = response;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.notFound = true;
        } else {
          this.error = true;
        }
      }
    });
  }

  save() {
    if (this.verein) {
      this.saving = true;
      this.backendService.update(this.verein).subscribe({
        next: value => {
          this.verein = value;
          this.saving = false;
          this.snackBar.open('Speichern war erfolgreich', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 2000,
            panelClass: 'success'
          });
        },
        error: _ => {
          this.saving = false;
          this.snackBar.open('Es ist ein Fehler aufgetreten...', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 3000,
            panelClass: 'error'
          });
        }
      });
    }
  }
}
