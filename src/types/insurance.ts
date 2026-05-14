export type VehicleId = 'skoda-superb' | 'suzuki-swift';
export type CoverageType = 'tpl' | 'comprehensive' | 'full';
export type InsuranceAddon = 'roadside' | 'glass' | 'replacement';

export interface Vehicle {
  id: VehicleId;
  name: string;
  subtitle: string;
  value: number; // CZK
  engine: string;
  year: number;
  bodyType: string;
  accentClass: string;
  ringClass: string;
}

export interface InsuranceForm {
  vehicleId: VehicleId;
  coverageType: CoverageType;
  driverAge: number;
  noClaimYears: number;
  addons: InsuranceAddon[];
}

export interface PremiumBreakdown {
  baseAnnual: number;
  ageLoading: number;
  noClaimDiscount: number;
  addonsCost: number;
  totalAnnual: number;
  totalMonthly: number;
}

export interface YearlyProjection {
  year: number;
  noClaimYears: number;
  annual: number;
  monthly: number;
}

export interface CalculationResult {
  breakdown: PremiumBreakdown;
  projection: YearlyProjection[];
}
