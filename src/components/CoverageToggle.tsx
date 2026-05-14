import { motion } from 'motion/react';
import type { CoverageType } from '../types/insurance';
import type { CoverageOption } from '../data/constants';

interface Props {
  options: CoverageOption[];
  value: CoverageType;
  onChange: (v: CoverageType) => void;
}

export function CoverageToggle({ options, value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <motion.button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            whileTap={{ scale: 0.96 }}
            className={[
              'relative py-2.5 px-2 rounded-lg text-center transition-colors duration-200 cursor-pointer',
              active ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]',
            ].join(' ')}
          >
            {active && (
              <motion.div
                layoutId="coverage-bg"
                className="absolute inset-0 bg-indigo-600 rounded-lg"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative z-10">
              <p className="text-xs font-bold tracking-wide">{opt.label}</p>
              <p className={`text-[10px] mt-0.5 leading-tight ${active ? 'text-indigo-200' : 'text-slate-500'}`}>
                {opt.labelCz}
              </p>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
