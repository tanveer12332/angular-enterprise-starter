import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '../../../core/auth/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Login</h2>
    <p><small>Mock mode: koi bhi email/password. "admin" likho to admin role.</small></p>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <p><input formControlName="email" placeholder="Email" style="width:100%" /></p>
      <p><input formControlName="password" type="password" placeholder="Password" style="width:100%" /></p>
      @if (auth.error()) { <p class="error">{{ auth.error() }}</p> }
      <button type="submit" [disabled]="form.invalid || auth.loading()">
        {{ auth.loading() ? 'Please wait...' : 'Login' }}
      </button>
    </form>
  `,
})
export class LoginComponent {
  readonly auth = inject(AuthStore);
  private fb = inject(FormBuilder);
  // withComponentInputBinding() se query param ?returnUrl= yahan aa jata hai
  readonly returnUrl = input<string>();

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) return;
    this.auth.login({ ...this.form.getRawValue(), returnUrl: this.returnUrl() });
  }
}
