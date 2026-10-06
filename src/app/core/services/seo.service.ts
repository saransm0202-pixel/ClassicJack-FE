import { Injectable, signal } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  update(data: SeoData): void {
    this.title.setTitle(data.title);

    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'keywords', content: data.keywords });

    this.meta.updateTag({ property: 'og:title', content: data.ogTitle });
    this.meta.updateTag({ property: 'og:description', content: data.ogDescription });
    this.meta.updateTag({ property: 'og:image', content: data.ogImage });
  }
}
