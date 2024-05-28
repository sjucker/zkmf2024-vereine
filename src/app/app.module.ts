import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

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
import {PhaseStatusComponent} from './components/phase-status/phase-status.component';
import {DurationInputComponent} from './components/duration-input/duration-input.component';
import {Phase2Component} from './phase2/phase2.component';
import {Phase1Component} from './phase1/phase1.component';
import {ProgrammComponent} from './programm/programm.component';
import {MatRadioModule} from "@angular/material/radio";
import {TambourenTitelComponent} from './components/tambouren-titel/tambouren-titel.component';
import {ParademusikTitelComponent} from './components/parademusik-titel/parademusik-titel.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {UnsavedChangesDialogComponent} from './unsaved-changes-dialog/unsaved-changes-dialog.component';
import {MessagesComponent} from './messages/messages.component';
import {registerLocaleData} from "@angular/common";
import {Phase4Component} from "./phase4/phase4.component";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {StageComponent} from "./stage/stage.component";
import {StageViewComponent} from "./stage-view/stage-view.component";

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
    PhaseStatusComponent,
    DurationInputComponent,
    Phase1Component,
    Phase2Component,
    Phase4Component,
    ProgrammComponent,
    TambourenTitelComponent,
    ParademusikTitelComponent,
    UnsavedChangesDialogComponent,
    MessagesComponent,
    StageComponent,
    StageViewComponent,
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
    MatRadioModule,
    MatAutocompleteModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatMomentDateModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'de-DE'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe, 'de-DE', localeDeExtra);
  }
}
