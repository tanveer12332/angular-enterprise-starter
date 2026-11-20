import { Routes } from '@angular/router';
import { UsersStore } from './data-access/users.store';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    providers: [UsersStore], // store sirf is feature ke liye (route-scoped)
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/user-list/user-list.component').then(m => m.UserListComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/user-detail/user-detail.component').then(m => m.UserDetailComponent),
      },
    ],
  },
];
