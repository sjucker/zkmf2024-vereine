import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from "../service/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ANMELDUNG_PATH, FORGOT_PASSWORD_PATH} from "../app-routing.module";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authenticating = false;

  anmeldungUrl = `/${ANMELDUNG_PATH}`;
  forgotPasswordUrl =  `/${FORGOT_PASSWORD_PATH}`;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.loginForm.setValue({
        email: email,
        password: ''
      });
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authenticating = true;
      const val = this.loginForm.value;
      this.authenticationService.login(val.email!, val.password!).subscribe({
        next: response => {
          this.authenticating = false;
          this.authenticationService.setCredentials(response);
          this.router.navigate(['/']).then();
        },
        error: _ => {
          this.authenticating = false;
          this.snackBar.open("Email oder Passwort nicht korrekt", undefined, {
            verticalPosition: "top",
            panelClass: "error"
          });
        }
      })
    }
  }

}
