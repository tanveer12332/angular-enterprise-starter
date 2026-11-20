import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
      },
      {
        path: 'users',
        canActivate: [roleGuard],
        data: { roles: ['admin', 'manager'] },
        loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES),
      },
      {
        path: 'forbidden',
        loadComponent: () => import('./shared/ui/forbidden.component').then(m => m.ForbiddenComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./shared/ui/not-found.component').then(m => m.NotFoundComponent),
  },
];
