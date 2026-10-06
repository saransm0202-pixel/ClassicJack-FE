import {
  Component,
  inject,
  OnDestroy,
  signal,
  computed,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConstructionCalculatorService } from '../../core/services/construction-calculator.service';
import { SiteDataService } from '../../core/services/site-data.service';
import { CalculatorInput, CalculatorPackageId } from '../../core/models/calculator.model';
import { COST_DISCLAIMER } from '../../core/constants/site.constants';
import { gsap, ScrollTrigger } from '../../core/utils/gsap.util';

@Component({
  selector: 'app-cost-calculator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cost-calculator.component.html',
  styleUrl: './cost-calculator.component.scss',
})
export class CostCalculatorComponent implements AfterViewInit, OnDestroy {
  protected readonly disclaimer = COST_DISCLAIMER;
  protected readonly data = inject(SiteDataService);

  private calcService = inject(ConstructionCalculatorService);
  private fb = inject(FormBuilder);
  private el = inject(ElementRef<HTMLElement>);
  private trigger?: ScrollTrigger;
  private tween?: gsap.core.Tween;

  protected readonly result = signal<ReturnType<ConstructionCalculatorService['calculate']> | null>(null);
  protected readonly resultDisplay = signal('₹ —');

  readonly form = this.fb.group({
    plotArea: [1200, [Validators.min(300)]],
    builtUpArea: [1800, [Validators.min(300)]],
    floors: [1],
    packageId: ['premium' as CalculatorPackageId],
    location: ['Chennai'],
    constructionType: ['Independent House'],
  });

  private first = true;

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    const target = root.querySelector('.calc__intro');
    if (!target) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.trigger = ScrollTrigger.create({
      trigger: root as HTMLElement,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (target) {
          gsap.fromTo(target, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        }
      },
    });
    this.recalc();
  }

  protected recalc(): void {
    if (this.first) {
      this.first = false;
      this.updateResult();
      this.resultDisplay.set(this.fmt(this.result()?.estimatedCost));
      return;
    }
    const raw = this.form.value;
    if (!raw.builtUpArea || raw.packageId === null) return;
    this.updateResult();
    this.animate();
  }

  private updateResult(): void {
    const raw = this.form.value;
    const input: CalculatorInput = {
      plotArea: Number(raw.plotArea ?? 0),
      builtUpArea: Number(raw.builtUpArea ?? 0),
      floors: Number(raw.floors ?? 1),
      packageId: (raw.packageId as CalculatorPackageId) ?? 'premium',
      location: raw.location ?? '',
      constructionType: raw.constructionType ?? '',
    };
    this.result.set(this.calcService.calculate(input));
  }

  private animate(): void {
    const el = this.el.nativeElement.querySelector('.calc__result-value');
    if (!el) return;
    const from = this.result()?.estimatedCost ?? 0;
    this.tween?.kill();

    const state = { v: from };
    this.tween = gsap.fromTo(
      state,
      { v: 0 },
      {
        v: from,
        duration: 1.1,
        ease: 'power3.out',
        onUpdate: () => {
          this.resultDisplay.set('₹' + Math.round(state.v).toLocaleString('en-IN'));
        },
      }
    );
  }

  private fmt(v?: number): string {
    return v ? '₹' + Math.round(v).toLocaleString('en-IN') : '₹ —';
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
    this.tween?.kill();
  }
}