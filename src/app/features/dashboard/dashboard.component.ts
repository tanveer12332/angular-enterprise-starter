import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthStore } from '../../core/auth/auth.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h2>Dashboard</h2>
      <p>Welcome, <strong>{{ auth.fullName() }}</strong></p>
      <p>Roles: {{ auth.roles().join(', ') }}</p>
    </div>
  `,
})
export class DashboardComponent {
  readonly auth = inject(AuthStore);
}
