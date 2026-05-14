import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import type { InsuranceAddon } from '../types/insurance';
import type { AddonOption } from '../data/constants';

const czk = new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 });

interface Props {
  option: AddonOption;
  checked: boolean;
  onChange: (id: InsuranceAddon, checked: boolean) => void;
}

export function AddonCheckbox({ option, checked, onChange }: Props) {
  return (
    <motion.button
      onClick={() => onChange(option.id, !checked)}
      whileTap={{ scale: 0.98 }}
      className={[
        'flex items-center gap-3 w-full p-3 rounded-lg transition-colors duration-150 cursor-pointer text-left',
        checked
          ? 'bg-emerald-500/10 border border-emerald-500/30'
          : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05]',
      ].join(' ')}
    >
      <motion.div
        animate={{
          backgroundColor: checked ? '#10b981' : 'rgba(255,255,255,0.07)',
          borderColor: checked ? '#10b981' : 'rgba(255,255,255,0.15)',
        }}
        transition={{ duration: 0.18 }}
        className="flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        >
          <Check size={11} className="text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${checked ? 'text-white' : 'text-slate-300'}`}>{option.label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{option.description}</p>
      </div>
      <span className={`text-xs font-mono font-medium flex-shrink-0 ${checked ? 'text-emerald-300' : 'text-slate-500'}`}>
        +{czk.format(option.annualCost)}/yr
      </span>
    </motion.button>
  );
}
