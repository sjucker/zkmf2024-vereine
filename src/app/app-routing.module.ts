import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AuthenticationGuard} from "./service/authentication.guard";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {VerificationComponent} from "./verification/verification.component";

export const LOGIN_PATH = 'login'
export const ANMELDUNG_PATH = 'anmeldung'
export const VERIFICATION_PATH = 'verification'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: LOGIN_PATH,
    component: LoginComponent
  },
  {
    path: LOGIN_PATH + '/:email',
    component: LoginComponent
  },
  {
    path: ANMELDUNG_PATH,
    component: RegisterComponent
  },
  {
    path: VERIFICATION_PATH + '/:email/:verification',
    component: VerificationComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
