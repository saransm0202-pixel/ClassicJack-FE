import { Injectable, signal } from '@angular/core';
import { ProjectCardItem } from '../models/project.model';

/** Global fullscreen project viewer, rendered once at the app root. */
@Injectable({ providedIn: 'root' })
export class ProjectViewerService {
  readonly open = signal(false);
  readonly project = signal<ProjectCardItem | null>(null);

  openProject(project: ProjectCardItem): void {
    this.project.set(project);
    this.open.set(true);
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.open.set(false);
    document.body.style.overflow = '';
  }
}