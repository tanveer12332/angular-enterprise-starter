import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersStore } from '../../data-access/users.store';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h2>Users ({{ store.total() }})</h2>
      <input #q (input)="store.setSearch(q.value)" placeholder="Search..." />
      <button style="margin-left:8px" (click)="addDemo()">+ Add demo user</button>

      @if (store.loading()) { <p>Loading...</p> }
      @if (store.error()) { <p class="error">{{ store.error() }}</p> }

      <ul>
        @for (u of store.filtered(); track u.id) {
          <li>
            <a [routerLink]="['/users', u.id]">{{ u.name }}</a> - {{ u.email }} ({{ u.role }})
            <button class="danger" (click)="store.remove(u.id)">Delete</button>
          </li>
        }
      </ul>
    </div>
  `,
})
export class UserListComponent implements OnInit {
  readonly store = inject(UsersStore);

  ngOnInit() { this.store.load(); }

  addDemo() {
    const n = this.store.total() + 1;
    this.store.create({ name: `Demo User ${n}`, email: `demo${n}@example.com`, role: 'user' });
  }
}
