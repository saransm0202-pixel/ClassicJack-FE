import { Component, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ParallaxImageComponent } from '../../shared/components/parallax-image/parallax-image.component';
import { SiteConfigService } from '../../services/site-config.service';
import { SITE_IMAGES } from '../../core/constants/site.images';
import { gsap, ScrollTrigger } from '../../core/utils/gsap.util';

@Component({
  selector: 'app-final-cta',
  standalone: true,
  imports: [RouterLink, IconComponent, ParallaxImageComponent],
  templateUrl: './final-cta.component.html',
  styleUrl: './final-cta.component.scss',
})
export class FinalCtaComponent implements AfterViewInit, OnDestroy {
  protected readonly cfg = inject(SiteConfigService);
  protected readonly SITE_IMAGES = SITE_IMAGES;

  private el = inject(ElementRef<HTMLElement>);
  private trigger?: ScrollTrigger[];

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    const items = root.querySelectorAll('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(items, { opacity: 0, y: 30 });
    this.trigger = ScrollTrigger.batch(items, {
      start: 'top 85%',
      once: true,
      onEnter: (batch: Element[]) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, stagger: 0.16, ease: 'power3.out' }),
    });
  }

  ngOnDestroy(): void {
    this.trigger?.forEach((t) => t.kill(true));
  }
}