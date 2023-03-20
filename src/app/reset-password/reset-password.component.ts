import {Component, OnInit} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LOGIN_PATH} from "../app-routing.module";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loginUrl = ''
  email?: string | null
  token?: string | null

  password = ''

  processing = false
  success = false

  constructor(private backendService: BackendService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    this.token = this.route.snapshot.paramMap.get('token');

    if (!this.email || !this.token) {
      this.router.navigate(['/']).then()
    }
  }

  resetPassword() {
    if (this.email && this.token && this.password) {
      this.processing = true;
      this.backendService.resetPassword(this.email, this.token, this.password).subscribe({
        next: _ => {
          this.processing = false
          this.success = true;
          this.loginUrl = `/${LOGIN_PATH}/${this.email}`
        },
        error: _ => {
          this.processing = false;
          this.snackBar.open("Es ist ein Fehler aufgetreten.", undefined, {
            verticalPosition: "top",
            panelClass: "error"
          })
        }
      })
    }
  }
}
