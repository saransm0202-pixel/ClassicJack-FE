import { Component, input, ElementRef, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConstructionPackage } from '../../../core/models/construction-package.model';
import { IconComponent } from '../icon/icon.component';
import { ImageSafeDirective } from '../../directives/image-safe.directive';
import { SiteConfigService } from '../../../services/site-config.service';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [RouterLink, IconComponent, ImageSafeDirective],
  templateUrl: './package-card.component.html',
  styleUrl: './package-card.component.scss',
})
export class PackageCardComponent implements OnInit, OnDestroy {
  readonly pkg = input.required<ConstructionPackage>();
  readonly compact = input(false);
  readonly active = input(false);
  protected readonly cfg = inject(SiteConfigService);

  private el = inject(ElementRef<HTMLElement>);
  private raf = 0;
  private enabled = false;

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    this.enabled =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  onMove(e: PointerEvent): void {
    if (!this.enabled) return;
    const card = this.el.nativeElement.querySelector('.pkg');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => {
      card.style.transform = `rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateZ(0)`;
    });
  }

  onLeave(): void {
    if (!this.enabled) return;
    const card = this.el.nativeElement.querySelector('.pkg');
    if (!card) return;
    cancelAnimationFrame(this.raf);
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
  }
}