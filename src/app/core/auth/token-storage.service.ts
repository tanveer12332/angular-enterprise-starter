import { Injectable } from '@angular/core';
import { AuthResponse } from './auth.models';

const KEY = 'auth_session';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  save(session: AuthResponse): void {
    localStorage.setItem(KEY, JSON.stringify(session));
  }
  load(): AuthResponse | null {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as AuthResponse) : null;
    } catch {
      return null;
    }
  }
  clear(): void {
    localStorage.removeItem(KEY);
  }
}
