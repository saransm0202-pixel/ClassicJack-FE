import { Component, input, output } from '@angular/core';
import { FaqItem } from '../../../core/models/faq-item.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-faq-item',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './faq-item.component.html',
  styleUrl: './faq-item.component.scss',
})
export class FaqItemComponent {
  readonly item = input.required<FaqItem>();
  readonly open = input(false);
  readonly toggle = output<number>();
}