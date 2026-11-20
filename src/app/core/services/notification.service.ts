import { Injectable, signal } from '@angular/core';

export interface Toast { id: number; type: 'success' | 'error' | 'info'; message: string; }

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private counter = 0;
  readonly toasts = signal<Toast[]>([]);

  show(type: Toast['type'], message: string, ms = 4000) {
    const id = ++this.counter;
    this.toasts.update(t => [...t, { id, type, message }]);
    setTimeout(() => this.toasts.update(t => t.filter(x => x.id !== id)), ms);
  }
  success(m: string) { this.show('success', m); }
  error(m: string) { this.show('error', m); }
}
