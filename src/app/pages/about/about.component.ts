import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CounterComponent } from '../../shared/components/counter/counter.component';
import { BlueprintRevealComponent } from '../../shared/components/blueprint-reveal/blueprint-reveal.component';
import { WhyChooseUsComponent } from '../../sections/why-choose-us/why-choose-us.component';
import { FinalCtaComponent } from '../../sections/final-cta/final-cta.component';
import { SeoService } from '../../core/services/seo.service';
import { SiteDataService } from '../../core/services/site-data.service';
import { ImageSafeDirective } from '../../shared/directives/image-safe.directive';
import { SITE_IMAGES } from '../../core/constants/site.images';
import { SiteConfigService } from '../../services/site-config.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    PageHeroComponent,
    SectionHeadingComponent,
    IconComponent,
    CounterComponent,
    BlueprintRevealComponent,
    WhyChooseUsComponent,
    FinalCtaComponent,
    RouterLink,
    ImageSafeDirective,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  protected readonly data = inject(SiteDataService);
  protected readonly cfg = inject(SiteConfigService);
  protected readonly SITE_IMAGES = SITE_IMAGES;

  private seo = inject(SeoService);

  protected readonly values = [
    { n: '01', title: 'Transparency', desc: 'Open rates, documented bills and zero surprise charges — ever.' },
    { n: '02', title: 'Craftsmanship', desc: 'Finishing details that hold up years after the site has been swept.' },
    { n: '03', title: 'Accountability', desc: 'A named project manager and weekly progress reports on every build.' },
    { n: '04', title: 'Durability', desc: 'Materials and methods chosen for decades, not for a single season.' },
    { n: '05', title: 'Respect', desc: 'We build for the family that will live inside the walls — not just for the render.' },
    { n: '06', title: 'Safety', desc: 'Disciplined sites with tested concrete, guarded scaffolding and clean workspaces.' },
  ];

  protected readonly numbers = [
    { value: 10, suffix: '+', label: 'Years' },
    { value: 150, suffix: '+', label: 'Homes Delivered' },
    { value: 48, suffix: '', label: 'Active Sites' },
    { value: 100, suffix: '%', label: 'Premium Focus' },
  ];

  ngOnInit(): void {
    this.seo.update({
      title: 'About Classic Jack Construction',
      description:
        'The story, values and team behind Classic Jack Construction — premium end-to-end home construction across Chennai.',
      keywords: 'Classic Jack Construction about, home builder story, construction company Chennai',
      ogTitle: 'About Classic Jack Construction',
      ogDescription: 'Built on transparency and craftsmanship since 2015.',
      ogImage: SITE_IMAGES.about.main,
    });
  }
}