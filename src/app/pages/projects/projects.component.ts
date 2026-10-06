import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { FinalCtaComponent } from '../../sections/final-cta/final-cta.component';
import { SeoService } from '../../core/services/seo.service';
import { ProjectsCatalogService } from '../../core/services/projects-catalog.service';
import { SITE_IMAGES } from '../../core/constants/site.images';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [PageHeroComponent, ProjectCardComponent, FinalCtaComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  protected readonly catalog = inject(ProjectsCatalogService);
  protected readonly SITE_IMAGES = SITE_IMAGES;

  private readonly seo = inject(SeoService);

  protected readonly typeFilter = signal<string>('All');
  protected readonly statusFilter = signal<string>('All');

  protected readonly types = computed(() => {
    const all = this.catalog.projects().map((p) => p.type).filter(Boolean);
    return ['All', ...new Set(all)];
  });

  protected readonly statuses = computed(() => {
    const all = this.catalog.projects().map((p) => p.status).filter(Boolean);
    return ['All', ...new Set(all)];
  });

  protected readonly filtered = computed(() => {
    const type = this.typeFilter();
    const status = this.statusFilter();
    return this.catalog.projects()
      .filter((p) => (type === 'All' ? true : p.type === type))
      .filter((p) => (status === 'All' ? true : p.status === status));
  });

  setType(t: string): void {
    this.typeFilter.set(t);
  }

  setStatus(s: string): void {
    this.statusFilter.set(s);
  }

  ngOnInit(): void {
    this.catalog.refresh();
    this.seo.update({
      title: 'Our Projects | Classic Jack Construction',
      description:
        'Explore premium residential and villa projects delivered by Classic Jack Construction across Chennai, Chengalpattu and beyond.',
      keywords: 'construction portfolio, completed houses Chennai, villa projects, home builder portfolio',
      ogTitle: 'Our Projects | Classic Jack Construction',
      ogDescription: 'Spaces we have built — residences engineered for a lifetime.',
      ogImage: SITE_IMAGES.hero.main,
    });
  }
}