import {
  useRef,
  useState,
  type ReactNode,
  type ButtonHTMLAttributes,
} from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type MagneticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * 0.3);
    y.set(my * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 select-none';
  const styles =
    variant === 'primary'
      ? 'text-ink-950 bg-gradient-to-r from-cyan-200 to-cyan-400 hover:from-cyan-100 hover:to-cyan-300 glow-cyan'
      : 'text-cyan-100 glass hover:text-white';

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
      {...(rest as object)}
    >
      {children}
    </motion.button>
  );
}

export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/70">
      <span className="text-cyan-400/50">{index}</span>
      <span className="h-px w-8 bg-cyan-400/30" />
      <span>{children}</span>
    </div>
  );
}

export function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-300/50">
        Scroll to explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="h-8 w-px bg-gradient-to-b from-cyan-400/60 to-transparent"
      />
    </motion.div>
  );
}

/* Click-burst particle effect rendered into a shared layer */
const bursts: { id: number; x: number; y: number }[] = [];
let burstId = 0;

export function useClickBurst() {
  return (e: React.MouseEvent) => {
    bursts.push({ id: burstId++, x: e.clientX, y: e.clientY });
    window.dispatchEvent(
      new CustomEvent('rasm-burst', { detail: { x: e.clientX, y: e.clientY } }),
    );
  };
}

export function ClickBurstLayer() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  useRef(() => {
    const handler = (e: Event) => {
      const { x, y } = (e as CustomEvent).detail;
      setParticles((p) => [...p, { id: Date.now(), x, y }]);
      setTimeout(
        () => setParticles((p) => p.filter((pt) => pt.x !== x || pt.y !== y)),
        700,
      );
    };
    window.addEventListener('rasm-burst', handler);
    return () => window.removeEventListener('rasm-burst', handler);
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 2.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute"
          style={{ left: p.x, top: p.y }}
        >
          <div className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 blur-[2px]" />
        </motion.div>
      ))}
    </div>
  );
}
