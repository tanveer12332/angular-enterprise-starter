import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(...args: unknown[]) { if (!environment.production) console.log(...args); }
  error(...args: unknown[]) { console.error(...args); }
}
