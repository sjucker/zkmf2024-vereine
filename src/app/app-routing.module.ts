import {inject, NgModule} from '@angular/core';
import {CanActivateFn, RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {AuthenticationGuard} from "./service/authentication.guard";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {VerificationComponent} from "./verification/verification.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {StageComponent} from "./stage/stage.component";
import {StageViewComponent} from "./stage-view/stage-view.component";
import {FeedbackComponent} from "./feedback/feedback.component";

export const LOGIN_PATH = 'login';
export const ANMELDUNG_PATH = 'nachmeldung';
export const VERIFICATION_PATH = 'verification';
export const FORGOT_PASSWORD_PATH = 'passwort-vergessen';
export const RESET_PASSWORD_PATH = 'reset-passwort';
export const STAGE_PATH = 'buehnenplan';
export const STAGE_VIEW_PATH = 'buehnenplan-ansicht';
export const FEEDBACK_PATH = 'feedback';

const canActivateFn: CanActivateFn = () => inject(AuthenticationGuard).canActivate();

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [canActivateFn],
    canDeactivate: [(component: MainComponent) => component.canDeactivate()]
  },
  {
    path: STAGE_PATH,
    component: StageComponent,
    canActivate: [canActivateFn],
    canDeactivate: [(component: StageComponent) => component.canDeactivate()]
  },
  {
    path: STAGE_VIEW_PATH,
    component: StageViewComponent,
    canActivate: [canActivateFn]
  },
  {
    path: `${FEEDBACK_PATH}/:modul`,
    component: FeedbackComponent,
    canActivate: [canActivateFn],
  },
  {
    path: `${FEEDBACK_PATH}/:modul/:category`,
    component: FeedbackComponent,
    canActivate: [canActivateFn],
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
  {
    path: FORGOT_PASSWORD_PATH,
    component: ForgotPasswordComponent
  },
  {
    path: RESET_PASSWORD_PATH + '/:email/:token',
    component: ResetPasswordComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
