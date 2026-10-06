import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MediaQueryService {
  readonly isMobile = signal(false);
  readonly isTablet = signal(false);
  readonly prefersReducedMotion = signal(false);
  readonly isTouch = signal(false);

  readonly isDesktop = computed(() => !this.isMobile() && !this.isTablet());

  constructor() {
    if (typeof window === 'undefined') return;

    this.isTouch.set('ontouchstart' in window || navigator.maxTouchPoints > 0);
    this.prefersReducedMotion.set(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    this._updateViewports();

    window.matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', (e) => this.prefersReducedMotion.set(e.matches));
    window.addEventListener('resize', () => this._updateViewports());
  }

  private _updateViewports(): void {
    const w = window.innerWidth;
    this.isMobile.set(w < 768);
    this.isTablet.set(w >= 768 && w < 1024);
  }
}
