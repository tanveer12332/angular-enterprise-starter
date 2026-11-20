import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthStore } from './auth.store';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);
  const authService = inject(AuthService);

  const token = store.accessToken();
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      const refreshToken = store.refreshToken();
      if (err.status === 401 && refreshToken && !req.url.includes('/auth/')) {
        return authService.refresh(refreshToken).pipe(
          switchMap(res => {
            store.setSession(res);
            return next(req.clone({ setHeaders: { Authorization: `Bearer ${res.accessToken}` } }));
          }),
          catchError(e => {
            store.logout();
            return throwError(() => e);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
