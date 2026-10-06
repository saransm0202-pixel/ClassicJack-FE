import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BootService {
  readonly ready = signal(false);

  markReady(): void {
    this.ready.set(true);
  }
}