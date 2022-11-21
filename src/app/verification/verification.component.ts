import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LOGIN_PATH} from "../app-routing.module";
import {BackendService} from "../service/backend.service";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  loginUrl = `/${LOGIN_PATH}`

  verifying = false;
  error = false;
  success = false;

  constructor(private backendService: BackendService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    const verification = this.route.snapshot.paramMap.get('verification');

    if (email && verification) {
      this.verifying = true;
      this.backendService.verifyEmail(email, verification).subscribe({
        next: _ => {
          this.verifying = false;
          this.success = true;
        },
        error: _ => {
          this.verifying = false;
          this.error = true;
        }
      })
    } else {
      this.error = true;
    }
  }

}
