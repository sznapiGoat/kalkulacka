import type { Vehicle, InsuranceAddon, CoverageType } from '../types/insurance';

export const VEHICLES: Vehicle[] = [
  {
    id: 'skoda-superb',
    name: 'Škoda Superb',
    subtitle: 'IV Generation · 2024',
    value: 850_000,
    engine: '2.0 TSI · 150 kW',
    year: 2024,
    bodyType: 'Liftback',
    accentClass: 'from-blue-600 to-indigo-700',
    ringClass: 'ring-blue-500/60',
  },
  {
    id: 'suzuki-swift',
    name: 'Suzuki Swift',
    subtitle: 'VI Generation · 2024',
    value: 380_000,
    engine: '1.2 DualJet · 83 kW',
    year: 2024,
    bodyType: 'Hatchback',
    accentClass: 'from-violet-600 to-purple-700',
    ringClass: 'ring-violet-500/60',
  },
];

export interface CoverageOption {
  id: CoverageType;
  label: string;
  labelCz: string;
  description: string;
}

export const COVERAGE_OPTIONS: CoverageOption[] = [
  {
    id: 'tpl',
    label: 'TPL',
    labelCz: 'Povinné ručení',
    description: 'Mandatory 3rd-party liability',
  },
  {
    id: 'comprehensive',
    label: 'CASCO',
    labelCz: 'Havarijní',
    description: 'Full vehicle protection',
  },
  {
    id: 'full',
    label: 'FULL',
    labelCz: 'Kompletní',
    description: 'TPL + CASCO bundle',
  },
];

export interface AddonOption {
  id: InsuranceAddon;
  label: string;
  description: string;
  annualCost: number;
}

export const ADDON_OPTIONS: AddonOption[] = [
  {
    id: 'roadside',
    label: 'Roadside Assist',
    description: '24/7 emergency support',
    annualCost: 1_800,
  },
  {
    id: 'glass',
    label: 'Glass Protection',
    description: 'Windshield & windows',
    annualCost: 2_400,
  },
  {
    id: 'replacement',
    label: 'Replacement Car',
    description: 'Loan vehicle during repair',
    annualCost: 3_600,
  },
];
