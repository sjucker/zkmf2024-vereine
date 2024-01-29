import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-festkarten-dialog',
  standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle
    ],
  templateUrl: './festkarten-dialog.component.html',
  styleUrl: './festkarten-dialog.component.scss'
})
export class FestkartenDialogComponent {

}
