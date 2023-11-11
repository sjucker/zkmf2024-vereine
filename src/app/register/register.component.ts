import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BackendService} from "../service/backend.service";
import {LOGIN_PATH} from "../app-routing.module";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registering = false;
  errorMessage = '';
  success = false;

  loginUrl = '';

  registerForm = this.formBuilder.group({
    vereinsname: [null, [Validators.required]],
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder,
              private backendService: BackendService) {
  }

  register(): void {
    if (this.registerForm.valid) {
      this.registering = true;
      this.errorMessage = '';
      this.success = false;
      const val = this.registerForm.value;

      this.backendService.register(val.email!, val.password!, val.vereinsname!).subscribe({
        next: () => {
          this.registering = false;
          this.success = true;
          this.loginUrl = `/${LOGIN_PATH}/${val.email}`;
        },
        error: (err: HttpErrorResponse) => {
          this.registering = false;
          this.errorMessage = err.status == 400 ? 'Diese Email wurde schon registriert.' : 'Es ist ein Fehler aufgetreten...';
        }
      });
    }
  }

  get error(): boolean {
    return this.errorMessage.length > 0;
  }

}
