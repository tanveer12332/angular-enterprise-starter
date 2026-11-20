import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
import { AuthResponse, Credentials, User } from './auth.models';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ user }) => ({
    isAuthenticated: computed(() => !!user()),
    roles: computed(() => user()?.roles ?? []),
    fullName: computed(() => user()?.name ?? ''),
  })),

  withMethods((store, api = inject(AuthService), router = inject(Router), storage = inject(TokenStorageService)) => {
    // Helper: login aur interceptor dono yahi use karte hain
    const applySession = (res: AuthResponse) => {
      storage.save(res);
      patchState(store, {
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        loading: false,
        error: null,
      });
    };

    return {
      setSession: applySession,

      hasAnyRole(required: string[]): boolean {
        return required.some(r => store.roles().includes(r));
      },

      login: rxMethod<Credentials & { returnUrl?: string }>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(({ returnUrl, ...creds }) =>
            api.login(creds).pipe(
              tapResponse({
                next: res => {
                  applySession(res);
                  router.navigateByUrl(returnUrl || '/dashboard');
                },
                error: (e: HttpErrorResponse) =>
                  patchState(store, { loading: false, error: e.error?.message ?? 'Login failed' }),
              })
            )
          )
        )
      ),

      logout() {
        storage.clear();
        patchState(store, initialState);
        router.navigateByUrl('/auth/login');
      },
    };
  }),

  withHooks({
    onInit(store) {
      // App start par session restore
      const saved = inject(TokenStorageService).load();
      if (saved) {
        patchState(store, {
          user: saved.user,
          accessToken: saved.accessToken,
          refreshToken: saved.refreshToken,
        });
      }
    },
  })
);
