import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { MagneticDirective } from './magnetic.directive';

@Component({
  selector: 'app-magnetic-button',
  standalone: true,
  imports: [RouterLink, IconComponent, MagneticDirective],
  templateUrl: './magnetic-button.component.html',
  styleUrl: './magnetic-button.component.scss',
})
export class MagneticButtonComponent {
  readonly variant = input<'solid' | 'ghost' | 'light'>('solid');
  readonly icon = input<string>('arrow');
  readonly location = input<string | any[]>('/');
  readonly href = input<string>('');
  readonly external = input<boolean>(false);
}