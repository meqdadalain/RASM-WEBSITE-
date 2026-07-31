import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const [pct, setPct] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => setPct(Math.round(v * 100)));
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[95] h-0.5 w-full origin-left bg-gradient-to-r from-cyan-400 via-cyan-200 to-cyan-500"
      />
      <div className="fixed right-6 top-6 z-[95] hidden font-mono text-[10px] text-cyan-300/40 md:block">
        {String(pct).padStart(2, '0')}%
      </div>
    </>
  );
}
