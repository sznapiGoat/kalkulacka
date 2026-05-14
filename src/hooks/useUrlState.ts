import { useCallback, useEffect, useState } from 'react';
import type { InsuranceForm } from '../types/insurance';
import { insuranceFormSchema } from '../lib/validation';

const DEFAULT: InsuranceForm = {
  vehicleId: 'skoda-superb',
  coverageType: 'full',
  driverAge: 30,
  noClaimYears: 3,
  addons: [],
};

function encode(form: InsuranceForm): URLSearchParams {
  const p = new URLSearchParams();
  p.set('v', form.vehicleId);
  p.set('c', form.coverageType);
  p.set('age', String(form.driverAge));
  p.set('ncb', String(form.noClaimYears));
  if (form.addons.length) p.set('add', form.addons.join(','));
  return p;
}

function decode(p: URLSearchParams): InsuranceForm {
  try {
    const addRaw = p.get('add');
    return insuranceFormSchema.parse({
      vehicleId: p.get('v') ?? DEFAULT.vehicleId,
      coverageType: p.get('c') ?? DEFAULT.coverageType,
      driverAge: Number(p.get('age') ?? DEFAULT.driverAge),
      noClaimYears: Number(p.get('ncb') ?? DEFAULT.noClaimYears),
      addons: addRaw ? addRaw.split(',') : DEFAULT.addons,
    }) as InsuranceForm;
  } catch {
    return DEFAULT;
  }
}

export function useUrlState() {
  const [form, setFormState] = useState<InsuranceForm>(() =>
    decode(new URLSearchParams(window.location.search))
  );

  useEffect(() => {
    const qs = encode(form).toString();
    window.history.replaceState(null, '', `${window.location.pathname}?${qs}`);
  }, [form]);

  const setForm = useCallback(
    (patch: Partial<InsuranceForm> | ((prev: InsuranceForm) => InsuranceForm)) => {
      setFormState((prev) =>
        typeof patch === 'function' ? patch(prev) : { ...prev, ...patch }
      );
    },
    []
  );

  return { form, setForm };
}
