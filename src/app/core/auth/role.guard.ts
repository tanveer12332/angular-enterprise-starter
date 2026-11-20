import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';

export const roleGuard: CanActivateFn = route => {
  const auth = inject(AuthStore);
  const router = inject(Router);
  const required = (route.data['roles'] as string[] | undefined) ?? [];
  return required.length === 0 || auth.hasAnyRole(required)
    ? true
    : router.createUrlTree(['/forbidden']);
};
