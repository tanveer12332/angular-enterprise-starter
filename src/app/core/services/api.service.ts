import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_CONFIG } from '../config/app-config.token';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = inject(APP_CONFIG).apiUrl;

  get<T>(path: string, params?: Record<string, string | number>) {
    let p = new HttpParams();
    Object.entries(params ?? {}).forEach(([k, v]) => (p = p.set(k, String(v))));
    return this.http.get<T>(`${this.base}${path}`, { params: p });
  }
  post<T>(path: string, body: unknown) { return this.http.post<T>(`${this.base}${path}`, body); }
  put<T>(path: string, body: unknown) { return this.http.put<T>(`${this.base}${path}`, body); }
  delete<T>(path: string) { return this.http.delete<T>(`${this.base}${path}`); }
}
