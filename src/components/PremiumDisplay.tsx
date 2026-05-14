import { motion, AnimatePresence } from 'motion/react';
import { Link, Check } from 'lucide-react';
import { useState } from 'react';
import type { PremiumBreakdown } from '../types/insurance';
import { AnimatedNumber } from './AnimatedNumber';
import { staggerContainer, listRow, fadeInUp } from '../animations/variants';

interface Props {
  breakdown: PremiumBreakdown;
}

export function PremiumDisplay({ breakdown }: Props) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div variants={fadeInUp} className="glass-card p-6 space-y-6">
      {/* Main price */}
      <div>
        <p className="label-text mb-2">Měsíční pojistné</p>
        <div className="flex items-end gap-3">
          <AnimatedNumber
            value={breakdown.totalMonthly}
            className="text-5xl font-bold tracking-tight gradient-text font-mono tabular-nums"
          />
          <span className="text-slate-400 text-lg mb-1">/měs.</span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <AnimatedNumber
            value={breakdown.totalAnnual}
            className="text-slate-400 text-base font-mono tabular-nums"
          />
          <span className="text-slate-600 text-sm">ročně</span>
        </div>
      </div>

      <div className="h-px bg-white/[0.06]" />

      {/* Breakdown */}
      <div>
        <p className="label-text mb-3">Rozpis pojistného</p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <BreakdownRow
            label="Základní pojistné"
            value={breakdown.baseAnnual}
            sign="+"
            color="text-slate-300"
          />
          {breakdown.ageLoading !== 0 && (
            <BreakdownRow
              label="Přirážka za věk"
              value={breakdown.ageLoading}
              sign="+"
              color="text-orange-400"
            />
          )}
          {breakdown.noClaimDiscount > 0 && (
            <BreakdownRow
              label="Bonus za bezeškodní průběh"
              value={breakdown.noClaimDiscount}
              sign="−"
              color="text-emerald-400"
            />
          )}
          {breakdown.addonsCost > 0 && (
            <BreakdownRow
              label="Připojištění"
              value={breakdown.addonsCost}
              sign="+"
              color="text-sky-400"
            />
          )}
          <div className="h-px bg-white/[0.06] my-1" />
          <BreakdownRow
            label="Celkem ročně"
            value={breakdown.totalAnnual}
            sign=""
            color="text-white"
            bold
          />
        </motion.div>
      </div>

      {/* Share link */}
      <motion.button
        onClick={copyLink}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.14] transition-colors text-sm text-slate-300 cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 text-emerald-400"
            >
              <Check size={14} />
              Odkaz zkopírován!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Link size={14} />
              Sdílet konfiguraci
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

function BreakdownRow({
  label,
  value,
  sign,
  color,
  bold,
}: {
  label: string;
  value: number;
  sign: string;
  color: string;
  bold?: boolean;
}) {
  return (
    <motion.div variants={listRow} className="flex items-center justify-between">
      <span className={`text-sm ${bold ? 'font-semibold text-white' : 'text-slate-400'}`}>{label}</span>
      <AnimatedNumber
        value={value}
        format={(n) =>
          `${sign} ${new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(n)}`
        }
        className={`text-sm font-mono font-medium tabular-nums ${bold ? 'text-white font-semibold' : color}`}
      />
    </motion.div>
  );
}
