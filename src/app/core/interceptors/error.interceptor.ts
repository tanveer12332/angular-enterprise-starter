import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(NotificationService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 0) notify.error('Network error. Internet check karo.');
      else if (err.status >= 500) notify.error('Server error. Baad mein try karo.');
      return throwError(() => err);
    })
  );
};
