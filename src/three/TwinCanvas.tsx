import { Suspense, useRef, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
  children: ReactNode;
  enableControls?: boolean;
  autoRotate?: boolean;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
};

export default function TwinCanvas({
  children,
  enableControls = true,
  autoRotate = true,
  cameraPosition = [6, 4, 9],
  fov = 45,
  className,
}: Props) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#02040a'), 0);
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />
          {children}
          {enableControls && (
            <OrbitControls
              enablePan={false}
              enableZoom
              minDistance={5}
              maxDistance={18}
              autoRotate={autoRotate}
              autoRotateSpeed={0.4}
              enableDamping
              dampingFactor={0.08}
            />
          )}
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* Lightweight particle field for intro / backgrounds */
export function ParticleField({
  count = 1200,
  radius = 14,
  color = '#19e3ff',
}: {
  count?: number;
  radius?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.03}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
