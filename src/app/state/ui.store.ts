import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type UiState = { sidebarOpen: boolean; theme: 'light' | 'dark' };

export const UiStore = signalStore(
  { providedIn: 'root' },
  withState<UiState>({ sidebarOpen: true, theme: 'light' }),
  withMethods(store => ({
    toggleSidebar() { patchState(store, s => ({ sidebarOpen: !s.sidebarOpen })); },
    setTheme(theme: UiState['theme']) { patchState(store, { theme }); },
  }))
);
