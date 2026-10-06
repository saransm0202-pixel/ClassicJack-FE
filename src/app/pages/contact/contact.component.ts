import { Component, inject, OnInit } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { FinalCtaComponent } from '../../sections/final-cta/final-cta.component';
import { EstimateComponent } from '../../sections/estimate/estimate.component';
import { SeoService } from '../../core/services/seo.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SiteConfigService } from '../../services/site-config.service';
import { SITE } from '../../core/constants/site.constants';
import { SITE_IMAGES } from '../../core/constants/site.images';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [PageHeroComponent, FinalCtaComponent, EstimateComponent, IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  protected readonly cfg = inject(SiteConfigService);
  protected readonly SITE_IMAGES = SITE_IMAGES;

  /** Opening hours are not part of app config — kept as a static brand default. */
  protected readonly hours = SITE.hours;

  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Contact Us | Classic Jack Construction',
      description:
        'Get in touch with Classic Jack Construction in Chennai for transparent construction consultations, project planning and site visits.',
      keywords: 'construction company Chennai, contact builder, site visit, construction consultation',
      ogTitle: 'Contact Us | Classic Jack Construction',
      ogDescription: 'Let us discuss your project — transparently.',
      ogImage: SITE_IMAGES.contact.main,
    });
  }
}