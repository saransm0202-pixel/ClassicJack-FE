import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteDataService } from '../../core/services/site-data.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ProcessStepComponent } from '../../shared/components/process-step/process-step.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { gsap } from '../../core/utils/gsap.util';

@Component({
  selector: 'app-process-preview',
  standalone: true,
  imports: [SectionHeadingComponent, ProcessStepComponent, RouterLink, IconComponent],
  templateUrl: './process-preview.component.html',
  styleUrl: './process-preview.component.scss',
})
export class ProcessPreviewComponent implements AfterViewInit, OnDestroy {
  protected readonly data = inject(SiteDataService);

  private el = inject(ElementRef<HTMLElement>);
  private mm?: gsap.MatchMedia;

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = this.el.nativeElement;
    const track = root.querySelector('.proc__track');
    if (!track) return;

    this.mm = gsap.matchMedia();
    this.mm.add('(min-width: 1024px)', () => {
      const viewport = root.querySelector('.proc__viewport') as HTMLElement | null;
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: viewport || root,
          start: 'top top',
          end: () => '+=' + (track.scrollWidth - window.innerWidth),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }
}