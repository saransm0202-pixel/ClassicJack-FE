import { Component, inject, OnInit } from '@angular/core';
import { HeroComponent } from '../../sections/hero/hero.component';
import { EstimateComponent } from '../../sections/estimate/estimate.component';
import { PackagesPreviewComponent } from '../../sections/packages-preview/packages-preview.component';
import { WhyChooseUsComponent } from '../../sections/why-choose-us/why-choose-us.component';
import { AboutPreviewComponent } from '../../sections/about-preview/about-preview.component';
import { ProjectsPreviewComponent } from '../../sections/projects-preview/projects-preview.component';
import { ProcessPreviewComponent } from '../../sections/process-preview/process-preview.component';
import { ConstructionTimelineComponent } from '../../sections/construction-timeline/construction-timeline.component';
import { TestimonialsComponent } from '../../sections/testimonials/testimonials.component';
import { FaqComponent } from '../../sections/faq/faq.component';
import { FinalCtaComponent } from '../../sections/final-cta/final-cta.component';
import { SeoService } from '../../core/services/seo.service';
import { SITE_IMAGES } from '../../core/constants/site.images';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    EstimateComponent,
    PackagesPreviewComponent,
    WhyChooseUsComponent,
    AboutPreviewComponent,
    ProjectsPreviewComponent,
    ProcessPreviewComponent,
    ConstructionTimelineComponent,
    TestimonialsComponent,
    FaqComponent,
    FinalCtaComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Classic Jack Construction | Premium Home Construction',
      description:
        'Premium home construction in Chennai. Transparent pricing, milestone-based payments and end-to-end support from design to key handover.',
      keywords:
        'house construction Chennai, home builder Chennai, construction packages, independent house contractor, villa construction',
      ogTitle: 'Classic Jack Construction | Premium Home Construction',
      ogDescription: 'Building spaces. Creating legacies. Explore premium construction packages and our portfolio.',
      ogImage: SITE_IMAGES.hero.main,
    });
  }
}