import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { gsap } from '../../../core/utils/gsap.util';

/**
 * Applies a subtle magnetic pull to the host element on desktop pointer hover.
 */
@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective implements OnInit, OnDestroy {
  @Input() strength = 0.35;

  private el = inject(ElementRef<HTMLElement>);
  private raf = 0;
  private tween?: gsap.core.Tween;
  private enabled = false;

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    this.enabled = !reduced && !coarse;
    if (!this.enabled) return;

    const el = this.el.nativeElement;
    el.addEventListener('pointerenter', this.onEnter);
    el.addEventListener('pointermove', this.onMove);
    el.addEventListener('pointerleave', this.onLeave);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.tween?.kill();
    if (this.enabled) {
      const el = this.el.nativeElement;
      el.removeEventListener('pointerenter', this.onEnter);
      el.removeEventListener('pointermove', this.onMove);
      el.removeEventListener('pointerleave', this.onLeave);
    }
  }

  private onEnter = (): void => {
    this.tween?.kill();
  };

  private onMove = (e: PointerEvent): void => {
    const el = this.el.nativeElement;
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * this.strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * this.strength;
      this.tween = gsap.to(el, { x, y, duration: 0.5, ease: 'power3.out' });
    });
  };

  private onLeave = (): void => {
    const el = this.el.nativeElement;
    cancelAnimationFrame(this.raf);
    this.tween = gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
  };
}