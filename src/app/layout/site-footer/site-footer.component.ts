import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SiteConfigService } from '../../services/site-config.service';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss',
})
export class SiteFooterComponent {
  protected readonly cfg = inject(SiteConfigService);
  protected readonly year = new Date().getFullYear();

  protected readonly quick = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Packages', href: '/packages' },
    { label: 'Process', href: '/process' },
    { label: 'Contact', href: '/contact' },
  ];

  protected readonly services = [
    'Home Construction',
    'Architectural Design',
    'Structural Design',
    'Interior Solutions',
    'Renovation',
  ];
}