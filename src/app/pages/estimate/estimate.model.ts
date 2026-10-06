export interface SpecRow {
  label: string;
  value: string;
}

export interface PackageSpec {
  structure: SpecRow[];
  finishes: SpecRow[];
  fittings: SpecRow[];
  includes: string[];
}

export interface EstimatePackage {
  id: 'budget' | 'standard' | 'premium' | 'luxury';
  name: string;
  rate: number;
  tier: string;
  icon: string;
  tagline?: string;
  highlighted?: boolean;
}

export interface ExtraItem {
  id: string;
  label: string;
  unit: string;
  rate: number;
  fixed: boolean;
  placeholder: string;
}

export interface PhaseSplit {
  label: string;
  pct: number;
  color: string;
}

export interface FloorConfig {
  id: string;
  label: string;
  count: number;
  months: number;
}

export const ESTIMATE_PACKAGES: EstimatePackage[] = [
  { id: 'budget', name: 'Budget', rate: 1999, tier: 'Smart Budget', icon: '🏠', tagline: 'Functional & sturdy — quality construction within a practical budget.', highlighted: false },
  { id: 'standard', name: 'Standard', rate: 2299, tier: 'Quality Choice', icon: '✨', tagline: 'Stronger specifications and better finishes for everyday family living.', highlighted: true },
  { id: 'premium', name: 'Premium', rate: 2599, tier: 'Elevated Living', icon: '🏛', tagline: 'Architectural detailing, premium finishes and engineered comfort.', highlighted: false },
  { id: 'luxury', name: 'Luxury', rate: 2899, tier: 'The Statement', icon: '👑', tagline: 'Bespoke architecture, imported materials and a fully curated home experience.', highlighted: false },
];

export const PACKAGE_SPECS: Record<EstimatePackage['id'], PackageSpec> = {
  budget: {
    structure: [
      { label: 'Steel', value: 'ISI-grade, any reputed mill' },
      { label: 'Cement', value: 'ISI-grade, any reputed mill' },
      { label: 'RCC Mix', value: 'M20 grade concrete' },
      { label: 'Basement Height', value: 'Up to 2 ft' },
      { label: 'Ceiling Height', value: '9 ft' },
      { label: 'Waterproofing', value: 'Branded treatment' },
      { label: 'Plastering', value: 'P-sand' },
    ],
    finishes: [
      { label: 'Living / Dining Tiles', value: "2'×2', up to ₹45/sqft" },
      { label: 'Bedroom & Kitchen Tiles', value: 'Up to ₹45/sqft' },
      { label: 'Interior Paint', value: 'ISI emulsion, 2 coats' },
      { label: 'Exterior Paint', value: 'Weatherproof emulsion' },
      { label: 'Interior Putty', value: 'Wall putty' },
      { label: 'Elevation Design', value: 'Basic elevation' },
      { label: 'Drawings', value: '2D floor plan' },
    ],
    fittings: [
      { label: 'Main Door', value: 'Readymade teak-finish frame' },
      { label: 'Windows', value: "Aluminium, 3'×4'" },
      { label: 'Internal Doors', value: 'Flush doors' },
      { label: 'Wiring', value: 'ISI-grade copper' },
      { label: 'Switches', value: 'ISI-grade modular' },
      { label: 'CP Fittings', value: 'Allowance up to ₹7,000' },
      { label: 'Plumbing Pipes', value: 'ISI-grade PVC/CPVC' },
    ],
    includes: ['2D Floor Plan', 'Lofts & Shelves', 'Site Engineer'],
  },
  standard: {
    structure: [
      { label: 'Steel', value: 'Leading ISI brands (Fe500D)' },
      { label: 'Cement', value: 'Leading ISI brands (OPC 53)' },
      { label: 'RCC Mix', value: 'M25 grade concrete' },
      { label: 'Basement Height', value: 'Up to 2.5 ft' },
      { label: 'Ceiling Height', value: '9.5 ft' },
      { label: 'Waterproofing', value: 'Branded + anti-termite' },
      { label: 'Plastering', value: 'P-sand, smooth finish' },
    ],
    finishes: [
      { label: 'Living / Dining Tiles', value: "4'×2', up to ₹80/sqft" },
      { label: 'Bedroom & Kitchen Tiles', value: 'Up to ₹65/sqft' },
      { label: 'Interior Paint', value: 'Premium emulsion + putty' },
      { label: 'Exterior Paint', value: 'Primer + weatherproof coat' },
      { label: 'Kitchen', value: 'Modular-style granite platform' },
      { label: 'Elevation Design', value: '3D elevation included' },
      { label: 'Drawings', value: '2D + basic 3D' },
    ],
    fittings: [
      { label: 'Main Door', value: 'Teak frame, laminated shutter' },
      { label: 'Windows', value: 'Powder-coated aluminium' },
      { label: 'Internal Doors', value: 'Flush doors with laminated finish' },
      { label: 'Wiring', value: 'Havells / Polycab copper' },
      { label: 'Switches', value: 'Anchor / Havells modular' },
      { label: 'CP Fittings', value: 'Jaquar / Cera allowance ₹15,000' },
      { label: 'Plumbing Pipes', value: 'Supreme / Prince CPVC' },
    ],
    includes: ['2D Floor Plan', '3D Elevation', 'Lofts & Shelves', 'Site Engineer', 'Soil Testing'],
  },
  premium: {
    structure: [
      { label: 'Steel', value: 'Premium Fe500D brands' },
      { label: 'Cement', value: 'Premium OPC 53 / PPC' },
      { label: 'RCC Mix', value: 'M25 / M30 as per design' },
      { label: 'Basement Height', value: 'Up to 3 ft' },
      { label: 'Ceiling Height', value: '10 ft' },
      { label: 'Waterproofing', value: 'Branded + anti-termite + terrace' },
      { label: 'Plastering', value: 'P-sand, smooth finish' },
    ],
    finishes: [
      { label: 'Living / Dining Tiles', value: "4'×2', up to ₹120/sqft" },
      { label: 'Bedroom & Kitchen Tiles', value: 'Up to ₹100/sqft' },
      { label: 'Interior Paint', value: 'Premium emulsion + full putty' },
      { label: 'Exterior Paint', value: 'Texture + weatherproof system' },
      { label: 'Kitchen', value: 'Granite platform + stainless sink' },
      { label: 'Elevation Design', value: 'Designer 3D elevation' },
      { label: 'Drawings', value: 'Full 2D + 3D + working drawings' },
    ],
    fittings: [
      { label: 'Main Door', value: 'Solid teak door with premium hardware' },
      { label: 'Windows', value: 'UPVC / double-glazed aluminium' },
      { label: 'Internal Doors', value: 'Premium flush with concealed hinges' },
      { label: 'Wiring', value: 'Havells / Polycab with conduit' },
      { label: 'Switches', value: 'Anchor Roma / modular designer' },
      { label: 'CP Fittings', value: 'Jaquar / Kohler allowance ₹30,000' },
      { label: 'Plumbing Pipes', value: 'Premium CPVC / PPR' },
    ],
    includes: ['2D Floor Plan', '3D Elevation', 'Working Drawings', 'Lofts & Shelves', 'Site Engineer', 'Soil Testing', 'Interior Consultation'],
  },
  luxury: {
    structure: [
      { label: 'Steel', value: 'Top-grade Fe500D / Fe550D' },
      { label: 'Cement', value: 'Top-grade OPC 53 / imported blend' },
      { label: 'RCC Mix', value: 'M30+ as per structural design' },
      { label: 'Basement Height', value: 'Up to 3.5 ft' },
      { label: 'Ceiling Height', value: '10.5 ft' },
      { label: 'Waterproofing', value: 'Full waterproofing system + terrace' },
      { label: 'Plastering', value: 'A-one sand, level-5 finish' },
    ],
    finishes: [
      { label: 'Living / Dining Tiles', value: 'Imported / vitrified up to ₹200/sqft' },
      { label: 'Bedroom & Kitchen Tiles', value: 'Up to ₹150/sqft' },
      { label: 'Interior Paint', value: 'Asian Paints Royale / Berger' },
      { label: 'Exterior Paint', value: 'Premium texture system + rain Guard' },
      { label: 'Kitchen', value: 'Modular kitchen with chimney provision' },
      { label: 'Elevation Design', value: 'Bespoke architectural elevation' },
      { label: 'Drawings', value: 'Complete architectural + structural set' },
    ],
    fittings: [
      { label: 'Main Door', value: 'Imported / solid hardwood premium' },
      { label: 'Windows', value: 'Premium UPVC / Schüco-grade' },
      { label: 'Internal Doors', value: 'Designer panels with premium hardware' },
      { label: 'Wiring', value: 'Full smart-home pre-wiring' },
      { label: 'Switches', value: 'Schneider / Legrand designer' },
      { label: 'CP Fittings', value: 'Kohler / Grohe allowance ₹60,000' },
      { label: 'Plumbing Pipes', value: 'Premium PPR / copper' },
    ],
    includes: ['2D Floor Plan', '3D Elevation', 'Full Working Drawings', 'Smart Home Pre-wiring', 'Lofts & Shelves', 'Dedicated Site Engineer', 'Soil Testing', 'Interior Design Consultation', 'Landscape Consultation'],
  },
};

export const EXTRA_ITEMS: ExtraItem[] = [
  { id: 'soil-test', label: 'Soil Testing', unit: 'lot', rate: 4500, fixed: true, placeholder: '' },
  { id: 'elevation', label: '3D Elevation Design', unit: 'lot', rate: 25000, fixed: true, placeholder: '' },
  { id: 'interior', label: 'Interior Design Consultation', unit: 'lot', rate: 35000, fixed: true, placeholder: '' },
  { id: 'compound', label: 'Compound Wall', unit: 'running ft', rate: 650, fixed: false, placeholder: 'e.g. 120' },
  { id: 'gate', label: 'Main Gate (MS/SS)', unit: 'unit', rate: 45000, fixed: false, placeholder: '1 or 2' },
  { id: 'landscaping', label: 'Landscaping', unit: 'sqft', rate: 180, fixed: false, placeholder: 'e.g. 400' },
  { id: 'solar', label: 'Solar Water Heater', unit: 'lot', rate: 65000, fixed: true, placeholder: '' },
  { id: 'stp', label: 'Sewage Treatment Plant', unit: 'lot', rate: 120000, fixed: true, placeholder: '' },
  { id: 'lift', label: 'Passenger Lift (4-person)', unit: 'lot', rate: 450000, fixed: true, placeholder: '' },
  { id: 'borewell', label: 'Borewell', unit: 'lot', rate: 55000, fixed: true, placeholder: '' },
  { id: 'RAINTANK', label: 'Overhead Tank (1000L)', unit: 'lot', rate: 18000, fixed: true, placeholder: '' },
  { id: 'ups', label: 'Home UPS / Inverter', unit: 'lot', rate: 45000, fixed: true, placeholder: '' },
];

export const PHASE_SPLITS: PhaseSplit[] = [
  { label: 'Foundation & Basement', pct: 18, color: '#7c4dff' },
  { label: 'Structure & Slab', pct: 28, color: '#00bfa5' },
  { label: 'Brickwork & Plastering', pct: 15, color: '#ff6d00' },
  { label: 'Flooring & Tiling', pct: 17, color: '#e91e63' },
  { label: 'Painting & Finishing', pct: 12, color: '#2979ff' },
  { label: 'MEP & Fittings', pct: 10, color: '#64dd17' },
];

export const FLOOR_CONFIGS: FloorConfig[] = [
  { id: 'G', label: 'Ground Floor Only', count: 1, months: 10 },
  { id: 'G+1', label: 'Ground + 1 Floor', count: 2, months: 13 },
  { id: 'G+2', label: 'Ground + 2 Floors', count: 3, months: 17 },
  { id: 'G+3', label: 'Ground + 3 Floors', count: 4, months: 22 },
];
