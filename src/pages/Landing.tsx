import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Intro from '@/components/Intro';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import InteractiveDemo from '@/components/InteractiveDemo';
import AIThinking from '@/components/AIThinking';
import Dashboard from '@/components/Dashboard';
import DigitalTwinMode from '@/components/DigitalTwinMode';
import Industries from '@/components/Industries';
import Technology from '@/components/Technology';
import Contact from '@/components/Contact';
import ScrollProgress from '@/components/ScrollProgress';
import AmbientAudio from '@/components/AmbientAudio';
import TwinCanvas from '@/three/TwinCanvas';
import DigitalTwinScene from '@/three/DigitalTwinScene';

type TwinMode = 'holographic' | 'scan' | 'thermal' | 'stress' | 'flow' | 'grid';

export default function Landing() {
  const [introDone, setIntroDone] = useState(false);
  const [twinMode, setTwinMode] = useState<TwinMode>('holographic');

  // Scroll to top when intro finishes
  useEffect(() => {
    if (introDone) window.scrollTo({ top: 0 });
  }, [introDone]);

  return (
    <div id="top" className="relative min-h-screen bg-ink-950 text-cyan-50">
      <AnimatePresence>
        {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>

      {introDone && (
        <>
          <ScrollProgress />
          <Nav />
          <AmbientAudio />

          {/* Persistent 3D Digital Twin background canvas.
              Fixed behind all content, reacts to scroll + mode. */}
          <div className="fixed inset-0 z-0">
            <TwinCanvas
              enableControls={false}
              autoRotate
              cameraPosition={[7, 4.5, 10]}
              fov={50}
              className="h-full w-full"
            >
              <DigitalTwinScene
                holographic={twinMode === 'holographic'}
                thermal={twinMode === 'thermal'}
                stress={twinMode === 'stress'}
                flow={twinMode === 'flow' || twinMode === 'holographic'}
                scan={twinMode === 'scan' || twinMode === 'holographic'}
              />
            </TwinCanvas>
            {/* Vignette + readability overlays */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 0%, rgba(2,4,10,0.3) 60%, rgba(2,4,10,0.7) 100%)',
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950" />
          </div>

          {/* Content layers above the 3D background */}
          <main className="relative z-10">
            <Hero />
            <InteractiveDemo />
            <AIThinking />
            <Dashboard />
            <DigitalTwinMode mode={twinMode} setMode={setTwinMode} />
            <Industries />
            <Technology />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}