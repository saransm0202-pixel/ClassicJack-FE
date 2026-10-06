import { Component, input, computed } from '@angular/core';

type Stroke = { d: string; stroke?: number };

const PATHS: Record<string, Stroke[]> = {
  arrow: [{ d: 'M5 12h14M13 6l6 6-6 6' }],
  'arrow-up': [{ d: 'M12 19V5M6 11l6-6 6 6' }],
  'arrow-right': [{ d: 'M5 12h14M13 6l6 6-6 6' }],
  'arrow-down': [{ d: 'M12 5v14M6 13l6 6 6-6' }],
  plus: [{ d: 'M12 5v14M5 12h14' }],
  whatsapp: [
    { d: 'M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-4.1-1L3 20l1.2-4.8a8.4 8.4 0 0 1-1.2-4.7A8.5 8.5 0 0 1 21 11.5Z' },
    { d: 'M9 9.8c.4 2 2.1 3.7 4.2 4.2l1.1-1.2c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.4.3.7-.4 1-1.3 1.5-2.3 1.3C12.6 15 9 12.2 8 9.2a1.8 1.8 0 0 1 1.3-2.1c.3-.1.6 0 .8.2l1 1.6c.1.2 0 .4-.2.6Z', stroke: 0 },
  ],
  phone: [{ d: 'M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z' }],
  mail: [{ d: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z' }, { d: 'm3 7 9 6 9-6' }],
  pin: [{ d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }, { d: 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' }],
  clock: [{ d: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z' }, { d: 'M12 6v6l4 2' }],
  calendar: [{ d: 'M8 2v4M16 2v4M3 10h18M5 4h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z' }],
  frame: [{ d: 'M5 5h14v14H5z' }],
  pencil: [{ d: 'M17 3l4 4L7.5 20.5 2 22l1.5-5.5L17 3Z' }],
  building: [{ d: 'M6 22V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v18' }, { d: 'M3 22h18' }, { d: 'M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2' }],
  home: [{ d: 'M3 10.5 12 4l9 6.5' }, { d: 'M5 9.5V21h14V9.5' }, { d: 'M9 21v-6h6v6' }],
  grid: [{ d: 'M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z' }],
  shield: [{ d: 'M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z' }],
  users: [{ d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }, { d: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z' }, { d: 'M22 21v-2a4 4 0 0 0-3-3.9' }, { d: 'M16 3.1a4 4 0 0 1 0 7.8' }],
  'award': [{ d: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z' }, { d: 'm8.2 13.9-1.4 7.1 5.2-3 5.2 3-1.4-7.1' }],
  'armchair': [{ d: 'M5 11V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4' }, { d: 'M3 15a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-1l-1-4H6l-1 4H4a1 1 0 0 1-1-1v-3Z' }, { d: 'M6 19v2M18 19v2' }],
  hammer: [{ d: 'm15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9' }, { d: 'M17.6 9.6 20 7.2a2 2 0 0 0 0-2.8L18 2.4a2 2 0 0 0-2.8 0L12.8 5l4.8 4.6Z' }],
  check: [{ d: 'm4 12.5 5 5L20 6.5' }],
  info: [{ d: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z' }, { d: 'M12 16v-5' }, { d: 'M12 8h.01' }],
  close: [{ d: 'M6 6l12 12M18 6 6 18' }],
  menu: [{ d: 'M4 7h16M4 12h16M4 17h16' }],
  chevron: [{ d: 'm6 9 6 6 6-6' }],
  chrome: [{ d: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z' }, { d: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' }],
  compass: [{ d: 'm12 2 6.5 12.5L12 22l-6.5-7.5L12 2Z' }, { d: 'M12 8.2 15 12l-3 3.8L9 12l3-3.8Z' }],
  quote: [{ d: 'M7 11a3 3 0 0 1 3 3H7v-3Z' }, { d: 'M7 11c0-2 1.2-4 3-5', stroke: 0 }, { d: 'M14 11a3 3 0 0 1 3 3h-3v-3Z' }, { d: 'M14 11c0-2 1.2-4 3-5', stroke: 0 }],
  instagram: [{ d: 'M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z' }, { d: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z' }, { d: 'M17.5 6.5h.01' }],
  facebook: [{ d: 'M15 4h2a1 1 0 0 1 1 1v3h-3v3h3l-.5 4H15v5h-3V15h-2v-3h2V6a2 2 0 0 1 2-2Z' }],
  youtube: [{ d: 'M2 12s0-5 2.5-5.5C7 6.3 15 6.3 19.5 6.5 22 7 22 12 22 12s0 5-2.5 5.5C15 18 7 18 2.5 17.5 2 17 2 12 2 12Z' }, { d: 'm10 15 5-3-5-3v6Z' }],
};

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  readonly name = input<string>('arrow');
  readonly size = input<number>(1.25);

  readonly paths = computed(() => PATHS[this.name()] ?? PATHS['chrome']);
}