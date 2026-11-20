import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { UsersApi } from './users.api';
import { UserDto } from './users.models';

type UsersState = { loading: boolean; error: string | null; search: string; page: number; pageSize: number };

export const UsersStore = signalStore(
  withEntities<UserDto>(),
  withState<UsersState>({ loading: false, error: null, search: '', page: 1, pageSize: 20 }),

  withComputed(({ entities, search }) => ({
    filtered: computed(() => {
      const q = search().toLowerCase();
      return entities().filter(u => u.name.toLowerCase().includes(q));
    }),
    total: computed(() => entities().length),
  })),

  withMethods((store, api = inject(UsersApi)) => ({
    setSearch(search: string) { patchState(store, { search, page: 1 }); },

    load: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          api.getAll({ page: store.page(), size: store.pageSize() }).pipe(
            tapResponse({
              next: users => patchState(store, setAllEntities(users), { loading: false }),
              error: () => patchState(store, { loading: false, error: 'Users load nahi huye' }),
            })
          )
        )
      )
    ),

    create: rxMethod<Omit<UserDto, 'id'>>(
      switchMap(dto =>
        api.create(dto).pipe(
          tapResponse({
            next: u => patchState(store, addEntity(u)),
            error: () => patchState(store, { error: 'Create failed' }),
          })
        )
      )
    ),

    update: rxMethod<UserDto>(
      switchMap(dto =>
        api.update(dto).pipe(
          tapResponse({
            next: u => patchState(store, updateEntity({ id: u.id, changes: u })),
            error: () => patchState(store, { error: 'Update failed' }),
          })
        )
      )
    ),

    remove: rxMethod<string>(
      switchMap(id =>
        api.delete(id).pipe(
          tapResponse({
            next: () => patchState(store, removeEntity(id)),
            error: () => patchState(store, { error: 'Delete failed' }),
          })
        )
      )
    ),
  }))
);
