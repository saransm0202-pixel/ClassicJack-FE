import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_IMAGES } from '../../core/constants/site.images';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { BlueprintRevealComponent } from '../../shared/components/blueprint-reveal/blueprint-reveal.component';
import { CounterComponent } from '../../shared/components/counter/counter.component';
import { ImageSafeDirective } from '../../shared/directives/image-safe.directive';
import { gsap, ScrollTrigger } from '../../core/utils/gsap.util';

@Component({
  selector: 'app-about-preview',
  standalone: true,
  imports: [RouterLink, IconComponent, BlueprintRevealComponent, CounterComponent, ImageSafeDirective],
  templateUrl: './about-preview.component.html',
  styleUrl: './about-preview.component.scss',
})
export class AboutPreviewComponent implements AfterViewInit, OnDestroy {
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
    gsap.set(items, { opacity: 0, y: 32 });
    this.trigger = ScrollTrigger.batch(items, {
      start: 'top 88%',
      once: true,
      onEnter: (batch: Element[]) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: 'power3.out' }),
    });
  }

  ngOnDestroy(): void {
    this.trigger?.forEach((t) => t.kill(true));
  }
}