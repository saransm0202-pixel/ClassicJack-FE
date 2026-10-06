import { Injectable, inject, signal } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { IProject, projectImageUrl } from '../../models/project.model';
import { ProjectCardItem } from '../models/project.model';

/** Maps a backend project record to the display card model used on the public site. */
function toCardItem(p: IProject): ProjectCardItem {
  return {
    id: p.projectId,
    name: p.projectName ?? 'Untitled Project',
    description: p.description ?? '',
    image: projectImageUrl(p.imageUrl),
    status: p.projectStatus || 'Planning',
    isLive: (p.projectStatus ?? '').toLowerCase() === 'ongoing',
    location: p.projectLocation ?? '',
    type: p.projectType ?? '',
    area: p.projectArea ?? 0,
  };
}

/**
 * Public-facing project catalog — loads projects managed in the admin
 * "Project Management" page for this account.
 */
@Injectable({ providedIn: 'root' })
export class ProjectsCatalogService {
  private readonly api = inject(ProjectService);

  /** All active projects for this account (projects page). */
  readonly projects = signal<ProjectCardItem[]>([]);

  /** Top projects for the home page showcase. */
  readonly homeProjects = signal<ProjectCardItem[]>([]);

  readonly loading = signal(false);
  readonly loaded = signal(false);

  load(): void {
    if (this.loaded() || this.loading()) return;
    this.loading.set(true);

    this.api.getProjects().subscribe({
      next: (items) => {
        this.projects.set(items.map(toCardItem));
        this.loaded.set(true);
        this.loading.set(false);
      },
      error: () => {
        this.loaded.set(false);
        this.loading.set(false);
      },
    });

    this.api.getHomeProjects().subscribe({
      next: (items) => this.homeProjects.set(items.map(toCardItem)),
      error: () => {
        /* fallback handled by caller when empty */
      },
    });
  }

  /** Force a fresh fetch — used after admin saves or when a public projects page mounts. */
  refresh(): void {
    if (this.loading()) return;
    this.loaded.set(false);
    this.load();
  }
}