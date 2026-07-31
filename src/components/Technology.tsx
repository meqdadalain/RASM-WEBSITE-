import { motion } from 'framer-motion';
import {
  FileBox,
  Boxes,
  Network,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  FileText,
  ArrowDown,
} from 'lucide-react';
import { SectionLabel } from './ui/MagneticButton';

const PIPELINE = [
  { icon: FileBox, label: 'CAD / BIM', sub: 'IFC · RVT · DWG · DGN', desc: 'Ingest industrial models in any standard format.' },
  { icon: Boxes, label: 'Parser', sub: 'Geometry extraction', desc: 'Tokenizes solids, surfaces, and metadata.' },
  { icon: Network, label: 'Geometry Engine', sub: '3D topology', desc: 'Builds spatial and topological relationships.' },
  { icon: Network, label: 'Knowledge Graph', sub: 'Semantic model', desc: 'Links equipment, systems, and engineering rules.' },
  { icon: Cpu, label: 'LLM', sub: 'Language reasoning', desc: 'Interprets intent, specs, and documentation.' },
  { icon: ShieldCheck, label: 'Rule Engine', sub: 'Standards compliance', desc: 'Validates against ISO, ASME, and domain codes.' },
  { icon: AlertTriangle, label: 'Risk Detection', sub: 'Clash & failure', desc: 'Identifies design errors and constructability risks.' },
  { icon: FileText, label: 'Engineering Report', sub: 'Actionable output', desc: 'Generates a complete, traceable engineering report.' },
];

export default function Technology() {
  return (
    <section id="technology" className="relative min-h-screen w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-4">
          <SectionLabel index="06">Technology</SectionLabel>
          <h2 className="max-w-3xl font-sans text-4xl font-bold tracking-tight text-cyan-50 md:text-6xl">
            The architecture <span className="gradient-text">behind the intelligence.</span>
          </h2>
          <p className="max-w-2xl text-lg font-light text-cyan-100/60">
            From raw geometry to engineering insight — a pipeline where every
            stage adds understanding.
          </p>
        </div>

        {/* Vertical pipeline */}
        <div className="mx-auto max-w-3xl">
          {PIPELINE.map((stage, i) => {
            const Icon = stage.icon;
            const isLast = i === PIPELINE.length - 1;
            return (
              <div key={stage.label}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="group relative flex items-center gap-5 rounded-2xl glass p-5 transition-colors hover:bg-cyan-400/5"
                >
                  {/* Node */}
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl glass-strong">
                    <div className="absolute inset-0 rounded-2xl bg-cyan-400/5 blur-xl transition-opacity group-hover:bg-cyan-400/15" />
                    <Icon className="relative h-6 w-6 text-cyan-300" />
                    {/* pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-cyan-400/20"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-sans text-lg font-semibold text-cyan-50">
                        {stage.label}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/40">
                        {stage.sub}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm font-light text-cyan-100/50">
                      {stage.desc}
                    </p>
                  </div>

                  {/* Step number */}
                  <span className="font-mono text-xs text-cyan-300/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.div>

                {/* Connector */}
                {!isLast && (
                  <div className="flex justify-center py-1">
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      whileInView={{ opacity: 1, scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.3, duration: 0.4 }}
                      className="flex flex-col items-center"
                    >
                      <div className="h-8 w-px bg-gradient-to-b from-cyan-400/40 to-cyan-400/10" />
                      <motion.div
                        animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      >
                        <ArrowDown className="h-3 w-3 text-cyan-300/60" />
                      </motion.div>
                      <div className="h-8 w-px bg-gradient-to-b from-cyan-400/10 to-cyan-400/40" />
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tech stack chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/40">
            Built on
          </span>
          {['AI', 'Computer Vision', 'LLMs', 'Knowledge Graphs', 'Digital Twin', 'CAD', 'BIM', '3D Geometry', 'Semantic Analysis'].map(
            (t) => (
              <span
                key={t}
                className="rounded-full glass px-4 py-1.5 font-mono text-[11px] text-cyan-100/60"
              >
                {t}
              </span>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}
