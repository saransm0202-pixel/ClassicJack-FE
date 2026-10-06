import { Component, inject, signal, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EnquiryService } from '../../core/services/enquiry.service';
import { EstimateFormModel } from '../../core/models/estimate-form.model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MagneticDirective } from '../../shared/components/magnetic-button/magnetic.directive';
import { ParallaxImageComponent } from '../../shared/components/parallax-image/parallax-image.component';
import { SITE_IMAGES } from '../../core/constants/site.images';
import { SiteDataService } from '../../core/services/site-data.service';
import { gsap, ScrollTrigger } from '../../core/utils/gsap.util';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-estimate',
  standalone: true,
  imports: [ReactiveFormsModule, IconComponent, MagneticDirective, ParallaxImageComponent],
  templateUrl: './estimate.component.html',
  styleUrl: './estimate.component.scss',
})
export class EstimateComponent implements AfterViewInit, OnDestroy {
  protected readonly SITE_IMAGES = SITE_IMAGES;
  protected readonly packages = inject(SiteDataService).packages().map((pkg) => pkg.name);
  protected readonly state = signal<SubmitState>('idle');

  private el = inject(ElementRef<HTMLElement>);
  private trigger?: ScrollTrigger[];

  private fb = inject(FormBuilder);
  private enquiry = inject(EnquiryService);
  private destroy$ = new Subject<void>();

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{10,15}$/)]],
    email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
    plotLocation: ['', Validators.required],
    plotArea: [''],
    package: [''],
    message: [''],
  });

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.state.set('loading');
    this.enquiry
      .submitEnquiry(this.form.value as EstimateFormModel)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.state.set(res.success ? 'success' : 'error');
        },
        error: () => {
          this.state.set('error');
        },
      });
  }

  hasError(control: string): boolean {
    const c = this.form.get(control);
    return !!(c?.touched && c.errors);
  }

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    const items = root.querySelectorAll('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(items, { opacity: 0, y: 32 });
    this.trigger = ScrollTrigger.batch(items, {
      start: 'top 88%',
      once: true,
      onEnter: (batch: Element[]) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: 'power3.out' }),
    });
  }

  reset(): void {
    this.form.reset();
    this.state.set('idle');
  }

  ngOnDestroy(): void {
    this.trigger?.forEach((t) => t.kill(true));
    this.destroy$.next();
    this.destroy$.complete();
  }
}