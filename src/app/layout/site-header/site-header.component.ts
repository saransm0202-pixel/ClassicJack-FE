import {
  Component,
  HostListener,
  HostBinding,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { gsap } from '../../core/utils/gsap.util';
import { MediaQueryService } from '../../core/services/media-query.service';
import { AuthService } from '../../services/auth.service';
import { SiteConfigService } from '../../services/site-config.service';
import { LoginComponent } from '../../components/login/login';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LoginComponent, UpperCasePipe],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
})
export class SiteHeaderComponent {
  protected readonly cfg = inject(SiteConfigService);
  protected readonly links: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Packages', href: '/packages' },
    { label: 'Our Process', href: '/process' },
    { label: 'Contact', href: '/contact' },
  ];

  protected readonly auth = inject(AuthService);

  protected menuOpen = false;
  protected showLogin = false;
  protected userMenuOpen = false;

  private el = inject(ElementRef<HTMLElement>);
  private media = inject(MediaQueryService);
  private router = inject(Router);
  private menuPanels = viewChild<ElementRef<HTMLElement>>('menu');

  @HostBinding('class.header-scrolled') get scrolledClass(): boolean {
    return this.scrolled;
  }

  protected scrolled = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = (window.scrollY ?? 0) > 40;
    if (this.scrolled) this.userMenuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.menuOpen) this.closeMenu();
    this.userMenuOpen = false;
  }

  @HostListener('document:click')
  onDocClick(): void {
    this.userMenuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen ? this.closeMenu() : this.openMenu();
  }

  private openMenu(): void {
    this.menuOpen = true;
    document.body.style.overflow = 'hidden';
    const panel = this.menuPanels()?.nativeElement;
    if (panel && !this.media.prefersReducedMotion()) {
      gsap.fromTo(
        panel.querySelectorAll('.menu__link'),
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out', delay: 0.25 }
      );
    }
  }

  closeMenu(): void {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  openLogin(): void {
    this.closeMenu();
    this.showLogin = true;
  }

  closeLogin(): void {
    this.showLogin = false;
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout(): void {
    this.userMenuOpen = false;
    this.auth.logout();
  }

  isActive(href: string): boolean {
    if (href === '/') return false;
    return typeof window !== 'undefined' && window.location.pathname.startsWith(href);
  }

  onNavClick(event: Event, href: string): void {
    const url = this.router.url.split('?')[0].split('#')[0];
    const isSameRoute = href === '/' ? url === '/' : url.startsWith(href);
    if (isSameRoute) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}