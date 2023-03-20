import {Injectable} from '@angular/core';
import {Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./authentication.service";
import {LOGIN_PATH} from "../app-routing.module";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    } else {
      return this.router.parseUrl(LOGIN_PATH);
    }
  }

}
