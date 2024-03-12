import {AfterViewInit, Component, OnInit, signal} from '@angular/core';
import init, {add, read_data} from "../../assets/wasm_stage"
import {BackendService} from "../service/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VereinStageSetupDTO} from "../rest";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit, AfterViewInit {

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
    init("/assets/stager-3ab7e46af3d2a755_bg.wasm");
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

  ngAfterViewInit(): void {
    this.backendService.getStageSetup().subscribe(value => {
      this.stageSetup = value;
      setTimeout(() => {
        // wait some time so stage is initialised
        // TODO better solution? wait for some signal from canvas?
        this.loading.set(false);
        this.addToCanvas(value.stageSetup);
      }, 1000);
    });
  }

  addToCanvas(data: string): void {
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
