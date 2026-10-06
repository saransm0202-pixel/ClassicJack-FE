import { Component, input, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { SiteConfigService } from '../../../services/site-config.service';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.scss',
})
export class WhatsappButtonComponent {
  protected readonly cfg = inject(SiteConfigService);
  readonly href = input<string>('');
  readonly tooltip = input('Chat with our team');
}