import {Component, OnInit} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {VereinDTO} from "../rest";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  verein?: VereinDTO;
  notFound = false;
  saving = false;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.backendService.get().subscribe({
      next: response => {
        this.verein = response;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.notFound = true;
        }
      }
    });
  }

  save() {
    if (this.verein) {
      this.backendService.update(this.verein).subscribe({
        next: value => {
          this.verein = value;
        },
        error: err => {
// TODO handle error
        }
      });
    }
  }
}
