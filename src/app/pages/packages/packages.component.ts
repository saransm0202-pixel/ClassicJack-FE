import { Component, inject, OnInit, signal } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { PackageCardComponent } from '../../shared/components/package-card/package-card.component';
import { FinalCtaComponent } from '../../sections/final-cta/final-cta.component';
import { SeoService } from '../../core/services/seo.service';
import { SiteDataService } from '../../core/services/site-data.service';
import { ConstructionPackage } from '../../core/models/construction-package.model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SiteConfigService } from '../../services/site-config.service';
import { COST_DISCLAIMER } from '../../core/constants/site.constants';
import { SITE_IMAGES } from '../../core/constants/site.images';

type Column = 0 | 1 | 2 | 3;
const COLS: Column[] = [0, 1, 2, 3];

const ROWS: { key: keyof ConstructionPackage; label: string }[] = [
  { key: 'materials', label: 'Materials' },
  { key: 'structural', label: 'Structural' },
  { key: 'electrical', label: 'Electrical' },
  { key: 'plumbing', label: 'Plumbing' },
  { key: 'flooring', label: 'Flooring' },
  { key: 'painting', label: 'Painting' },
  { key: 'doorsWindows', label: 'Doors & Windows' },
  { key: 'warranty', label: 'Warranty' },
  { key: 'deliveredIn', label: 'Timeline' },
];

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [PageHeroComponent, PackageCardComponent, FinalCtaComponent, IconComponent],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss',
})
export class PackagesComponent implements OnInit {
  protected readonly data = inject(SiteDataService);
  protected readonly cfg = inject(SiteConfigService);
  protected readonly pkgs = this.data.packages;
  protected readonly cols = COLS;
  protected readonly rows = ROWS;
  protected readonly COST_DISCLAIMER = COST_DISCLAIMER;
  protected readonly SITE_IMAGES = SITE_IMAGES;

  private seo = inject(SeoService);

  protected readonly active = signal<number>(1);

  val(p: ConstructionPackage, c: Column, key: string): unknown {
    return (p as unknown as Record<string, unknown>)[key];
  }

  cell(p: ConstructionPackage, key: string): string {
    const v = (p as unknown as Record<string, unknown>)[key];
    return typeof v === 'string' ? v : '';
  }

  ngOnInit(): void {
    this.seo.update({
      title: 'Construction Packages & Pricing | Classic Jack Construction',
      description:
        'Transparent construction packages from ₹1,999 to ₹2,899 per sq.ft covering materials, structure, MEP, interiors and warranty.',
      keywords: 'construction package, cost per sqft Tamil Nadu, full turnkey package',
      ogTitle: 'Construction Packages | Classic Jack Construction',
      ogDescription: 'Honest pricing. Premium quality. Every rupee accounted for.',
      ogImage: SITE_IMAGES.hero.main,
    });
  }
}