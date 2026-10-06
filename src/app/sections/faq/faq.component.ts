import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteDataService } from '../../core/services/site-data.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { FaqItemComponent } from '../../shared/components/faq-item/faq-item.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [SectionHeadingComponent, FaqItemComponent, RouterLink],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  protected readonly data = inject(SiteDataService);
  protected readonly openId = signal<number | null>(1);

  toggle(id: number): void {
    this.openId.update((cur) => (cur === id ? null : id));
  }
}