import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Boxes,
  Network,
  Cpu,
  GitBranch,
  ScanLine,
  AlertTriangle,
  FileText,
  Brain,
} from 'lucide-react';
import { SectionLabel } from './ui/MagneticButton';

const STEPS = [
  { icon: Boxes, label: 'Reading geometry', detail: 'Tokenizing 47,832 solids and surfaces' },
  { icon: Network, label: 'Building topology graph', detail: 'Mapping 12,480 spatial relationships' },
  { icon: GitBranch, label: 'Understanding relationships', detail: 'Linking equipment to systems' },
  { icon: Cpu, label: 'Recognizing equipment', detail: 'Classifying 1,204 components' },
  { icon: ScanLine, label: 'Matching engineering standards', detail: 'Cross-referencing ISO-16739' },
  { icon: GitBranch, label: 'Comparing design intent', detail: 'Validating against specifications' },
  { icon: AlertTriangle, label: 'Detecting risks', detail: 'Flagging 3 critical, 17 warnings' },
  { icon: ScanLine, label: 'Running clash analysis', detail: '847 interference checks' },
  { icon: Boxes, label: 'Estimating constructability', detail: 'Sequencing 38 construction phases' },
  { icon: AlertTriangle, label: 'Predicting maintenance issues', detail: 'Simulating 10-year lifecycle' },
  { icon: FileText, label: 'Generating engineering insights', detail: 'Synthesizing actionable report' },
];

export default function AIThinking() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, 900);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section id="ai-thinking" className="relative min-h-screen w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-4" ref={ref}>
          <SectionLabel index="02">AI Reasoning</SectionLabel>
          <h2 className="max-w-3xl font-sans text-4xl font-bold tracking-tight text-cyan-50 md:text-6xl">
            RASM doesn't load. <span className="gradient-text">It thinks.</span>
          </h2>
          <p className="max-w-2xl text-lg font-light text-cyan-100/60">
            Behind every analysis is a chain of reasoning — geometry, topology,
            semantics, rules, and prediction. Watch the intelligence form.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Reasoning stream */}
          <div className="space-y-2">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const done = inView && i < active;
              const current = inView && i === active;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className={`flex items-center gap-4 rounded-xl p-3.5 transition-all duration-300 ${
                    current
                      ? 'glass-strong ring-1 ring-cyan-400/30'
                      : done
                        ? 'glass opacity-60'
                        : 'opacity-30'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      current
                        ? 'bg-cyan-400/20 text-cyan-200'
                        : done
                          ? 'text-safe'
                          : 'text-cyan-300/30'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium transition-colors ${
                      current ? 'text-cyan-100' : 'text-cyan-100/60'
                    }`}>
                      {step.label}
                    </p>
                    <p className="font-mono text-[10px] text-cyan-300/40">
                      {step.detail}
                    </p>
                  </div>
                  {done && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="font-mono text-[10px] text-safe"
                    >
                      ✓
                    </motion.span>
                  )}
                  {current && (
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="font-mono text-[10px] text-cyan-300"
                    >
                      processing
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Knowledge graph visualization */}
          <div className="relative overflow-hidden rounded-3xl glass-strong p-6">
            <div className="mb-4 flex items-center gap-2">
              <Brain className="h-4 w-4 text-cyan-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/50">
                Knowledge Graph · Live
              </span>
            </div>
            <KnowledgeGraph active={active} inView={inView} />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: 'Nodes', value: '12,480' },
                { label: 'Edges', value: '47,392' },
                { label: 'Rules', value: '1,204' },
              ].map((s) => (
                <div key={s.label} className="rounded-lg glass p-2.5 text-center">
                  <p className="font-sans text-lg font-semibold text-cyan-100">
                    {s.value}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/40">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KnowledgeGraph({ active, inView }: { active: number; inView: boolean }) {
  const nodes = useRef(
    Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const r = 50 + (i % 3) * 35;
      return {
        x: 150 + Math.cos(angle) * r,
        y: 130 + Math.sin(angle) * r * 0.7,
        r: 3 + (i % 4),
      };
    }),
  ).current;

  return (
    <svg viewBox="0 0 300 260" className="h-72 w-full">
      {/* connections */}
      {nodes.map((n, i) =>
        nodes.slice(i + 1).map((m, j) => {
          const dist = Math.hypot(n.x - m.x, n.y - m.y);
          if (dist > 75) return null;
          return (
            <motion.line
              key={`${i}-${j}`}
              x1={n.x}
              y1={n.y}
              x2={m.x}
              y2={m.y}
              stroke="rgba(25,227,255,0.12)"
              strokeWidth="0.6"
              animate={inView ? { opacity: [0.05, 0.2, 0.05] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: (i + j) * 0.05 }}
            />
          );
        }),
      )}
      {/* nodes */}
      {nodes.map((n, i) => {
        const lit = i < active * 2.2;
        return (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={lit ? '#19e3ff' : '#0a3550'}
            animate={lit ? { r: [n.r, n.r + 1.5, n.r], opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.04 }}
          />
        );
      })}
      {/* flowing data pulses */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = nodes[i * 3 % nodes.length];
        const b = nodes[(i * 3 + 7) % nodes.length];
        return (
          <motion.circle
            key={`pulse-${i}`}
            r="2"
            fill="#8ee9ff"
            animate={inView ? { cx: [a.x, b.x], cy: [a.y, b.y] } : {}}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.25,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </svg>
  );
}
