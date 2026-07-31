import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, Thermometer, Waves, Grid3x3, Activity, Box } from 'lucide-react';
import { SectionLabel } from './ui/MagneticButton';

const MODES = [
  { id: 'holographic', label: 'Holographic', icon: Box, desc: 'Full 3D holographic projection with depth layering' },
  { id: 'scan', label: 'Laser Scan', icon: ScanLine, desc: 'Automated laser grid scanning across all assemblies' },
  { id: 'thermal', label: 'Thermal', icon: Thermometer, desc: 'Heat distribution and thermal stress visualization' },
  { id: 'stress', label: 'Stress', icon: Activity, desc: 'Structural stress and load-path analysis' },
  { id: 'flow', label: 'Flow Simulation', icon: Waves, desc: 'Fluid dynamics and pressure flow simulation' },
  { id: 'grid', label: 'Particle Grid', icon: Grid3x3, desc: 'Dense particle field representing sensor network' },
] as const;

type ModeId = (typeof MODES)[number]['id'];

export default function DigitalTwinMode({
  mode,
  setMode,
}: {
  mode: ModeId;
  setMode: (m: ModeId) => void;
}) {
  return (
    <section id="twin-mode" className="relative min-h-screen w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-4">
          <SectionLabel index="04">Digital Twin Modes</SectionLabel>
          <h2 className="max-w-3xl font-sans text-4xl font-bold tracking-tight text-cyan-50 md:text-6xl">
            See the model <span className="gradient-text">in every dimension.</span>
          </h2>
          <p className="max-w-2xl text-lg font-light text-cyan-100/60">
            Switch between holographic, thermal, stress, and flow visualizations.
            Every mode reveals what the human eye cannot.
          </p>
        </div>

        {/* Mode selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          {MODES.map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`group flex items-center gap-2.5 rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  active
                    ? 'glass-strong text-cyan-100 ring-1 ring-cyan-400/40'
                    : 'glass text-cyan-300/50 hover:text-cyan-100'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-cyan-300' : ''}`} />
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Active mode description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="mb-6 max-w-xl text-sm font-light text-cyan-100/50"
          >
            {MODES.find((m) => m.id === mode)?.desc}
          </motion.p>
        </AnimatePresence>

        {/* Mode-specific HUD overlay info */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: 'Scan resolution', value: '0.4 mm', live: mode === 'scan' },
            { label: 'Thermal range', value: '22–148°C', live: mode === 'thermal' },
            { label: 'Stress nodes', value: '12,480', live: mode === 'stress' },
            { label: 'Flow velocity', value: '2.3 m/s', live: mode === 'flow' },
          ].map((s) => (
            <div
              key={s.label}
              className={`rounded-xl glass p-4 ${s.live ? 'ring-1 ring-cyan-400/30' : ''}`}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/40">
                {s.label}
              </p>
              <p className="mt-1 font-sans text-2xl font-semibold text-cyan-100">
                {s.value}
              </p>
              {s.live && (
                <span className="mt-1.5 flex items-center gap-1 font-mono text-[9px] text-safe">
                  <span className="h-1.5 w-1.5 rounded-full bg-safe animate-pulse" />
                  live
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
