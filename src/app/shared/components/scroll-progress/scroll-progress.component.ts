import { Component, AfterViewInit, HostListener, viewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  templateUrl: './scroll-progress.component.html',
  styleUrl: './scroll-progress.component.scss',
})
export class ScrollProgressComponent implements AfterViewInit {
  private bar = viewChild<ElementRef<HTMLDivElement>>('bar');

  ngAfterViewInit(): void {
    this.update();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.update();
  }

  private update(): void {
    const el = this.bar()?.nativeElement;
    if (!el || typeof window === 'undefined') return;
    const doc = document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    el.style.width = `${pct}%`;
  }
}