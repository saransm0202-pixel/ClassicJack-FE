import { Component, inject, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsCatalogService } from '../../core/services/projects-catalog.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { gsap, ScrollTrigger } from '../../core/utils/gsap.util';

@Component({
  selector: 'app-projects-preview',
  standalone: true,
  imports: [SectionHeadingComponent, ProjectCardComponent, RouterLink, IconComponent],
  templateUrl: './projects-preview.component.html',
  styleUrl: './projects-preview.component.scss',
})
export class ProjectsPreviewComponent implements OnInit, AfterViewInit, OnDestroy {
  protected readonly catalog = inject(ProjectsCatalogService);

  private el = inject(ElementRef<HTMLElement>);
  private trigger?: ScrollTrigger[];

  protected readonly featured = () => this.catalog.homeProjects();

  ngOnInit(): void {
    this.catalog.refresh();
  }

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    const items = root.querySelectorAll('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(items, { opacity: 0, y: 40 });
    this.trigger = ScrollTrigger.batch(items, {
      start: 'top 90%',
      once: true,
      onEnter: (batch: Element[]) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          onComplete: () => gsap.set(batch, { clearProps: 'transform' }),
        }),
    });
  }

  ngOnDestroy(): void {
    this.trigger?.forEach((t) => t.kill(true));
  }
}