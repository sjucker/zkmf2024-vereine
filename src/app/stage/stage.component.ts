import {Component, OnInit, signal} from '@angular/core';
import init, {add, read_data} from "../../assets/wasm_stage"
import {BackendService} from "../service/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VereinStageSetupDTO} from "../rest";
import {Router} from "@angular/router";
import {combineLatestWith} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  canvasId = 'stage-canvas';

  stageSetup?: VereinStageSetupDTO;

  loading = signal(false);
  saving = signal(false);

  constructor(private backendService: BackendService,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loading.set(true);

    const wasm$ = fromPromise(init("/assets/stager-3ab7e46af3d2a755_bg.wasm"));
    const data$ = this.backendService.getStageSetup();

    wasm$.pipe(
      combineLatestWith(data$)
    ).subscribe((data) => {
      this.stageSetup = data[1];
      this.addToCanvas(data[1].stageSetup);
      this.loading.set(false);
    });
  }

  save() {
    this.saving.set(true);
    this.backendService.updateStageSetup({...this.stageSetup, stageSetup: read_data()})
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.snackBar.open('Speichern war erfolgreich', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 2000,
            panelClass: 'success'
          });
        },
        error: () => {
          this.saving.set(false);
          this.snackBar.open('Es ist ein Fehler aufgetreten...', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 3000,
            panelClass: 'error'
          });
        }
      });
  }

  private addToCanvas(data: string): void {
    add(this.canvasId, data);
  }

  canDeactivate(): boolean {
    // TODO handle pending changes
    return true;
  }

  navigateBack() {
    this.router.navigate(['/']).catch(reason => {
      console.error(reason);
    })
  }
}
