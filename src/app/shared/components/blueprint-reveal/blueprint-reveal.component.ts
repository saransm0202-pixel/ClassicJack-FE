import {
  Component,
  input,
  ElementRef,
  inject,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { gsap, ScrollTrigger } from '../../../core/utils/gsap.util';
import { ImageSafeDirective } from '../../directives/image-safe.directive';

/**
 * Signature "Architectural Blueprint Reveal".
 * Thin blueprint lines animate into place → a house silhouette draws itself
 * → the real photograph unmasks over the drawing. Subtle by design.
 */
@Component({
  selector: 'app-blueprint-reveal',
  standalone: true,
  imports: [ImageSafeDirective],
  templateUrl: './blueprint-reveal.component.html',
  styleUrl: './blueprint-reveal.component.scss',
})
export class BlueprintRevealComponent implements AfterViewInit, OnDestroy {
  readonly image = input.required<string>();
  readonly alt = input<string>('');
  readonly label = input<string>('');

  private el = inject(ElementRef<HTMLElement>);
  private trigger?: ScrollTrigger;
  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const photo = root.querySelector('.bp__photo') as HTMLElement | null;
      if (photo) photo.style.clipPath = 'inset(0 0 0 0)';
      return;
    }

    this.ctx = gsap.context(() => {
      const grid = root.querySelector('.bp__grid');
      const dims = root.querySelector('.bp__dims');
      const lines = root.querySelectorAll('.bp__house__frame path, .bp__house__frame line') as NodeListOf<SVGElement>;
      const walls = root.querySelectorAll(
        '.bp__house__wall, .bp__house__base, .bp__house__cols, .bp__house__roof'
      ) as NodeListOf<SVGElement>;
      const photo = root.querySelector('.bp__photo');
      const label = root.querySelector('.bp__label');

      gsap.set(lines, { strokeDashoffset: 320 });
      gsap.set(walls, { strokeDashoffset: 320 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          once: true,
        },
      });

      tl.to([grid, dims], { opacity: 1, duration: 0.7, ease: 'power2.out' }, 0)
        .to(
          lines,
          {
            strokeDashoffset: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: 'power2.inOut',
          },
          0.15
        )
        .to(
          walls,
          {
            strokeDashoffset: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'power2.inOut',
          },
          0.7
        )
        .to(photo, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut' }, 1.25)
        .fromTo(
          label,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          1.9
        );
    }, root);
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
    this.ctx?.revert();
  }
}