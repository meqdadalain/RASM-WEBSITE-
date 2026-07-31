import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type IntroProps = {
  onComplete: () => void;
};

const PHASES = [
  { delay: 200, text: '' }, // black silence
  { delay: 1400, text: '' }, // point appears
  { delay: 3200, text: 'Engineering is becoming intelligent.' },
  { delay: 5400, text: 'The next engineer will not work alone.' },
  { delay: 7600, text: 'The next engineer will work with AI.' },
  { delay: 9800, text: '' }, // logo reveal
];

export default function Intro({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState(0);
  const [sentence, setSentence] = useState('');
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    PHASES.forEach((p, i) => {
      timers.push(
        window.setTimeout(() => {
          setPhase(i);
          if (p.text) {
            setSentence('');
            setShowLogo(false);
            setTimeout(() => setSentence(p.text), 100);
          }
          if (i === 4) {
            setTimeout(() => {
              setShowLogo(true);
              setSentence('');
            }, 1800);
          }
          if (i === PHASES.length - 1) {
            setTimeout(() => onComplete(), 2600);
          }
        }, p.delay),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const isBlack = phase <= 1;
  const isParticles = phase >= 1 && phase < 4;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink-950"
    >
      {/* Glowing point -> particle convergence */}
      <AnimatePresence>
        {isParticles && (
          <motion.div
            key="particles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <ParticleConvergence active={phase >= 2} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Central glow point */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isBlack ? 0 : 1,
          opacity: isBlack ? 0 : 1,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute h-2 w-2 rounded-full bg-cyan-200"
        style={{ boxShadow: '0 0 40px 10px rgba(25,227,255,0.6)' }}
      />

      {/* Sentences */}
      <AnimatePresence mode="wait">
        {sentence && !showLogo && (
          <motion.h1
            key={sentence}
            initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(12px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 px-6 text-center font-sans text-3xl font-light tracking-tight text-cyan-50 md:text-5xl lg:text-6xl"
          >
            {sentence}
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Logo reveal */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            <h1 className="font-sans text-7xl font-bold tracking-ultra gradient-text-warm text-glow md:text-9xl">
              RASM
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.5em] text-cyan-300/60 md:text-sm"
            >
              AI Design Intelligence
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/40 transition-colors hover:text-cyan-200"
      >
        Skip intro →
      </button>
    </motion.div>
  );
}

/* Particle convergence: dots fly inward then disperse */
function ParticleConvergence({ active }: { active: boolean }) {
  const dots = Array.from({ length: 80 }, (_, i) => i);
  return (
    <div className="relative h-full w-full">
      {dots.map((i) => {
        const angle = (i / dots.length) * Math.PI * 2;
        const dist = 40 + (i % 5) * 12;
        return (
          <motion.div
            key={i}
            initial={{
              x: `${Math.cos(angle) * dist}vw`,
              y: `${Math.sin(angle) * dist}vh`,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: active ? 0 : `${Math.cos(angle) * dist}vw`,
              y: active ? 0 : `${Math.sin(angle) * dist}vh`,
              opacity: active ? [0, 1, 0] : 0,
              scale: active ? [0, 1, 0] : 0,
            }}
            transition={{
              duration: 1.6,
              delay: (i % 10) * 0.04,
              ease: 'easeInOut',
            }}
            className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-cyan-300"
            style={{ boxShadow: '0 0 6px rgba(25,227,255,0.8)' }}
          />
        );
      })}
    </div>
  );
}
