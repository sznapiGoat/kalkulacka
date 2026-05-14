import { useCallback } from 'react';

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  formatValue?: (n: number) => string;
  onChange: (n: number) => void;
}

export function RangeSlider({ label, value, min, max, step = 1, unit, formatValue, onChange }: Props) {
  const pct = `${Math.round(((value - min) / (max - min)) * 100)}%`;
  const display = formatValue ? formatValue(value) : `${value}${unit ? ` ${unit}` : ''}`;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value)),
    [onChange]
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="label-text">{label}</p>
        <div className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/25">
          <span className="text-sm font-semibold text-emerald-300 font-mono tabular-nums">{display}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="range-slider"
        style={{ '--val': pct } as React.CSSProperties}
      />
      <div className="flex justify-between text-[10px] text-slate-600">
        <span>{min}{unit ? ` ${unit}` : ''}</span>
        <span>{max}{unit ? ` ${unit}` : ''}</span>
      </div>
    </div>
  );
}
