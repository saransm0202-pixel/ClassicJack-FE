import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { PageLoaderComponent } from './shared/components/page-loader/page-loader.component';
import { ScrollProgressComponent } from './shared/components/scroll-progress/scroll-progress.component';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { WhatsappButtonComponent } from './shared/components/whatsapp-button/whatsapp-button.component';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top.component';
import { ProjectViewerComponent } from './shared/components/project-viewer/project-viewer.component';
import { NotificationComponent } from './components/notification/notification';
import { BootService } from './core/services/boot.service';
import { SiteConfigService } from './services/site-config.service';
import { ProjectsCatalogService } from './core/services/projects-catalog.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PageLoaderComponent,
    ScrollProgressComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    WhatsappButtonComponent,
    BackToTopComponent,
    ProjectViewerComponent,
    NotificationComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private boot = inject(BootService);
  private router = inject(Router);
  private siteConfig = inject(SiteConfigService);
  private catalog = inject(ProjectsCatalogService);

  /** Admin console routes hide the marketing chrome (header/footer etc.). */
  protected isAdmin = false;

  constructor() {
    this.siteConfig.load();
    this.catalog.load();
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.isAdmin = e.urlAfterRedirects.startsWith('/admin');
      }
    });
  }

  onLoaderDone(): void {
    this.boot.markReady();
    document.documentElement.style.overflow = '';
  }
}