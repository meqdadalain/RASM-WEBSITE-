import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder,
  FileBox,
  Layers,
  Search,
  Send,
  Cpu,
  Network,
  GitBranch,
  ScanLine,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Gauge,
} from 'lucide-react';
import { SectionLabel } from './ui/MagneticButton';

const PROJECT_FILES = [
  { name: 'WaterTreatment.ifc', size: '24.6 MB', active: true },
  { name: 'PumpStation-A.rvt', size: '18.2 MB' },
  { name: 'PipeNetwork.dwg', size: '9.4 MB' },
  { name: 'Structural.ifc', size: '31.1 MB' },
  { name: 'Electrical.dgn', size: '12.7 MB' },
];

const REASONING_STEPS = [
  'Reading geometry…',
  'Building topology graph…',
  'Understanding relationships…',
  'Recognizing equipment…',
  'Matching engineering standards…',
  'Comparing design intent…',
  'Detecting risks…',
  'Running clash analysis…',
  'Estimating constructability…',
  'Predicting maintenance issues…',
  'Generating engineering insights…',
];

const ISSUES = [
  {
    icon: Wrench,
    severity: 'critical',
    title: 'Maintenance clearance violation',
    detail:
      'This pipe violates the minimum maintenance clearance. A 600 mm corridor is required; only 180 mm is present.',
    confidence: 98,
  },
  {
    icon: Gauge,
    severity: 'warning',
    title: 'Valve inoperable',
    detail:
      'This valve cannot be operated. The handwheel is obstructed by an adjacent structural member.',
    confidence: 91,
  },
  {
    icon: AlertTriangle,
    severity: 'warning',
    title: 'Maintenance corridor blocked',
    detail:
      'The maintenance corridor is blocked by an unplanned cable tray routed through the access zone.',
    confidence: 87,
  },
  {
    icon: ScanLine,
    severity: 'critical',
    title: 'Pressure sensor inaccessible',
    detail:
      'The pressure sensor is inaccessible. It is mounted at 4.8 m with no platform or access ladder.',
    confidence: 95,
  },
  {
    icon: CheckCircle2,
    severity: 'safe',
    title: 'BIM model matches specification',
    detail:
      'The BIM model matches the engineering specification for the primary treatment train.',
    confidence: 99,
  },
];

type Phase = 'idle' | 'dragging' | 'absorbing' | 'thinking' | 'results';

export default function InteractiveDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [activeStep, setActiveStep] = useState(0);
  const [activeIssue, setActiveIssue] = useState(0);
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const launch = () => {
    clearTimers();
    setPhase('dragging');
    timers.current.push(window.setTimeout(() => setPhase('absorbing'), 1400));
    timers.current.push(window.setTimeout(() => setPhase('thinking'), 2600));
  };

  // AI thinking progression
  useEffect(() => {
    if (phase !== 'thinking') return;
    setActiveStep(0);
    setProgress(0);
    let step = 0;
    const stepTimer = setInterval(() => {
      step += 1;
      setActiveStep(step);
      if (step >= REASONING_STEPS.length) {
        clearInterval(stepTimer);
        timers.current.push(window.setTimeout(() => setPhase('results'), 600));
      }
    }, 520);
    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 2.2));
    }, 50);
    return () => {
      clearInterval(stepTimer);
      clearInterval(progTimer);
    };
  }, [phase]);

  // Auto-cycle issues in results
  useEffect(() => {
    if (phase !== 'results') return;
    const t = setInterval(() => {
      setActiveIssue((i) => (i + 1) % ISSUES.length);
    }, 4200);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => () => clearTimers(), []);

  return (
    <section id="demo" className="relative min-h-screen w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-4">
          <SectionLabel index="01">Interactive Platform</SectionLabel>
          <h2 className="max-w-3xl font-sans text-4xl font-bold tracking-tight text-cyan-50 md:text-6xl">
            Step inside the <span className="gradient-text">engineering platform</span>
          </h2>
          <p className="max-w-2xl text-lg font-light text-cyan-100/60">
            Drag an industrial model into RASM. Watch it understand the geometry,
            reason through engineering rules, and surface every risk — in real time.
          </p>
        </div>

        {/* Launch trigger when idle */}
        <AnimatePresence>
          {phase === 'idle' && (
            <motion.div
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col items-center gap-6 py-20"
            >
              <button
                onClick={launch}
                className="group relative flex h-40 w-40 items-center justify-center rounded-full"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/20" />
                <span className="absolute inset-4 rounded-full border border-cyan-400/30" />
                <span className="absolute inset-8 rounded-full border border-cyan-400/20" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-cyan-500 text-ink-950 glow-cyan transition-transform group-hover:scale-110">
                  <Cpu className="h-8 w-8" />
                </span>
              </button>
              <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-200/70">
                Press to Launch RASM
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Platform UI */}
        <AnimatePresence>
          {phase !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <PlatformShell
                phase={phase}
                activeStep={activeStep}
                progress={progress}
                activeIssue={activeIssue}
                onRelaunch={launch}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------------- Platform Shell ---------------- */
function PlatformShell({
  phase,
  activeStep,
  progress,
  activeIssue,
  onRelaunch,
}: {
  phase: Phase;
  activeStep: number;
  progress: number;
  activeIssue: number;
  onRelaunch: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl glass-strong p-2">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-danger/70" />
          <span className="h-3 w-3 rounded-full bg-warn/70" />
          <span className="h-3 w-3 rounded-full bg-safe/70" />
          <span className="ml-3 font-mono text-[11px] text-cyan-200/50">
            rasm://platform/water-treatment-plant
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/40">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-safe animate-pulse" />
            Engine online
          </span>
        </div>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-12 gap-2">
        {/* Left: Project Explorer */}
        <div className="col-span-12 rounded-2xl glass p-4 md:col-span-3">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/50">
            <Folder className="h-3.5 w-3.5" /> Project Explorer
          </div>
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-ink-800/60 px-2.5 py-2">
            <Search className="h-3.5 w-3.5 text-cyan-300/40" />
            <input
              placeholder="Search models…"
              className="w-full bg-transparent text-xs text-cyan-100/70 placeholder:text-cyan-300/30 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            {PROJECT_FILES.map((f, i) => (
              <div
                key={f.name}
                className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors ${
                  i === 0
                    ? 'bg-cyan-400/10 ring-1 ring-cyan-400/30'
                    : 'hover:bg-cyan-400/5'
                }`}
              >
                <FileBox
                  className={`h-4 w-4 ${i === 0 ? 'text-cyan-300' : 'text-cyan-300/40'}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-cyan-100/80">{f.name}</p>
                  <p className="font-mono text-[10px] text-cyan-300/40">{f.size}</p>
                </div>
                {i === 0 && (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-cyan-400/10 pt-3">
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/50">
              <Layers className="h-3.5 w-3.5" /> Layers
            </div>
            {['Piping', 'Structure', 'Electrical', 'HVAC'].map((l, i) => (
              <div
                key={l}
                className="flex items-center gap-2 py-1.5 text-xs text-cyan-100/60"
              >
                <span
                  className={`h-2 w-2 rounded-sm ${i === 0 ? 'bg-cyan-300' : 'bg-cyan-300/20'}`}
                />
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Center: 3D Viewer */}
        <div className="relative col-span-12 min-h-[420px] overflow-hidden rounded-2xl glass md:col-span-6">
          {/* The global 3D canvas shows through; we overlay HUD elements */}
          <div className="pointer-events-none absolute inset-0">
            {/* Drag/absorb animation */}
            <AnimatePresence>
              {phase === 'dragging' && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 40 }}
                  exit={{ opacity: 0, y: 120, scale: 0.5 }}
                  transition={{ duration: 1.4, ease: 'easeIn' }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex flex-col items-center gap-2 rounded-xl glass-strong px-6 py-4">
                    <FileBox className="h-10 w-10 text-cyan-300" />
                    <span className="font-mono text-xs text-cyan-100">
                      WaterTreatment.ifc
                    </span>
                  </div>
                </motion.div>
              )}
              {phase === 'absorbing' && (
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 0.2 }}
                  transition={{ duration: 1 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="h-32 w-32 rounded-full border-2 border-cyan-300/40">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-full w-full rounded-full border-t-2 border-cyan-300"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thinking overlay */}
            <AnimatePresence>
              {phase === 'thinking' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-ink-950/60 backdrop-blur-sm"
                >
                  <NeuralViz activeStep={activeStep} />
                  <div className="mt-6 w-full max-w-xs px-8">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-ink-700">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-cyan-200"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-center font-mono text-[10px] text-cyan-300/50">
                      {progress.toFixed(0)}% · {activeStep}/{REASONING_STEPS.length}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results HUD overlay */}
            {phase === 'results' && (
              <ResultsHud activeIssue={activeIssue} />
            )}

            {/* Corner HUD frame */}
            <div className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/40">
              3D Viewer · Live
            </div>
            <div className="absolute right-3 top-3 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/40">
              {phase === 'results' ? 'Analysis complete' : 'Scanning…'}
            </div>
            <div className="absolute bottom-3 left-3 font-mono text-[9px] text-cyan-300/30">
              47.382°N · 8.539°E
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-[9px] text-cyan-300/30">
              1:200 · ISO-16739
            </div>
          </div>
        </div>

        {/* Right: AI Assistant */}
        <div className="col-span-12 rounded-2xl glass p-4 md:col-span-3">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/50">
            <Cpu className="h-3.5 w-3.5" /> AI Assistant
          </div>

          {phase !== 'results' ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-12 w-12 items-center justify-center rounded-full glass"
              >
                <Cpu className="h-5 w-5 text-cyan-300" />
              </motion.div>
              <p className="font-mono text-[11px] text-cyan-300/50">
                {phase === 'thinking'
                  ? REASONING_STEPS[Math.min(activeStep, REASONING_STEPS.length - 1)]
                  : 'Awaiting model…'}
              </p>
            </div>
          ) : (
            <IssuePanel activeIssue={activeIssue} />
          )}
        </div>

        {/* Bottom: Timeline */}
        <div className="col-span-12 rounded-2xl glass px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/50">
              Timeline
            </span>
            <button
              onClick={onRelaunch}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/50 transition-colors hover:text-cyan-200"
            >
              ↻ Re-run analysis
            </button>
          </div>
          <div className="flex items-center gap-1">
            {REASONING_STEPS.map((s, i) => {
              const done = phase === 'results' || (phase === 'thinking' && i < activeStep);
              const current = phase === 'thinking' && i === activeStep;
              return (
                <div key={i} className="group relative flex-1">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      done
                        ? 'bg-cyan-300'
                        : current
                          ? 'bg-cyan-400/60 animate-pulse'
                          : 'bg-ink-700'
                    }`}
                  />
                  <span className="pointer-events-none absolute -top-7 left-0 whitespace-nowrap font-mono text-[9px] text-cyan-300/0 transition-colors group-hover:text-cyan-300/60">
                    {s.replace('…', '')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Neural reasoning viz ---------------- */
function NeuralViz({ activeStep }: { activeStep: number }) {
  const nodes = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 160,
      r: 3 + Math.random() * 4,
    })),
  ).current;

  return (
    <div className="relative h-48 w-72">
      <svg className="absolute inset-0 h-full w-full" viewBox="-110 -80 220 160">
        {/* connections */}
        {nodes.map((n, i) =>
          nodes.slice(i + 1).map((m, j) => {
            const dist = Math.hypot(n.x - m.x, n.y - m.y);
            if (dist > 70) return null;
            return (
              <line
                key={`${i}-${j}`}
                x1={n.x}
                y1={n.y}
                x2={m.x}
                y2={m.y}
                stroke="rgba(25,227,255,0.15)"
                strokeWidth={0.5}
              />
            );
          }),
        )}
        {/* nodes */}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={i < activeStep * 1.6 ? '#19e3ff' : '#0a3550'}
            animate={{
              opacity: i < activeStep * 1.6 ? [0.5, 1, 0.5] : 0.3,
              r: i < activeStep * 1.6 ? [n.r, n.r + 2, n.r] : n.r,
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
        {/* flowing pulses */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.circle
            key={`p-${i}`}
            r={2}
            fill="#8ee9ff"
            animate={{
              cx: [nodes[i * 3 % nodes.length].x, nodes[(i * 3 + 5) % nodes.length].x],
              cy: [nodes[i * 3 % nodes.length].y, nodes[(i * 3 + 5) % nodes.length].y],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-cyan-300/60">
        neural reasoning · layer {Math.min(activeStep, 11)}
      </div>
    </div>
  );
}

/* ---------------- Results HUD on 3D viewer ---------------- */
function ResultsHud({ activeIssue }: { activeIssue: number }) {
  const issue = ISSUES[activeIssue];
  const color =
    issue.severity === 'critical'
      ? 'text-danger'
      : issue.severity === 'warning'
        ? 'text-warn'
        : 'text-safe';
  return (
    <motion.div
      key={activeIssue}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0"
    >
      {/* crosshair on issue */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className={`relative h-24 w-24`}>
          <div className={`absolute inset-0 rounded-full border ${color} border-opacity-40`} />
          <div className={`absolute inset-3 rounded-full border ${color} border-opacity-60 animate-pulse`} />
          <div className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 ${color} opacity-30`} />
          <div className={`absolute top-1/2 left-0 h-px w-full -translate-y-1/2 ${color} opacity-30`} />
        </div>
      </motion.div>
      {/* severity tag */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`absolute left-1/2 top-6 -translate-x-1/2 rounded-full glass-strong px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${color}`}
      >
        {issue.severity} · {issue.confidence}% confidence
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Issue panel in AI Assistant ---------------- */
function IssuePanel({ activeIssue }: { activeIssue: number }) {
  const issue = ISSUES[activeIssue];
  const Icon = issue.icon;
  const color =
    issue.severity === 'critical'
      ? 'text-danger'
      : issue.severity === 'warning'
        ? 'text-warn'
        : 'text-safe';
  const ring =
    issue.severity === 'critical'
      ? 'ring-danger/30'
      : issue.severity === 'warning'
        ? 'ring-warn/30'
        : 'ring-safe/30';

  return (
    <div className="flex flex-col gap-3">
      {/* Issue list */}
      <div className="flex flex-col gap-1.5">
        {ISSUES.map((iss, i) => {
          const I = iss.icon;
          const c =
            iss.severity === 'critical'
              ? 'text-danger'
              : iss.severity === 'warning'
                ? 'text-warn'
                : 'text-safe';
          return (
            <button
              key={i}
              onClick={() => {}}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors ${
                i === activeIssue ? 'glass-strong' : 'hover:bg-cyan-400/5'
              }`}
            >
              <I className={`h-3.5 w-3.5 ${c}`} />
              <span className="flex-1 truncate text-[11px] text-cyan-100/70">
                {iss.title}
              </span>
              <span className={`font-mono text-[9px] ${c}`}>{iss.confidence}%</span>
            </button>
          );
        })}
      </div>

      {/* Active issue detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIssue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className={`rounded-xl glass p-3 ring-1 ${ring}`}
        >
          <div className="mb-2 flex items-center gap-2">
            <Icon className={`h-4 w-4 ${color}`} />
            <span className="text-xs font-medium text-cyan-100">{issue.title}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-cyan-100/60">
            {issue.detail}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/40">
              Confidence
            </span>
            <div className="flex items-center gap-2">
              <div className="h-1 w-16 overflow-hidden rounded-full bg-ink-700">
                <div
                  className={`h-full ${color.replace('text-', 'bg-')}`}
                  style={{ width: `${issue.confidence}%` }}
                />
              </div>
              <span className={`font-mono text-[10px] ${color}`}>
                {issue.confidence}%
              </span>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-ink-800/50 p-2.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/40">
              Suggested correction
            </p>
            <p className="mt-1 text-[11px] text-cyan-100/70">
              {issue.severity === 'safe'
                ? 'No action required. Model is compliant.'
                : 'Reroute component to restore required clearance and revalidate against ISO-16739.'}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Input */}
      <div className="flex items-center gap-2 rounded-xl glass px-3 py-2.5">
        <input
          placeholder="Ask RASM…"
          className="w-full bg-transparent text-xs text-cyan-100/80 placeholder:text-cyan-300/30 focus:outline-none"
        />
        <Send className="h-3.5 w-3.5 text-cyan-300/40" />
      </div>
    </div>
  );
}
