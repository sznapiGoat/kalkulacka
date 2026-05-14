import type { InsuranceForm, Vehicle, PremiumBreakdown, YearlyProjection, CalculationResult } from '../types/insurance';

const BASE_RATE: Record<string, number> = {
  tpl: 0.018,
  comprehensive: 0.026,
  full: 0.040,
};

const ADDON_COST: Record<string, number> = {
  roadside: 1_800,
  glass: 2_400,
  replacement: 3_600,
};

export function getAgeMultiplier(age: number): number {
  if (age < 21) return 1.80;
  if (age < 25) return 1.50;
  if (age < 30) return 1.20;
  if (age < 55) return 1.00;
  if (age < 65) return 1.10;
  return 1.25;
}

export function getNoClaimMultiplier(years: number): number {
  if (years === 0) return 1.00;
  if (years <= 1) return 0.92;
  if (years <= 3) return 0.82;
  if (years <= 5) return 0.72;
  if (years <= 7) return 0.64;
  return 0.58;
}

export function calculatePremium(vehicle: Vehicle, form: InsuranceForm): PremiumBreakdown {
  const baseAnnual = vehicle.value * BASE_RATE[form.coverageType];
  const ageMult = getAgeMultiplier(form.driverAge);
  const ncbMult = getNoClaimMultiplier(form.noClaimYears);

  const afterAge = baseAnnual * ageMult;
  const ageLoading = afterAge - baseAnnual;
  const afterNcb = afterAge * ncbMult;
  const noClaimDiscount = afterAge - afterNcb;

  const addonsCost = form.addons.reduce((sum, a) => sum + (ADDON_COST[a] ?? 0), 0);
  const totalAnnual = afterNcb + addonsCost;
  const totalMonthly = totalAnnual / 12;

  return {
    baseAnnual,
    ageLoading,
    noClaimDiscount,
    addonsCost,
    totalAnnual,
    totalMonthly,
  };
}

export function buildProjection(vehicle: Vehicle, form: InsuranceForm, years = 6): YearlyProjection[] {
  return Array.from({ length: years }, (_, i) => {
    const noClaimYears = form.noClaimYears + i;
    const { totalAnnual, totalMonthly } = calculatePremium(vehicle, { ...form, noClaimYears });
    return {
      year: new Date().getFullYear() + i,
      noClaimYears,
      annual: Math.round(totalAnnual),
      monthly: Math.round(totalMonthly),
    };
  });
}

export function getResult(vehicle: Vehicle, form: InsuranceForm): CalculationResult {
  return {
    breakdown: calculatePremium(vehicle, form),
    projection: buildProjection(vehicle, form),
  };
}
