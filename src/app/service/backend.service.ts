import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {
  ForgotPasswordRequestDTO,
  RegisterVereinRequestDTO,
  ResetPasswordRequestDTO,
  VereinDTO,
  VerifyEmailRequestDTO
} from "../rest";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = environment.baseUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  public register(email: string, password: string, vereinsname: string): Observable<any> {
    const request: RegisterVereinRequestDTO = {
      email: email,
      password: password,
      vereinsname: vereinsname
    };

    return this.httpClient.post(`${this.baseUrl}/public/verein`, request);
  }

  public verifyEmail(email: string, verification: string): Observable<any> {
    const request: VerifyEmailRequestDTO = {
      email: email,
      verification: verification
    };

    return this.httpClient.post(`${this.baseUrl}/public/verein/verification`, request);
  }

  public forgotPassword(email: string): Observable<any> {
    const request: ForgotPasswordRequestDTO = {
      email: email
    };
    return this.httpClient.post(`${this.baseUrl}/public/verein/forgot-password`, request);
  }

  public resetPassword(email: string, token: string, newPassword: string): Observable<any> {
    const request: ResetPasswordRequestDTO = {
      email: email,
      token: token,
      newPassword: newPassword
    };
    return this.httpClient.post(`${this.baseUrl}/public/verein/reset-password`, request);
  }


  public get(): Observable<VereinDTO> {
    return this.httpClient.get<VereinDTO>(`${this.baseUrl}/secured/verein`);
  }

  public update(verein: VereinDTO): Observable<VereinDTO> {
    return this.httpClient.put<VereinDTO>(`${this.baseUrl}/secured/verein`, verein);
  }

  public upload(logo?: File, bild?: File): Observable<any> {
    const formData: FormData = new FormData();

    if (logo) {
      formData.append('logo', logo);
    }
    if (bild) {
      formData.append('bild', bild);
    }

    return this.httpClient.post(`${this.baseUrl}/secured/verein/bilder-upload`, formData);
  }

  public deleteImage(imageId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/secured/verein/bilder-upload/${imageId}`);
  }

}
