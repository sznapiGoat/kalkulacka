import { z } from 'zod';

export const insuranceFormSchema = z.object({
  vehicleId: z.enum(['skoda-superb', 'suzuki-swift']),
  coverageType: z.enum(['tpl', 'comprehensive', 'full']),
  driverAge: z.number().int().min(18).max(80),
  noClaimYears: z.number().int().min(0).max(10),
  addons: z.array(z.enum(['roadside', 'glass', 'replacement'])),
});

export type InsuranceFormInput = z.infer<typeof insuranceFormSchema>;
