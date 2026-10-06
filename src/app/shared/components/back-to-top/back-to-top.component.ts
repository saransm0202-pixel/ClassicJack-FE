import { Component, HostListener, HostBinding } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss',
})
export class BackToTopComponent {
  @HostBinding('class.visible') isVisible = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isVisible = (window.scrollY ?? 0) > 700;
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}