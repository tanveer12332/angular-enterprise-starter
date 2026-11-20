import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersStore } from '../../data-access/users.store';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <a routerLink="/users">← Back</a>
      @if (user(); as u) {
        <h2>{{ u.name }}</h2>
        <p>Email: {{ u.email }}</p>
        <p>Role: {{ u.role }}</p>
      } @else {
        <p>User nahi mila (list page se open karo, ya refresh ke baad dobara load karo).</p>
      }
    </div>
  `,
})
export class UserDetailComponent {
  private store = inject(UsersStore);
  // Route param :id, withComponentInputBinding() se
  readonly id = input.required<string>();
  readonly user = computed(() => this.store.entityMap()[this.id()]);
}
