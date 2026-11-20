import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthStore } from '../../auth/auth.store';
import { UiStore } from '../../../state/ui.store';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <button (click)="ui.toggleSidebar()">☰</button>
      <strong>Enterprise App</strong>
      <span class="spacer"></span>
      <span>{{ auth.fullName() }}</span>
      <button class="danger" (click)="auth.logout()">Logout</button>
    </header>

    <div class="body">
      @if (ui.sidebarOpen()) {
        <nav class="sidebar">
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          @if (auth.hasAnyRole(['admin', 'manager'])) {
            <a routerLink="/users" routerLinkActive="active">Users</a>
          }
        </nav>
      }
      <main class="content"><router-outlet /></main>
    </div>

    <div class="toasts">
      @for (t of notify.toasts(); track t.id) {
        <div class="toast" [class]="t.type">{{ t.message }}</div>
      }
    </div>
  `,
  styles: [`
    .header{display:flex;gap:12px;align-items:center;padding:10px 16px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.1)}
    .spacer{flex:1}
    .body{display:flex;min-height:calc(100vh - 54px)}
    .sidebar{width:200px;background:#1f2937;padding:16px;display:flex;flex-direction:column;gap:10px}
    .sidebar a{color:#d1d5db;padding:6px 8px;border-radius:6px}
    .sidebar a.active{background:#374151;color:#fff}
    .content{flex:1;padding:20px}
    .toasts{position:fixed;right:16px;bottom:16px;display:flex;flex-direction:column;gap:8px}
    .toast{padding:10px 14px;border-radius:6px;color:#fff;background:#2563eb}
    .toast.error{background:#dc2626}.toast.success{background:#16a34a}
  `],
})
export class MainLayoutComponent {
  readonly auth = inject(AuthStore);
  readonly ui = inject(UiStore);
  readonly notify = inject(NotificationService);
}
