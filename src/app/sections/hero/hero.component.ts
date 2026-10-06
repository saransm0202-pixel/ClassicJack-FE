import {
  Component,
  ElementRef,
  inject,
  AfterViewInit,
  OnDestroy,
  effect,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from '../../core/utils/gsap.util';
import { SITE_IMAGES } from '../../core/constants/site.images';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ImageSafeDirective } from '../../shared/directives/image-safe.directive';
import { BootService } from '../../core/services/boot.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, IconComponent, ImageSafeDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private boot = inject(BootService);
  private bgEl = viewChild<ElementRef<HTMLElement>>('bg');
  private imgEl = viewChild<ElementRef<HTMLElement>>('img');

  protected readonly SITE_IMAGES = SITE_IMAGES;
  protected readonly lineOne = "We don't just build".toUpperCase().split(' ');
  protected readonly lineTwo = 'houses.'.toUpperCase().split(' ');
  protected readonly lineAccent = 'We build legacies.'.toUpperCase().split(' ');

  private introCtx?: gsap.Context;
  private parallaxCtx?: gsap.Context;
  private played = false;

  constructor() {
    effect(() => {
      if (this.boot.ready() && !this.played) {
        this.played = true;
        requestAnimationFrame(() => this.playIntro());
      }
    });
  }

  ngAfterViewInit(): void {
    this.bindParallax();
  }

  private playIntro(): void {
    const root = this.el.nativeElement;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(root.querySelectorAll('[data-hero]'), { opacity: 1 });
      gsap.set(root.querySelectorAll('.hero__word'), { y: 0 });
      return;
    }

    this.introCtx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(root.querySelector('.hero__img'), { scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
        .to('.hero__word', { y: 0, duration: 1.15, stagger: 0.035 }, 0.55)
        .fromTo('.hero__kicker', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 1.05)
        .fromTo(
          '.hero__sub',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9 },
          1.3
        )
        .fromTo(
          '.hero__cta > *',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          1.5
        )
        .fromTo(
          '.hero__scroll, .hero__index',
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          1.9
        );
    }, root);
  }

  private bindParallax(): void {
    const root = this.el.nativeElement;
    const bg = this.bgEl()?.nativeElement;
    const img = this.imgEl()?.nativeElement;
    if (!bg || !img) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.parallaxCtx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 },
        }
      );
      gsap.to('.hero__content', {
        yPercent: -18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: '55% top', scrub: 0.6 },
      });
    }, root);
  }

  ngOnDestroy(): void {
    this.introCtx?.revert();
    this.parallaxCtx?.revert();
  }
}