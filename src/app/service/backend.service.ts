import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {RegisterVereinRequestDTO, VereinDTO, VerifyEmailRequestDTO} from "../rest";

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

  public get(): Observable<VereinDTO> {
    return this.httpClient.get<VereinDTO>(`${this.baseUrl}/secured/verein`);
  }

  public update(verein: VereinDTO): Observable<VereinDTO> {
    return this.httpClient.put<VereinDTO>(`${this.baseUrl}/secured/verein`, verein);
  }

}
