import {Component, Input} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {LOGIN_PATH} from "../app-routing.module";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input({required: true})
  header = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  get loggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  logout(): void {
    this.router.navigate([LOGIN_PATH]).then(value => {
      if (value) {
        this.authenticationService.logout();
      }
    });
  }

  get error(): boolean {
    return false;
  }
}
