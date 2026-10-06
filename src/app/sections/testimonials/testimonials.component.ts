import {
  Component,
  inject,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  signal,
  HostListener,
} from '@angular/core';
import { SiteDataService } from '../../core/services/site-data.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { gsap, ScrollTrigger } from '../../core/utils/gsap.util';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [SectionHeadingComponent, IconComponent],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements AfterViewInit, OnDestroy {
  protected readonly data = inject(SiteDataService);
  protected readonly index = signal(0);
  protected readonly starValues = [1, 2, 3, 4, 5];

  private el = inject(ElementRef<HTMLElement>);
  private timer?: ReturnType<typeof setInterval>;
  private paused = false;
  private trigger?: ScrollTrigger;

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.trigger = ScrollTrigger.create({
      trigger: this.el.nativeElement,
      start: 'top 85%',
      once: true,
      onEnter: () => this.startAuto(),
    });
  }

  private startAuto(): void {
    this.timer = setInterval(() => {
      if (!this.paused) this.next();
    }, 5200);
  }

  next(): void {
    const n = this.data.testimonials().length;
    this.index.update((i) => (i + 1) % n);
  }

  prev(): void {
    const n = this.data.testimonials().length;
    this.index.update((i) => (i - 1 + n) % n);
  }

  goTo(i: number): void {
    this.index.set(i);
  }

  @HostListener('pointerenter') onEnter(): void {
    this.paused = true;
  }

  @HostListener('pointerleave') onLeave(): void {
    this.paused = false;
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    this.trigger?.kill();
  }
}