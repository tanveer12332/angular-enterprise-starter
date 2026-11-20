import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `<div style="padding:40px"><h2>404 - Page nahi mila</h2><a routerLink="/">Home</a></div>`,
})
export class NotFoundComponent {}
