export interface ConstructionPackage {
  id: string;
  name: string;
  pricePerSqft: number;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  materials: string;
  structural: string;
  electrical: string;
  plumbing: string;
  flooring: string;
  painting: string;
  doorsWindows: string;
  warranty: string;
  deliveredIn: string;
  highlight?: boolean;
}