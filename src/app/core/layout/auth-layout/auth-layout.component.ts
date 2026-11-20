import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="wrap"><div class="card box"><router-outlet /></div></div>`,
  styles: [`.wrap{min-height:100vh;display:grid;place-items:center}.box{width:360px}`],
})
export class AuthLayoutComponent {}
