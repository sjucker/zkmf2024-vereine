import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {RegisterVereinRequestDTO, VereinDTO} from "../rest";

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

  public get(): Observable<VereinDTO> {
    return this.httpClient.get<VereinDTO>(`${this.baseUrl}/secured/verein`);
  }

  public update(verein: VereinDTO): Observable<VereinDTO> {
    return this.httpClient.put<VereinDTO>(`${this.baseUrl}/secured/verein`, verein);
  }

}
