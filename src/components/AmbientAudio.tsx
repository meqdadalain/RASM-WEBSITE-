import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Subtle ambient industrial atmosphere generated with the Web Audio API.
 * No external files — synthesized low drone + occasional soft pulses.
 */
export default function AmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
      }
      return;
    }

    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    gainRef.current = master;

    // fade in
    master.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);

    // low drone — two detuned oscillators
    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 55;
    const drone2 = ctx.createOscillator();
    drone2.type = 'sine';
    drone2.frequency.value = 82.5;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.5;
    drone.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(master);
    drone.start();
    drone2.start();

    // slow LFO for breathing
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start();

    // occasional soft pulse
    const pulseTimer = setInterval(() => {
      if (!ctxRef.current) return;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 220 + Math.random() * 200;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      osc.connect(g);
      g.connect(master);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    }, 4000);

    return () => {
      clearInterval(pulseTimer);
      try {
        drone.stop();
        drone2.stop();
        lfo.stop();
      } catch {
        /* noop */
      }
    };
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((e) => !e)}
      className="fixed bottom-6 left-6 z-[95] flex h-10 w-10 items-center justify-center rounded-full glass text-cyan-200/70 transition-colors hover:text-cyan-100"
      aria-label={enabled ? 'Mute ambient sound' : 'Enable ambient sound'}
    >
      {enabled ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </button>
  );
}
