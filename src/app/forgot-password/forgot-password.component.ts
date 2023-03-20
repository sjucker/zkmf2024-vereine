import {Component} from '@angular/core';
import {BackendService} from "../service/backend.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  requesting = false;
  requested = false;
  email = ''

  constructor(private backendService: BackendService) {
  }

  requestPasswordReset() {
    if (this.email) {
      this.requesting = true;
      this.requested = false;
      this.backendService.forgotPassword(this.email).subscribe({
        next: value => {
          this.requesting = false;
          this.requested = true;
        },
        error: err => {
          this.requesting = false;
          this.requested = false;
        }
      });
    }
  }
}
