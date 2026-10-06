import { Component, input } from '@angular/core';
import { ProcessStep } from '../../../core/models/process-step.model';
import { ImageSafeDirective } from '../../directives/image-safe.directive';

@Component({
  selector: 'app-process-step',
  standalone: true,
  imports: [ImageSafeDirective],
  templateUrl: './process-step.component.html',
  styleUrl: './process-step.component.scss',
})
export class ProcessStepComponent {
  readonly step = input.required<ProcessStep>();
  readonly last = input(false);
  readonly variant = input<'vertical' | 'card'>('vertical');
}