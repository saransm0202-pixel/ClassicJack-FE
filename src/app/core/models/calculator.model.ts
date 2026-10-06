import { ConstructionPackage } from './construction-package.model';

export type CalculatorPackageId =
  | 'budget'
  | 'standard'
  | 'premium'
  | 'luxury';

export interface CalculatorInput {
  plotArea: number;
  builtUpArea: number;
  floors: number;
  packageId: CalculatorPackageId;
  location: string;
  constructionType: string;
}

export interface CalculatorResult {
  estimatedCost: number;
  costPerSqft: number;
  builtUpArea: number;
  package: ConstructionPackage | null;
  timelineMonths: number;
  perFloorCost: number;
}