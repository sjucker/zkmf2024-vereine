import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {
  ForgotPasswordRequestDTO,
  JudgeReportFeedbackDTO,
  RegisterVereinRequestDTO,
  ResetPasswordRequestDTO,
  VereinDTO,
  VereinMessageCreateDTO,
  VereinMessageDTO,
  VereinSelectionDTO,
  VereinStageSetupDTO,
  VerifyEmailRequestDTO
} from "../rest";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = environment.baseUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  public register(email: string, password: string, vereinsname: string): Observable<void> {
    const request: RegisterVereinRequestDTO = {
      email: email,
      password: password,
      vereinsname: vereinsname
    };

    return this.httpClient.post<void>(`${this.baseUrl}/public/verein`, request);
  }

  public verifyEmail(email: string, verification: string): Observable<void> {
    const request: VerifyEmailRequestDTO = {
      email: email,
      verification: verification
    };

    return this.httpClient.post<void>(`${this.baseUrl}/public/verein/verification`, request);
  }

  public forgotPassword(email: string): Observable<void> {
    const request: ForgotPasswordRequestDTO = {
      email: email
    };
    return this.httpClient.post<void>(`${this.baseUrl}/public/verein/forgot-password`, request);
  }

  public resetPassword(email: string, token: string, newPassword: string): Observable<void> {
    const request: ResetPasswordRequestDTO = {
      email: email,
      token: token,
      newPassword: newPassword
    };
    return this.httpClient.post<void>(`${this.baseUrl}/public/verein/reset-password`, request);
  }

  public get(): Observable<VereinDTO> {
    return this.httpClient.get<VereinDTO>(`${this.baseUrl}/secured/verein`);
  }

  public getStageSetup(): Observable<VereinStageSetupDTO> {
    return this.httpClient.get<VereinStageSetupDTO>(`${this.baseUrl}/secured/verein/stage`);
  }

  public availableVereine(): Observable<VereinSelectionDTO[]> {
    return this.httpClient.get<VereinSelectionDTO[]>(`${this.baseUrl}/secured/verein/all`);
  }

  public update(verein: VereinDTO): Observable<VereinDTO> {
    return this.httpClient.put<VereinDTO>(`${this.baseUrl}/secured/verein`, verein);
  }

  public updateStageSetup(stageSetup: VereinStageSetupDTO): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/secured/verein/stage`, stageSetup)
  }

  public uploadAdditionalStageSetup(file: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<void>(`${this.baseUrl}/secured/verein/stage/additional`, formData);
  }

  public deleteAdditionalStageSetup(): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/secured/verein/stage/additional`);
  }

  public getAdditionalStageSetup(): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/secured/verein/stage/additional`, {
      responseType: "blob"
    });
  }

  confirmRegistration() {
    return this.httpClient.post<VereinDTO>(`${this.baseUrl}/secured/verein/confirm`, {});
  }

  public upload(logo?: File, bild?: File): Observable<void> {
    const formData: FormData = new FormData();

    if (logo) {
      formData.append('logo', logo);
    }
    if (bild) {
      formData.append('bild', bild);
    }

    return this.httpClient.post<void>(`${this.baseUrl}/secured/verein/bilder-upload`, formData);
  }

  public deleteImage(imageId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/secured/verein/bilder-upload/${imageId}`);
  }

  public saveMessag(message: string): Observable<VereinMessageDTO> {
    const request: VereinMessageCreateDTO = {
      message: message
    };
    return this.httpClient.post<VereinMessageDTO>(`${this.baseUrl}/secured/verein/messages`, request);
  }

  public feedback(modul: string, category?: string): Observable<JudgeReportFeedbackDTO> {
    let url = `${this.baseUrl}/secured/verein/feedback/${modul}`;
    if (category) {
      url += `?category=${category}`;
    }
    return this.httpClient.get<JudgeReportFeedbackDTO>(url);
  }
}
