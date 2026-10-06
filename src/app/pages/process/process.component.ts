import { Component, inject, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ProcessStepComponent } from '../../shared/components/process-step/process-step.component';
import { FinalCtaComponent } from '../../sections/final-cta/final-cta.component';
import { EstimateComponent } from '../../sections/estimate/estimate.component';
import { SeoService } from '../../core/services/seo.service';
import { SiteDataService } from '../../core/services/site-data.service';
import { gsap } from '../../core/utils/gsap.util';
import { SITE_IMAGES } from '../../core/constants/site.images';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [PageHeroComponent, ProcessStepComponent, FinalCtaComponent, EstimateComponent],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
})
export class ProcessComponent implements OnInit, AfterViewInit, OnDestroy {
  protected readonly steps = inject(SiteDataService).processSteps;
  protected readonly SITE_IMAGES = SITE_IMAGES;

  private seo = inject(SeoService);
  private el = inject(ElementRef<HTMLElement>);
  private gsapCtx?: gsap.Context;

  ngOnInit(): void {
    this.seo.update({
      title: 'Our Construction Process | Classic Jack Construction',
      description:
        'A documented eight-step construction process — from site survey and legal due diligence to snagging and handover with zero confusion.',
      keywords: 'construction process, site survey, building stages, home handover',
      ogTitle: 'Our Construction Process | Classic Jack Construction',
      ogDescription: 'Eight stages. Full transparency at every step.',
      ogImage: SITE_IMAGES.process.main,
    });
  }

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    this.gsapCtx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.proc__steps app-process-step').forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
        if (i === 0) return;
        gsap.fromTo(
          step.querySelector('.ps__line'),
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top',
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.25,
            scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });
    }, root);
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }
}