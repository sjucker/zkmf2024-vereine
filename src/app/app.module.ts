import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {AuthenticationInterceptor} from "./interceptors/authentication-interceptor.service";
import {MainComponent} from "./main/main.component";
import {MatIconModule} from "@angular/material/icon";
import {HeaderComponent} from "./header/header.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {RegisterComponent} from './register/register.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ActionButtonComponent} from './components/action-button/action-button.component';
import {VerificationComponent} from './verification/verification.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {KontaktFormComponent} from './components/kontakt-form/kontakt-form.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {ValidationStateComponent} from "./components/validation-state/validation-state.component";
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {GeneralInfoDialogComponent} from './general-info-dialog/general-info-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ConfirmRegistrationDialogComponent} from './confirm-registration-dialog/confirm-registration-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    RegisterComponent,
    ActionButtonComponent,
    ValidationStateComponent,
    VerificationComponent,
    KontaktFormComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    GeneralInfoDialogComponent,
    ConfirmRegistrationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    NgxDropzoneModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
