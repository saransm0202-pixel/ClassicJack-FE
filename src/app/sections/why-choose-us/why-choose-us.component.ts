import {
  Component,
  inject,
  AfterViewInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { SiteDataService } from '../../core/services/site-data.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ParallaxImageComponent } from '../../shared/components/parallax-image/parallax-image.component';
import { SITE_IMAGES } from '../../core/constants/site.images';
import { gsap } from '../../core/utils/gsap.util';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [SectionHeadingComponent, IconComponent, ParallaxImageComponent],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.scss',
})
export class WhyChooseUsComponent implements AfterViewInit, OnDestroy {
  protected readonly data = inject(SiteDataService);
  protected readonly SITE_IMAGES = SITE_IMAGES;

  private el = inject(ElementRef<HTMLElement>);
  private mm?: gsap.MatchMedia;

  iconOf(name: string): string {
    return name;
  }

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = this.el.nativeElement;
    const viewport = root.querySelector('.why__viewport');
    const track = root.querySelector('.why__track');
    if (!viewport || !track) return;

    this.mm = gsap.matchMedia();
    this.mm.add('(min-width: 1024px)', () => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
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