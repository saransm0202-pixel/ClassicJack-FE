import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Project } from '../models/project.model';
import { SiteDataService } from './site-data.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private data: SiteDataService) {}

  getAll(): Observable<Project[]> {
    return of(this.data.projects());
  }

  getById(id: string): Observable<Project | undefined> {
    return of(this.data.projects()).pipe(map((items) => items.find((p) => p.id === id)));
  }
}