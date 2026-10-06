import { Component, input, inject } from '@angular/core';
import { ProjectCardItem } from '../../../core/models/project.model';
import { IconComponent } from '../icon/icon.component';
import { ImageSafeDirective } from '../../directives/image-safe.directive';
import { ProjectViewerService } from '../../../core/services/project-viewer.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [IconComponent, ImageSafeDirective],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  readonly project = input.required<ProjectCardItem>();
  private readonly viewer = inject(ProjectViewerService);

  openViewer(): void {
    this.viewer.openProject(this.project());
  }

  areaLabel(): string {
    const a = this.project().area;
    return a > 0 ? `${a.toLocaleString('en-IN')} sq.ft` : '';
  }
}