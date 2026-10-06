import { Injectable } from '@angular/core';
import { CalculatorInput, CalculatorResult } from '../models/calculator.model';
import { SiteDataService } from './site-data.service';

const TIMELINE_FACTOR = {
  0.5: 9,
  1: 14,
  2: 18,
  3: 24,
} as const;

/**
 * Frontend construction cost calculator.
 * estimate = builtUpArea × selectedPackage.pricePerSqft
 */
@Injectable({ providedIn: 'root' })
export class ConstructionCalculatorService {
  constructor(private data: SiteDataService) {}

  calculate(input: CalculatorInput): CalculatorResult {
    const pkg = this.data.packages().find((p) => p.id === input.packageId) ?? null;
    const estimatedCost = input.builtUpArea * (pkg?.pricePerSqft ?? 0);
    const perFloorCost = input.floors > 0 ? estimatedCost / input.floors : estimatedCost;
    const timelineMonths = this._timelineFor(input.floors);

    return {
      estimatedCost,
      costPerSqft: pkg?.pricePerSqft ?? 0,
      builtUpArea: input.builtUpArea,
      package: pkg,
      timelineMonths,
      perFloorCost,
    };
  }

  private _timelineFor(floors: number): number {
    if (floors <= 0) return 14;
    const key = (floors >= 3 ? 3 : floors) as keyof typeof TIMELINE_FACTOR;
    const base = TIMELINE_FACTOR[key] ?? 14;
    return key <= 0.5 ? base : base + (floors - key) * 4;
  }
}