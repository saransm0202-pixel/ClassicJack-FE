import { Component, input, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { gsap } from '../../../core/utils/gsap.util';
import { ImageSafeDirective } from '../../directives/image-safe.directive';

/**
 * Parallax image — translates the image vertically inside an overflow
 * mask as the viewport scrolls past it.
 */
@Component({
  selector: 'app-parallax-image',
  standalone: true,
  imports: [ImageSafeDirective],
  templateUrl: './parallax-image.component.html',
  styleUrl: './parallax-image.component.scss',
})
export class ParallaxImageComponent implements AfterViewInit, OnDestroy {
  readonly src = input.required<string>();
  readonly alt = input<string>('');
  readonly speed = input(0.18);
  readonly priority = input(false);

  private el = inject(ElementRef<HTMLElement>);
  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    const img = this.el.nativeElement.querySelector('img');
    if (!img) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -this.speed() * 50 },
        {
          yPercent: this.speed() * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: this.el.nativeElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}