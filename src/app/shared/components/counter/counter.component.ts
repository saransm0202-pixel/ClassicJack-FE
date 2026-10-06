import { Component, input, ElementRef, inject, AfterViewInit, OnDestroy } from '@angular/core';

/**
 * Counts from 0 to `value` when it scrolls into view. GPU-friendly:
 * only a text placeholder is written each frame.
 */
@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent implements AfterViewInit, OnDestroy {
  readonly value = input(0);
  readonly suffix = input('');
  readonly duration = input(1800);

  protected display = '0';

  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private started = false;

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.display = String(this.value());
      return;
    }
    this.observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !this.started) {
          this.started = true;
          this.run();
          this.observer?.disconnect();
        }
      }
    });
    this.observer.observe(this.el.nativeElement);
  }

  private run(): void {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      this.display = String(this.value());
      return;
    }

    const target = this.value();
    const duration = this.duration();
    const start = performance.now();

    const tick = (now: number): void => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      this.display = Math.round(target * eased).toLocaleString('en-IN');
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}