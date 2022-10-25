import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChangePasswordRequestDTO, LoginRequestDTO, LoginResponseDTO} from "../rest";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly token = 'token';
  private readonly userId = 'user-id';
  private readonly admin = 'admin';

  private baseUrl = environment.baseUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  login(email: string, password: string): Observable<LoginResponseDTO> {
    const request: LoginRequestDTO = {
      email: email,
      password: password
    };

    return this.httpClient.post<LoginResponseDTO>(`${this.baseUrl}/authenticate`, request);
  }

  logout(): void {
    localStorage.clear();
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const request: ChangePasswordRequestDTO = {
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    return this.httpClient.post<any>(`${this.baseUrl}/authenticate/change-password`, request);
  }

  setCredentials(dto: LoginResponseDTO): void {
    localStorage.setItem(this.token, dto.jwt);
    localStorage.setItem(this.userId, String(dto.id));
  }

  getAuthorizationToken(): string | null {
    return localStorage.getItem(this.token);
  }

  getUserId(): number | null {
    const userId = localStorage.getItem(this.userId);
    if (userId) {
      return parseInt(userId);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.token) !== null;
  }

}
