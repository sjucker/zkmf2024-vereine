import {Component, OnInit} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {VereinDTO} from "../rest";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  maxFileSize = 1000000;

  verein?: VereinDTO;

  notFound = false;
  error = false;

  saving = false;
  uploading = false;

  logo?: File;
  bild?: File;

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

  onDrop(event: NgxDropzoneChangeEvent, logo: boolean) {
    console.log(event);
    if (event.rejectedFiles.length > 0) {
      let errorMessage = "Es sind nur Datein vom Typ 'jpeg' erlaubt."
      if (event.rejectedFiles[0].size > this.maxFileSize) {
        errorMessage = "Maximal-Grösse von 1 MB überschritten."
      }

      this.snackBar.open(errorMessage, undefined, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'info'
      });
    }

    if (event.addedFiles.length === 1) {
      if (logo) {
        this.logo = event.addedFiles[0];
      } else {
        this.bild = event.addedFiles[0];
      }
    }
  }

  onRemove(logo: boolean) {
    if (logo) {
      this.logo = undefined;
    } else {
      this.bild = undefined;
    }
  }

  upload() {
    this.uploading = true;
    this.backendService.upload(this.logo, this.bild).subscribe({
      next: _ => {
        this.uploading = false;
        this.snackBar.open("Bild-Upload war erfolgreich", undefined, {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'success'
        });

      },
      error: _ => {
        this.uploading = false;
        this.snackBar.open("Es ist ein Fehler aufgetreten...", undefined, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'error'
        });
      }
    })
  }


}
