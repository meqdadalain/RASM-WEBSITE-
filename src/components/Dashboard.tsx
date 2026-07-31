import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  ShieldCheck,
  AlertOctagon,
  AlertTriangle,
  PackageX,
  Euro,
  Clock,
  Leaf,
  CalendarX,
} from 'lucide-react';
import { SectionLabel } from './ui/MagneticButton';

const METRICS = [
  { icon: ShieldCheck, label: 'Engineering Quality Score', value: 95, suffix: '', color: 'text-safe', bar: true },
  { icon: AlertOctagon, label: 'Critical Risks', value: 3, suffix: '', color: 'text-danger' },
  { icon: AlertTriangle, label: 'Warnings', value: 17, suffix: '', color: 'text-warn' },
  { icon: PackageX, label: 'Missing Components', value: 5, suffix: '', color: 'text-cyan-300' },
  { icon: Euro, label: 'Estimated Cost Avoided', value: 480, suffix: 'K', prefix: '€', color: 'text-safe' },
  { icon: Clock, label: 'Engineering Hours Saved', value: 164, suffix: '', color: 'text-cyan-200' },
  { icon: Leaf, label: 'CO₂ Reduction', value: 12, suffix: ' tons', color: 'text-safe' },
  { icon: CalendarX, label: 'Estimated Delay Avoided', value: 21, suffix: ' days', color: 'text-cyan-200' },
];

export default function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="dashboard" className="relative min-h-screen w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-4" ref={ref}>
          <SectionLabel index="03">Engineering Dashboard</SectionLabel>
          <h2 className="max-w-3xl font-sans text-4xl font-bold tracking-tight text-cyan-50 md:text-6xl">
            Every insight, <span className="gradient-text">quantified.</span>
          </h2>
          <p className="max-w-2xl text-lg font-light text-cyan-100/60">
            RASM translates geometry into decisions. Quality, risk, cost, time, and
            carbon — measured before a single brick is laid.
          </p>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {METRICS.map((m, i) => (
            <MetricCard key={m.label} {...m} index={i} inView={inView} />
          ))}
        </div>

        {/* Charts row */}
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          <RiskDistribution inView={inView} />
          <QualityTrend inView={inView} />
          <CategoryBreakdown inView={inView} />
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  suffix,
  prefix = '',
  color,
  bar,
  index,
  inView,
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  color: string;
  bar?: boolean;
  index: number;
  inView: boolean;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 1.6,
        delay: index * 0.08,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [inView, value, index, count]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl glass p-5"
    >
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-cyan-400/5 blur-2xl transition-opacity group-hover:bg-cyan-400/10" />
      <div className="mb-3 flex items-center justify-between">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/30">
          live
        </span>
      </div>
      <div className={`font-sans text-4xl font-bold tracking-tight ${color}`}>
        {prefix}
        {display}
        {suffix}
      </div>
      <p className="mt-1.5 text-xs leading-snug text-cyan-100/50">{label}</p>
      {bar && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${value}%` } : {}}
            transition={{ delay: 0.3 + index * 0.08, duration: 1.4, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-safe to-cyan-300"
          />
        </div>
      )}
    </motion.div>
  );
}

function RiskDistribution({ inView }: { inView: boolean }) {
  const data = [
    { label: 'Critical', value: 3, color: 'bg-danger' },
    { label: 'Warning', value: 17, color: 'bg-warn' },
    { label: 'Info', value: 28, color: 'bg-cyan-400' },
    { label: 'Safe', value: 142, color: 'bg-safe' },
  ];
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="rounded-2xl glass p-5">
      <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/50">
        Risk Distribution
      </h3>
      <div className="flex flex-col gap-3">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-3">
            <span className="w-14 font-mono text-[10px] text-cyan-100/50">
              {d.label}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-700">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${(d.value / max) * 100}%` } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 1.2, ease: 'easeOut' }}
                className={`h-full rounded-full ${d.color}`}
              />
            </div>
            <span className="w-8 text-right font-mono text-[10px] text-cyan-100/60">
              {d.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QualityTrend({ inView }: { inView: boolean }) {
  const points = [62, 68, 71, 75, 73, 82, 88, 85, 91, 95];
  const w = 200;
  const h = 80;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (p / 100) * h;
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');
  const area = `${path} L${w},${h} L0,${h} Z`;

  return (
    <div className="rounded-2xl glass p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/50">
          Quality Trend
        </h3>
        <span className="font-mono text-[10px] text-safe">+33%</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full">
        <defs>
          <linearGradient id="qgrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3dffb0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3dffb0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill="url(#qgrad)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="#3dffb0"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.6, ease: 'easeInOut' }}
        />
      </svg>
      <div className="mt-2 flex justify-between font-mono text-[9px] text-cyan-300/30">
        <span>Week 1</span>
        <span>Week 10</span>
      </div>
    </div>
  );
}

function CategoryBreakdown({ inView }: { inView: boolean }) {
  const cats = [
    { label: 'Piping', pct: 38, color: '#19e3ff' },
    { label: 'Structure', pct: 24, color: '#0086c0' },
    { label: 'Electrical', pct: 18, color: '#3dffb0' },
    { label: 'HVAC', pct: 12, color: '#ff9d3c' },
    { label: 'Process', pct: 8, color: '#ff4d5e' },
  ];
  let offset = 0;
  return (
    <div className="rounded-2xl glass p-5">
      <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/50">
        Issue Categories
      </h3>
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 36 36" className="h-24 w-24 -rotate-90">
          {cats.map((c, i) => {
            const dash = c.pct;
            const el = (
              <motion.circle
                key={c.label}
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke={c.color}
                strokeWidth="3"
                strokeDasharray={`${dash} ${100 - dash}`}
                strokeDashoffset={-offset}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
              />
            );
            offset += dash;
            return el;
          })}
        </svg>
        <div className="flex flex-col gap-1.5">
          {cats.map((c) => (
            <div key={c.label} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: c.color }}
              />
              <span className="font-mono text-[10px] text-cyan-100/50">
                {c.label}
              </span>
              <span className="font-mono text-[10px] text-cyan-100/70">
                {c.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
