import {
  Component,
  inject,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  signal,
} from '@angular/core';
import { SiteDataService } from '../../core/services/site-data.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ImageSafeDirective } from '../../shared/directives/image-safe.directive';
import { ScrollTrigger } from '../../core/utils/gsap.util';

/**
 * Signature section: as the user scrolls, the plot progresses from
 * empty land to key handover. A sticky visual crossfades between
 * construction stages while a thin progress line fills beside them.
 */
@Component({
  selector: 'app-construction-timeline',
  standalone: true,
  imports: [SectionHeadingComponent, ImageSafeDirective],
  templateUrl: './construction-timeline.component.html',
  styleUrl: './construction-timeline.component.scss',
})
export class ConstructionTimelineComponent implements AfterViewInit, OnDestroy {
  protected readonly data = inject(SiteDataService);
  protected readonly Math = Math;

  protected readonly activeStage = signal(0);
  protected readonly progress = signal(0);

  private el = inject(ElementRef<HTMLElement>);
  private trigger?: ScrollTrigger;
  private loadListener?: () => void;

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.activeStage.set(this.data.timelineStages().length - 1);
      this.progress.set(1);
      return;
    }

    const total = this.data.timelineStages().length;
    const body = root.querySelector('.tl__body') as HTMLElement | null;
    const triggerEl = body ?? root;
    this.trigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top 25%',
      end: 'bottom 65%',
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        this.progress.set(p);
        this.activeStage.set(Math.min(total - 1, Math.floor(p * (total - 0.001))));
      },
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    this.loadListener = refresh;
  }

  ngOnDestroy(): void {
    if (this.loadListener) window.removeEventListener('load', this.loadListener);
    this.trigger?.kill();
  }
}