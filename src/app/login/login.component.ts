import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from "../service/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ANMELDUNG_PATH} from "../app-routing.module";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authenticating = false;
  authenticationError = false;

  anmeldungUrl = `/${ANMELDUNG_PATH}`;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
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
      this.authenticationError = false;
      const val = this.loginForm.value;
      this.authenticationService.login(val.email!, val.password!).subscribe({
        next: response => {
          this.authenticating = false;
          this.authenticationService.setCredentials(response);
          this.router.navigate(['/']);
        },
        error: _ => {
          this.authenticating = false;
          this.authenticationError = true;
        }
      })
    }
  }

}
