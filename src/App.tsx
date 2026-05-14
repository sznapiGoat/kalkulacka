import { useMemo } from 'react';
import { motion } from 'motion/react';
import type { InsuranceAddon } from './types/insurance';
import { VEHICLES, COVERAGE_OPTIONS, ADDON_OPTIONS } from './data/constants';
import { getResult } from './lib/calculations';
import { useUrlState } from './hooks/useUrlState';
import { VehicleCard } from './components/VehicleCard';
import { CoverageToggle } from './components/CoverageToggle';
import { RangeSlider } from './components/RangeSlider';
import { AddonCheckbox } from './components/AddonCheckbox';
import { PremiumDisplay } from './components/PremiumDisplay';
import { ProjectionChart } from './components/ProjectionChart';
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from './animations/variants';

export default function App() {
  const { form, setForm } = useUrlState();

  const vehicle = VEHICLES.find((v) => v.id === form.vehicleId)!;
  const result = useMemo(() => getResult(vehicle, form), [vehicle, form]);

  const toggleAddon = (id: InsuranceAddon, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      addons: checked ? [...prev.addons, id] : prev.addons.filter((a) => a !== id),
    }));
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    >
      {/* Ambient glow blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 lg:px-8">
        {/* ── Hero ────────────────────────────────────────── */}
        <motion.header
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-14"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Czech Market · AIS Servis Compatible
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-bold tracking-tight gradient-text mb-3"
          >
            Car Insurance Calculator
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-xl mx-auto">
            Precision premium estimates for Czech market vehicles — instant, transparent, shareable.
          </motion.p>
        </motion.header>

        {/* ── Main grid ───────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mb-6"
        >
          {/* LEFT PANEL ── Inputs */}
          <motion.div variants={fadeInLeft} className="space-y-5">
            {/* Vehicle selection */}
            <Section label="Select vehicle">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VEHICLES.map((v) => (
                  <VehicleCard
                    key={v.id}
                    vehicle={v}
                    selected={form.vehicleId === v.id}
                    onSelect={() => setForm({ vehicleId: v.id })}
                  />
                ))}
              </div>
            </Section>

            {/* Coverage type */}
            <Section label="Coverage type">
              <CoverageToggle
                options={COVERAGE_OPTIONS}
                value={form.coverageType}
                onChange={(coverageType) => setForm({ coverageType })}
              />
            </Section>

            {/* Sliders */}
            <Section label="Driver profile">
              <div className="space-y-6">
                <RangeSlider
                  label="Driver age"
                  value={form.driverAge}
                  min={18}
                  max={80}
                  unit="yrs"
                  onChange={(driverAge) => setForm({ driverAge })}
                />
                <RangeSlider
                  label="No-claim years (bonus)"
                  value={form.noClaimYears}
                  min={0}
                  max={10}
                  unit="yrs"
                  onChange={(noClaimYears) => setForm({ noClaimYears })}
                />
              </div>
            </Section>

            {/* Add-ons */}
            <Section label="Optional add-ons">
              <div className="space-y-2">
                {ADDON_OPTIONS.map((opt) => (
                  <AddonCheckbox
                    key={opt.id}
                    option={opt}
                    checked={form.addons.includes(opt.id)}
                    onChange={toggleAddon}
                  />
                ))}
              </div>
            </Section>
          </motion.div>

          {/* RIGHT PANEL ── Results */}
          <motion.div variants={fadeInRight} className="space-y-5 lg:sticky lg:top-8 self-start">
            {/* Effective rate badge */}
            <div className="glass-card px-4 py-3 flex items-center justify-between">
              <span className="label-text">Effective annual rate</span>
              <span className="text-sm font-semibold font-mono text-indigo-300">
                {((result.breakdown.totalAnnual / vehicle.value) * 100).toFixed(2)}%
              </span>
            </div>
            <PremiumDisplay breakdown={result.breakdown} />
          </motion.div>
        </motion.div>

        {/* ── Projection chart ────────────────────────────── */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <ProjectionChart data={result.projection} />
        </motion.div>

        {/* ── Footer ──────────────────────────────────────── */}
        <motion.footer
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-10 text-slate-600 text-xs space-y-1"
        >
          <p>Estimates only — not binding insurance quotes. Czech market rates as of 2024.</p>
          <p>Built with React · TypeScript · Motion · Recharts · Tailwind CSS</p>
        </motion.footer>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="glass-card p-5 space-y-4">
      <p className="label-text">{label}</p>
      {children}
    </div>
  );
}
