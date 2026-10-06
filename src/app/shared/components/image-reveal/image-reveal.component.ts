import {
  Component,
  input,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  inject,
} from '@angular/core';
import { gsap, ScrollTrigger } from '../../../core/utils/gsap.util';
import { ImageSafeDirective } from '../../directives/image-safe.directive';

/**
 * Cinematic image reveal: the container unmasks through a clip-path
 * while the image scales down from an overshoot — one trigger, no clutter.
 */
@Component({
  selector: 'app-image-reveal',
  standalone: true,
  imports: [ImageSafeDirective],
  templateUrl: './image-reveal.component.html',
  styleUrl: './image-reveal.component.scss',
})
export class ImageRevealComponent implements AfterViewInit, OnDestroy {
  readonly src = input.required<string>();
  readonly alt = input<string>('');
  readonly priority = input(false);

  private el = inject(ElementRef<HTMLElement>);
  private trigger?: ScrollTrigger;

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    const img = root.querySelector('img');
    const clip = root.querySelector('.ir');
    if (!img || !clip) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      (clip as HTMLElement).style.clipPath = 'inset(0% 0% 0% 0%)';
      (img as HTMLElement).style.transform = 'scale(1)';
      return;
    }

    this.trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap
          .timeline()
          .to(
            clip,
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut' },
            0
          )
          .to(img, { scale: 1, duration: 1.6, ease: 'power3.out' }, 0);
      },
    });
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}