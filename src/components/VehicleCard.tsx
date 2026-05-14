import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import type { Vehicle } from '../types/insurance';
import { vehicleCard } from '../animations/variants';

interface Props {
  vehicle: Vehicle;
  selected: boolean;
  onSelect: () => void;
}

const czk = new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 });

export function VehicleCard({ vehicle, selected, onSelect }: Props) {
  return (
    <motion.button
      onClick={onSelect}
      variants={vehicleCard}
      initial="idle"
      animate={selected ? 'selected' : 'idle'}
      whileHover="hover"
      whileTap="tap"
      className={[
        'relative w-full text-left p-5 rounded-xl transition-all duration-200 cursor-pointer',
        'glass-card',
        selected
          ? `ring-2 ${vehicle.ringClass} bg-white/[0.07]`
          : 'ring-1 ring-white/[0.06] hover:ring-white/[0.12] hover:bg-white/[0.06]',
      ].join(' ')}
    >
      {/* Gradient accent stripe */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r ${vehicle.accentClass} opacity-${selected ? '100' : '40'} transition-opacity`} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-base leading-tight">{vehicle.name}</p>
          <p className="text-slate-400 text-xs mt-0.5">{vehicle.subtitle}</p>
        </div>
        <motion.div
          animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"
        >
          <Check size={11} className="text-white" strokeWidth={3} />
        </motion.div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Stat label="Motor" value={vehicle.engine} />
        <Stat label="Karoserie" value={vehicle.bodyType} />
        <Stat label="Rok" value={String(vehicle.year)} />
        <Stat label="Hodnota" value={czk.format(vehicle.value)} highlight />
      </div>
    </motion.button>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="label-text mb-0.5">{label}</p>
      <p className={`text-sm font-medium ${highlight ? 'text-emerald-300' : 'text-slate-200'}`}>{value}</p>
    </div>
  );
}
