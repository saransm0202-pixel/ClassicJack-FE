import { Component, input } from '@angular/core';

@Component({
  selector: 'button[appGlassButton], a[appGlassButton]',
  standalone: true,
  host: {
    appMagnetic: '',
    class: 'glass-btn',
    '[class.glass-btn--small]': 'small()',
  },
  templateUrl: './glass-button.component.html',
  styleUrl: './glass-button.component.scss',
})
export class GlassButtonComponent {
  readonly small = input(false);
  readonly href = input<string>('');
}