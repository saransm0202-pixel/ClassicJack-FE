import { Component, input, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { gsap, ScrollTrigger } from '../../../core/utils/gsap.util';

@Component({
  selector: 'section-heading',
  standalone: true,
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.scss',
})
export class SectionHeadingComponent implements AfterViewInit, OnDestroy {
  readonly kicker = input<string>('');
  readonly title = input<string>('');
  readonly titleAccent = input<string>('');
  readonly subtitle = input<string>('');
  readonly align = input<'left' | 'center'>('left');

  private el = inject(ElementRef<HTMLElement>);
  private trigger?: ScrollTrigger;

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    const item = root.querySelector('[data-reveal]');
    if (!item) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(item, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(item, { opacity: 0, y: 28 });
    this.trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(item, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
    });
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}