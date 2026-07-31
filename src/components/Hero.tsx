import { motion } from 'framer-motion';
import { Activity, Boxes, Cpu, Globe } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D twin canvas is mounted globally in App for persistence */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />
      </div>

      {/* Top gradient + grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 flex items-center gap-2 rounded-full glass px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-200/80">
              Design Intelligence · Online
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="max-w-5xl font-sans text-5xl font-bold leading-[1.05] tracking-tightest text-cyan-50 md:text-7xl lg:text-8xl"
          >
            Engineering
            <br />
            <span className="gradient-text-warm">becomes intelligent.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-cyan-100/70 md:text-xl"
          >
            RASM is the world's first AI Design Intelligence Platform. It
            understands industrial engineering models — and detects design
            errors before construction begins.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton variant="primary" onClick={() => {}}>
              Launch RASM
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => {}}>
              Watch the experience
            </MagneticButton>
          </motion.div>

          {/* Capability chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/40"
          >
            {[
              { icon: Cpu, label: 'AI' },
              { icon: Boxes, label: 'Digital Twin' },
              { icon: Activity, label: 'Computer Vision' },
              { icon: Globe, label: 'Knowledge Graph' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
    </section>
  );
}
