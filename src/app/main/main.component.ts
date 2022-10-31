import {Component, OnInit} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {BandDTO} from "../rest";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  band?: BandDTO;
  notFound = false;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.backendService.get().subscribe({
      next: response => {
        this.band = response;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.notFound = true;
        }
      }
    });
  }

}
