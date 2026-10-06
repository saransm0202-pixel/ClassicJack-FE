import { Component, inject, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectViewerService } from '../../../core/services/project-viewer.service';
import { IconComponent } from '../icon/icon.component';
import { ImageSafeDirective } from '../../directives/image-safe.directive';
import { SiteConfigService } from '../../../services/site-config.service';

@Component({
  selector: 'app-project-viewer',
  standalone: true,
  imports: [RouterLink, IconComponent, ImageSafeDirective],
  templateUrl: './project-viewer.component.html',
  styleUrl: './project-viewer.component.scss',
})
export class ProjectViewerComponent {
  protected readonly viewer = inject(ProjectViewerService);
  protected readonly cfg = inject(SiteConfigService);

  close(): void {
    this.viewer.close();
  }

  onBackdrop(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('pcv')) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.viewer.open()) this.close();
  }

  areaLabel(): string {
    const p = this.viewer.project();
    const a = p?.area ?? 0;
    return a > 0 ? `${a.toLocaleString('en-IN')} sq.ft` : '';
  }
}