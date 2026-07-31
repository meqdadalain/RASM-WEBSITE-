import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Flame, Zap, Atom, Car, Building2, Pill, Anchor } from 'lucide-react';
import { SectionLabel } from './ui/MagneticButton';

const INDUSTRIES = [
  { id: 'water', label: 'Water', icon: Droplets, desc: 'Treatment plants, distribution networks, and process control systems.' },
  { id: 'oil', label: 'Oil & Gas', icon: Flame, desc: 'Refineries, pipelines, and offshore platforms with hazard analysis.' },
  { id: 'energy', label: 'Energy', icon: Zap, desc: 'Power generation, grid infrastructure, and renewable installations.' },
  { id: 'nuclear', label: 'Nuclear', icon: Atom, desc: 'Reactor systems with multi-layer safety and compliance verification.' },
  { id: 'auto', label: 'Automotive', icon: Car, desc: 'Manufacturing lines, paint shops, and assembly tooling.' },
  { id: 'construction', label: 'Construction', icon: Building2, desc: 'Large-scale structural and MEP coordination for mega-projects.' },
  { id: 'pharma', label: 'Pharmaceutical', icon: Pill, desc: 'GMP-compliant cleanrooms and bioprocessing facilities.' },
  { id: 'marine', label: 'Marine', icon: Anchor, desc: 'Shipbuilding, port infrastructure, and offshore engineering.' },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const industry = INDUSTRIES[active];
  const Icon = industry.icon;

  return (
    <section id="industries" className="relative min-h-screen w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-4">
          <SectionLabel index="05">Industries</SectionLabel>
          <h2 className="max-w-3xl font-sans text-4xl font-bold tracking-tight text-cyan-50 md:text-6xl">
            One intelligence. <span className="gradient-text">Every industry.</span>
          </h2>
          <p className="max-w-2xl text-lg font-light text-cyan-100/60">
            RASM adapts its engineering knowledge graph to each domain — with
            industry-specific rules, standards, and risk models.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Selector grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {INDUSTRIES.map((ind, i) => {
              const I = ind.icon;
              const isActive = i === active;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActive(i)}
                  className={`group relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 ${
                    isActive
                      ? 'glass-strong ring-1 ring-cyan-400/40'
                      : 'glass hover:bg-cyan-400/5'
                  }`}
                >
                  <div
                    className={`absolute -right-4 -top-4 h-16 w-16 rounded-full blur-2xl transition-opacity ${
                      isActive ? 'bg-cyan-400/20' : 'bg-cyan-400/0'
                    }`}
                  />
                  <I
                    className={`h-6 w-6 transition-colors ${
                      isActive ? 'text-cyan-300' : 'text-cyan-300/40'
                    }`}
                  />
                  <p
                    className={`mt-3 text-sm font-medium transition-colors ${
                      isActive ? 'text-cyan-100' : 'text-cyan-100/60'
                    }`}
                  >
                    {ind.label}
                  </p>
                  {isActive && (
                    <motion.div
                      layoutId="industry-active"
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-300 to-transparent"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active industry showcase */}
          <div className="relative overflow-hidden rounded-3xl glass-strong p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass">
                    <Icon className="h-7 w-7 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-sans text-2xl font-bold text-cyan-50">
                      {industry.label}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/40">
                      Digital Twin · Active
                    </p>
                  </div>
                </div>
                <p className="mb-8 text-base font-light leading-relaxed text-cyan-100/60">
                  {industry.desc}
                </p>

                {/* Stat strip */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Models analyzed', value: '2,847' },
                    { label: 'Rules in graph', value: '1,204' },
                    { label: 'Avg. scan time', value: '38s' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl glass p-3">
                      <p className="font-sans text-xl font-semibold text-cyan-100">
                        {s.value}
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/40">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Mini wireframe preview */}
                <div className="mt-6 h-32 overflow-hidden rounded-xl glass">
                  <svg viewBox="0 0 400 120" className="h-full w-full">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.line
                        key={i}
                        x1={i * 50}
                        y1="0"
                        x2={i * 50}
                        y2="120"
                        stroke="rgba(25,227,255,0.1)"
                        strokeWidth="1"
                      />
                    ))}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.line
                        key={`h${i}`}
                        x1="0"
                        y1={i * 30}
                        x2="400"
                        y2={i * 30}
                        stroke="rgba(25,227,255,0.08)"
                        strokeWidth="1"
                      />
                    ))}
                    {/* animated twin silhouette */}
                    <motion.path
                      d="M120 90 L120 50 L160 30 L200 50 L200 90 L240 90 L240 40 L280 20 L320 40 L320 90 Z"
                      fill="none"
                      stroke="#19e3ff"
                      strokeWidth="1.5"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.circle
                      cx="180"
                      cy="60"
                      r="4"
                      fill="#19e3ff"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </svg>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
