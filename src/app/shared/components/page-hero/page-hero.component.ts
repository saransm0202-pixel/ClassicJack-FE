import { Component, input, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap, ScrollTrigger } from '../../../core/utils/gsap.util';
import { ImageSafeDirective } from '../../directives/image-safe.directive';

@Component({
  selector: 'page-hero',
  standalone: true,
  imports: [RouterLink, ImageSafeDirective],
  templateUrl: './page-hero.component.html',
  styleUrl: './page-hero.component.scss',
})
export class PageHeroComponent implements AfterViewInit, OnDestroy {
  readonly kicker = input('');
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly current = input('');
  readonly image = input('');
  readonly alt = input('');

  private el = inject(ElementRef<HTMLElement>);
  private trigger?: ScrollTrigger[];

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    const items = root.querySelectorAll('[data-ph]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(items, { opacity: 0, y: 30 });
    this.trigger = ScrollTrigger.batch(items, {
      start: 'top 72%',
      once: true,
      onEnter: (batch: Element[]) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }),
    });
  }

  ngOnDestroy(): void {
    this.trigger?.forEach((t) => t.kill(true));
  }
}