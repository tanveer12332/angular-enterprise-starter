import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, throwError } from 'rxjs';
import { APP_CONFIG } from '../config/app-config.token';
import { AuthResponse, Credentials } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private cfg = inject(APP_CONFIG);

  login(creds: Credentials): Observable<AuthResponse> {
    if (this.cfg.useMock) {
      if (!creds.email || !creds.password) {
        return throwError(() => ({ error: { message: 'Email/password required' } }));
      }
      // Mock: email mein "admin" ho to admin role milega
      const isAdmin = creds.email.toLowerCase().includes('admin');
      return of({
        user: { id: '1', name: isAdmin ? 'Admin User' : 'Normal User', email: creds.email, roles: isAdmin ? ['admin'] : ['user'] },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      }).pipe(delay(500));
    }
    return this.http.post<AuthResponse>(`${this.cfg.apiUrl}/auth/login`, creds);
  }

  refresh(refreshToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.cfg.apiUrl}/auth/refresh`, { refreshToken });
  }
}
