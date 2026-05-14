import { motion } from 'motion/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { YearlyProjection } from '../types/insurance';
import { fadeInUp } from '../animations/variants';

interface Props {
  data: YearlyProjection[];
}

const czk = new Intl.NumberFormat('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
  maximumFractionDigits: 0,
});

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as YearlyProjection;
  return (
    <div className="glass-card p-3 text-xs space-y-1.5 min-w-[160px]">
      <p className="font-semibold text-white mb-1">{label}</p>
      <div className="flex justify-between gap-4">
        <span className="text-slate-400">Annual</span>
        <span className="text-indigo-300 font-mono font-medium">{czk.format(d.annual)}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-slate-400">Monthly</span>
        <span className="text-slate-200 font-mono">{czk.format(d.monthly)}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-slate-400">NCB years</span>
        <span className="text-emerald-400 font-mono">{d.noClaimYears}</span>
      </div>
    </div>
  );
}

export function ProjectionChart({ data }: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.div variants={fadeInUp} className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="label-text mb-1">5-year projection</p>
          <p className="text-slate-200 font-semibold text-base">Premium trend with no-claim bonus</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-indigo-400 rounded inline-block" />
            <span className="text-slate-400">Annual</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500/30 inline-block" />
            <span className="text-slate-400">Savings area</span>
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="premiumGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="year"
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${Math.round(v / 1000)}k`}
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(99,102,241,0.3)', strokeWidth: 1 }} />
          <ReferenceLine
            x={currentYear}
            stroke="rgba(99,102,241,0.5)"
            strokeDasharray="4 4"
            label={{ value: 'Today', fill: '#818cf8', fontSize: 10, position: 'insideTopRight' }}
          />
          <Area
            type="monotone"
            dataKey="annual"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#premiumGrad)"
            dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#818cf8', strokeWidth: 0 }}
            animationDuration={900}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
        <span>Annual savings vs. year 1 (no NCB):</span>
        <span className="text-emerald-400 font-mono font-medium">
          {czk.format(data[0]?.annual - data[data.length - 1]?.annual)}
        </span>
        <span>after {data.length - 1} years</span>
      </div>
    </motion.div>
  );
}
