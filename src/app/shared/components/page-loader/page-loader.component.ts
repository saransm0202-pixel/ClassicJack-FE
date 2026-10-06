import { Component, ElementRef, OnInit, OnDestroy, output, inject, viewChild, computed } from '@angular/core';
import { gsap } from '../../../core/utils/gsap.util';
import { SiteConfigService } from '../../../services/site-config.service';
import { DEFAULT_PRELOADER_DURATION } from '../../../core/constants/site.constants';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.scss',
})
export class PageLoaderComponent implements OnInit, OnDestroy {
  readonly done = output<void>();

  private host = inject(ElementRef<HTMLElement>);
  private wordmarkEl = viewChild<ElementRef<HTMLDivElement>>('wordmark');
  private fillEl = viewChild<ElementRef<HTMLSpanElement>>('fill');
  private progressEl = viewChild<ElementRef<HTMLSpanElement>>('progress');
  private tween?: gsap.core.Timeline;

  readonly cfg = inject(SiteConfigService);

  readonly initial = computed(() => this.cfg.brandInitials().slice(0, 2));
  readonly name = computed(() => this.cfg.appName().toUpperCase());
  readonly tagline = computed(() => this.cfg.tagline().toUpperCase());

  private holder: { value: number } = { value: 0 };

  ngOnInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.exit(false);
      return;
    }
    this.play();
  }

  private play(): void {
    const wordmark = this.wordmarkEl()?.nativeElement;
    const fill = this.fillEl()?.nativeElement;
    const progress = this.progressEl()?.nativeElement;
    if (!wordmark || !fill || !progress) {
      this.exit(false);
      return;
    }

    this.tween = gsap.timeline({
      onComplete: () => this.exit(true),
    });
    const tl = this.tween;

    tl.to(wordmark, { opacity: 1, y: 14, duration: 0.8, ease: 'power3.out' }, 0.15)
      .to(wordmark, { y: 0, duration: 0.9, ease: 'power4.out' }, 0.45)
      .to(
        this.holder,
        {
          value: 100,
          duration: DEFAULT_PRELOADER_DURATION / 1000,
          ease: 'power2.inOut',
          onUpdate: () => {
            fill.style.width = `${this.holder.value}%`;
            progress.textContent = Math.round(this.holder.value).toString().padStart(3, '0') + '%';
          },
        },
        0.5
      );
  }

  private exit(animated: boolean): void {
    const hostEl = this.host.nativeElement;
    const wordmark = this.wordmarkEl()?.nativeElement;

    if (!animated || !wordmark) {
      this.done.emit();
      return;
    }

    this.tween = gsap
      .timeline({ onComplete: () => this.done.emit() })
      .to(wordmark, { opacity: 0, y: -24, duration: 0.5, ease: 'power2.in' }, 0.85)
      .to(hostEl, { yPercent: -100, duration: 0.95, ease: 'power4.inOut' }, 0.5);
  }

  ngOnDestroy(): void {
    this.tween?.kill();
  }
}