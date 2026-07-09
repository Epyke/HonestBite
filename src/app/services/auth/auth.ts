import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse, RegisterRequest } from 'src/app/models/auth.model';
import { CurrentUser } from 'src/app/models/user.model';
import { UserSession } from './user-session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/users`;
  private readonly TOKEN_KEY = 'hb_token';
  private readonly USER_KEY = 'hb_user';

  constructor(private http: HttpClient) {}

  register(body: RegisterRequest): Observable<void> {
    return this.http.post(`${this.apiUrl}/register`, body).pipe(map(() => void 0));
  }

  login(body: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body).pipe(
          tap(res => {
            const { token, ...user } = res;
            UserSession.set(user, token);
          }));
  }

  logout(): void { UserSession.clear(); }

  getToken(): string | null { return UserSession.token; }
  isAuthenticated(): boolean { return UserSession.isLoggedIn; }
  currentUser(): CurrentUser | null { return UserSession.get(); }
  getUserId(): number | null { return UserSession.get()?.id ?? null; }
  getUsername(): string | null { return UserSession.get()?.username ?? null; }
  getEmail(): string | null { return UserSession.get()?.email ?? null; }
}
