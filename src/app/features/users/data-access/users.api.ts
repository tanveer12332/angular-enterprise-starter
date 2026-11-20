import { Injectable, inject } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { APP_CONFIG } from '../../../core/config/app-config.token';
import { UserDto } from './users.models';

// Mock data (useMock = true par)
let MOCK: UserDto[] = [
  { id: '1', name: 'Ali Khan', email: 'ali@example.com', role: 'admin' },
  { id: '2', name: 'Sara Ahmed', email: 'sara@example.com', role: 'manager' },
  { id: '3', name: 'Usman Raza', email: 'usman@example.com', role: 'user' },
];

@Injectable({ providedIn: 'root' })
export class UsersApi {
  private api = inject(ApiService);
  private mock = inject(APP_CONFIG).useMock;

  getAll(q: { page: number; size: number }): Observable<UserDto[]> {
    return this.mock ? of([...MOCK]).pipe(delay(400)) : this.api.get<UserDto[]>('/users', q);
  }

  create(dto: Omit<UserDto, 'id'>): Observable<UserDto> {
    if (this.mock) {
      const u = { ...dto, id: String(Date.now()) };
      MOCK = [...MOCK, u];
      return of(u).pipe(delay(300));
    }
    return this.api.post<UserDto>('/users', dto);
  }

  update(dto: UserDto): Observable<UserDto> {
    if (this.mock) {
      MOCK = MOCK.map(u => (u.id === dto.id ? dto : u));
      return of(dto).pipe(delay(300));
    }
    return this.api.put<UserDto>(`/users/${dto.id}`, dto);
  }

  delete(id: string): Observable<void> {
    if (this.mock) {
      MOCK = MOCK.filter(u => u.id !== id);
      return of(void 0).pipe(delay(300));
    }
    return this.api.delete<void>(`/users/${id}`);
  }
}
