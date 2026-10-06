import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  signal,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import { SeoService } from '../../core/services/seo.service';
import { Project } from '../../core/models/project.model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { FinalCtaComponent } from '../../sections/final-cta/final-cta.component';
import { EstimateComponent } from '../../sections/estimate/estimate.component';
import { ImageSafeDirective } from '../../shared/directives/image-safe.directive';
import { gsap } from '../../core/utils/gsap.util';

interface ProjectChapter {
  id: string;
  title: string;
  body: (p: Project) => string;
}

const FLOOR_LABEL = (f: number): string => {
  if (f <= 1) return 'G + 1';
  return `G + ${f}`;
};

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [RouterLink, IconComponent, FinalCtaComponent, EstimateComponent, ImageSafeDirective],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private projects = inject(ProjectService);
  private seo = inject(SeoService);
  private el = inject(ElementRef<HTMLElement>);

  protected project = signal<Project | null>(null);
  protected lbIndex = signal(0);
  protected lightboxOpen = signal(false);

  protected readonly chapters: ProjectChapter[] = [
    { id: 'design', title: 'The Design', body: (p) => p.design },
    { id: 'construction', title: 'The Construction', body: (p) => p.construction },
    { id: 'result', title: 'The Result', body: (p) => p.result },
  ];

  private gsapCtx?: gsap.Context;
  private touchX = 0;

  protected facts(p: Project): { dt: string; dd: string }[] {
    return [
      { dt: 'Location', dd: p.location },
      { dt: 'Built-up Area', dd: `${p.builtUpArea.toLocaleString('en-IN')} sq.ft` },
      { dt: 'Floors', dd: FLOOR_LABEL(p.floors) },
      { dt: 'Project Type', dd: p.type },
      { dt: 'Status', dd: p.status },
      { dt: 'Year', dd: `${p.year}` },
    ];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.projects.getById(id).subscribe((p) => {
      this.project.set(p ?? null);
      if (p) {
        this.seo.update({
          title: `${p.name} | Classic Jack Construction`,
          description: p.description,
          keywords: `${p.type} construction, ${p.location}, home builder`,
          ogTitle: `${p.name} — Classic Jack Construction`,
          ogDescription: p.tagline,
          ogImage: p.image,
        });
      }
    });
  }

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    this.gsapCtx = gsap.context(() => {
      gsap.fromTo(
        '.pd__hero-copy',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(
        '.pd__hero img',
        { scale: 1.12 },
        { scale: 1, duration: 1.6, ease: 'power2.out', delay: 0.1 }
      );
    }, root);
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }

  openLightbox(i: number): void {
    const total = this.project()?.gallery.length ?? 0;
    if (total === 0) return;
    this.lbIndex.set((i + total) % total);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
    document.body.style.overflow = '';
  }

  prevImage(): void {
    const total = this.project()?.gallery.length ?? 1;
    this.lbIndex.set((this.lbIndex() - 1 + total) % total);
  }

  nextImage(): void {
    const total = this.project()?.gallery.length ?? 1;
    this.lbIndex.set((this.lbIndex() + 1) % total);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (!this.lightboxOpen()) return;
    if (e.key === 'Escape') {
      this.closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      this.prevImage();
    } else if (e.key === 'ArrowRight') {
      this.nextImage();
    }
  }

  onBackdrop(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('lb')) {
      this.closeLightbox();
    }
  }

  onTouchStart(e: TouchEvent): void {
    this.touchX = e.touches[0]?.clientX ?? 0;
  }

  onTouchEnd(e: TouchEvent): void {
    const dx = (e.changedTouches[0]?.clientX ?? 0) - this.touchX;
    if (Math.abs(dx) > 48) {
      if (dx < 0) {
        this.nextImage();
      } else {
        this.prevImage();
      }
    }
  }
}