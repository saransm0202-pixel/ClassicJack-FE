import { Directive, HostBinding, HostListener } from '@angular/core';

/**
 * Replaces a broken image source with a premium gradient backdrop
 * so empty slots never appear on the page.
 */
@Directive({
  selector: 'img[appImageSafe]',
  standalone: true,
})
export class ImageSafeDirective {
  @HostBinding('style.background') background = '';
  @HostBinding('style.opacity') opacity = '1';

  @HostListener('error')
  onError(): void {
    this.background =
      'linear-gradient(135deg, #1c1a16 0%, #2a241c 50%, #1c1a16 100%)';
  }
}