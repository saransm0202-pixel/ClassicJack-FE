import {
  Component,
  input,
  computed,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  inject,
} from '@angular/core';
import { gsap, ScrollTrigger } from '../../../core/utils/gsap.util';

/**
 * Splits a multi-line string into masked words and reveals them
 * top-to-bottom with a staggered rise on scroll.
 */
@Component({
  selector: 'app-text-reveal',
  standalone: true,
  templateUrl: './text-reveal.component.html',
  styleUrl: './text-reveal.component.scss',
})
export class TextRevealComponent implements AfterViewInit, OnDestroy {
  readonly text = input.required<string>();
  readonly stagger = input(0.045);
  readonly delay = input(0);

  readonly words = computed(() => this.text().split(' '));

  private el = inject(ElementRef<HTMLElement>);
  private trigger?: ScrollTrigger;

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    const items = root.querySelectorAll('.tr__word') as NodeListOf<HTMLElement>;
    if (!items.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(items, { y: 0 });
      return;
    }

    gsap.set(items, { y: '115%' });
    this.trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          y: 0,
          duration: 1,
          stagger: this.stagger(),
          ease: 'power4.out',
          delay: this.delay(),
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}