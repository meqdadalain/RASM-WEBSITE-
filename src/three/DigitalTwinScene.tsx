import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural industrial Digital Twin built entirely from primitives.
 * Glowing blue wireframes with flowing energy, rotating machines,
 * spinning fans, blinking sensors, and travelling particles.
 * Designed to feel like an Iron Man HUD of a real plant.
 */

type TwinProps = {
  density?: number;
  holographic?: boolean;
  thermal?: boolean;
  stress?: boolean;
  flow?: boolean;
  scan?: boolean;
  reduced?: boolean;
};

const CYAN = new THREE.Color('#19e3ff');
const DEEP = new THREE.Color('#0066b0');
const RED = new THREE.Color('#ff4d5e');
const ORANGE = new THREE.Color('#ff9d3c');
const GREEN = new THREE.Color('#3dffb0');

function rand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/* A glowing edge material shared across wireframe parts */
function edgeMat(color: THREE.Color, opacity = 0.55) {
  return new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

/* ---------------- Pipe network ---------------- */
function PipeNetwork({ reduced }: { reduced?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const segments = useMemo(() => {
    const segs: {
      start: [number, number, number];
      end: [number, number, number];
      radius: number;
      flow: boolean;
    }[] = [];
    const count = reduced ? 10 : 22;
    for (let i = 0; i < count; i++) {
      const r = rand(i * 7.3);
      const sx = (rand(i * 1.1) - 0.5) * 9;
      const sy = rand(i * 2.3) * 5 - 1;
      const sz = (rand(i * 3.7) - 0.5) * 9;
      const len = 2 + r * 4;
      const dir = Math.floor(r * 3);
      const end: [number, number, number] =
        dir === 0
          ? [sx + len, sy, sz]
          : dir === 1
            ? [sx, sy + len, sz]
            : [sx, sy, sz + len];
      segs.push({ start: [sx, sy, sz], end, radius: 0.06 + r * 0.05, flow: r > 0.4 });
    }
    return segs;
  }, [reduced]);

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      if (segments[i]?.flow) {
        mat.opacity = 0.25 + Math.sin(performance.now() * 0.002 + i) * 0.15 + 0.2;
      }
    });
  });

  return (
    <group ref={group}>
      {segments.map((s, i) => {
        const start = new THREE.Vector3(...s.start);
        const end = new THREE.Vector3(...s.end);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const len = start.distanceTo(end);
        return (
          <mesh key={i} position={[mid.x, mid.y, mid.z]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[s.radius, s.radius, len, 8, 1, true]} />
            <meshBasicMaterial
              color={CYAN}
              wireframe
              transparent
              opacity={0.35}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ---------------- Tanks & vessels ---------------- */
function Tanks() {
  const tanks = useMemo(() => {
    const arr: { pos: [number, number, number]; r: number; h: number }[] = [];
    for (let i = 0; i < 5; i++) {
      const r = 0.6 + rand(i * 5.1) * 0.7;
      arr.push({
        pos: [
          (rand(i * 2.2) - 0.5) * 8,
          r - 0.5,
          (rand(i * 4.4) - 0.5) * 8,
        ],
        r,
        h: 1.6 + rand(i * 6.6) * 1.4,
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {tanks.map((t, i) => (
        <group key={i} position={t.pos}>
          <mesh>
            <cylinderGeometry args={[t.r, t.r, t.h, 16, 1, true]} />
            <meshBasicMaterial
              color={CYAN}
              wireframe
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          {/* dome */}
          <mesh position={[0, t.h / 2 + t.r * 0.3, 0]}>
            <sphereGeometry args={[t.r, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshBasicMaterial
              color={DEEP}
              wireframe
              transparent
              opacity={0.25}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------------- Rotating machines ---------------- */
function Machines() {
  const fans = useRef<THREE.Group>(null);
  const rotors = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (fans.current) fans.current.rotation.z += dt * 1.2;
    if (rotors.current) rotors.current.rotation.y += dt * 0.8;
  });

  return (
    <group>
      {/* Fan unit */}
      <group position={[3.2, 1.4, -2.5]}>
        <mesh>
          <torusGeometry args={[0.5, 0.05, 8, 24]} />
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.4} />
        </mesh>
        <group ref={fans}>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]}>
              <boxGeometry args={[0.9, 0.08, 0.12]} />
              <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.5} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Rotor / pump */}
      <group position={[-3, 0.6, 2.8]}>
        <mesh>
          <cylinderGeometry args={[0.45, 0.45, 0.5, 12, 1, true]} />
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.35} />
        </mesh>
        <group ref={rotors} position={[0, 0, 0]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
              <boxGeometry args={[0.7, 0.04, 0.2]} />
              <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.5} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

/* ---------------- Steel structure lattice ---------------- */
function Structure() {
  const beams = useMemo(() => {
    const arr: { pos: [number, number, number]; size: [number, number, number] }[] = [];
    // base platform
    for (let i = -4; i <= 4; i += 2) {
      arr.push({ pos: [i, -1.6, 0], size: [0.08, 0.08, 8] });
      arr.push({ pos: [0, -1.6, i], size: [8, 0.08, 0.08] });
    }
    // vertical columns
    for (const x of [-4, -2, 0, 2, 4]) {
      for (const z of [-4, 0, 4]) {
        arr.push({ pos: [x, 0, z], size: [0.1, 3, 0.1] });
      }
    }
    // cross braces
    for (const x of [-4, 0, 4]) {
      arr.push({ pos: [x, 0.5, 4], size: [0.05, 0.05, 5.7] });
    }
    return arr;
  }, []);

  return (
    <group>
      {beams.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <boxGeometry args={b.size} />
          <meshBasicMaterial
            color={DEEP}
            wireframe
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- Blinking sensors ---------------- */
function Sensors() {
  const group = useRef<THREE.Group>(null);
  const sensors = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        pos: [
          (rand(i * 3.3) - 0.5) * 8,
          rand(i * 7.7) * 3,
          (rand(i * 9.9) - 0.5) * 8,
        ] as [number, number, number],
        phase: rand(i * 11.1) * Math.PI * 2,
      })),
    [],
  );

  useFrame(() => {
    if (!group.current) return;
    const t = performance.now() * 0.003;
    group.current.children.forEach((c, i) => {
      const m = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
      m.opacity = 0.3 + Math.abs(Math.sin(t + sensors[i].phase)) * 0.7;
    });
  });

  return (
    <group ref={group}>
      {sensors.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color={i % 4 === 0 ? ORANGE : CYAN}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- Travelling particles along network ---------------- */
function FlowParticles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand(i) - 0.5) * 9;
      positions[i * 3 + 1] = rand(i * 2) * 4;
      positions[i * 3 + 2] = (rand(i * 3) - 0.5) * 9;
      seeds[i] = rand(i * 5);
    }
    return { positions, seeds };
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const t = performance.now() * 0.0004;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] = ((arr[i * 3 + 1] + 0.02 + seeds[i] * 0.01) % 5) - 1;
      arr[i * 3] += Math.sin(t + seeds[i] * 10) * 0.005;
    }
    pos.needsUpdate = true;
  });

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
        color={CYAN}
        size={0.06}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------------- Holographic scan plane ---------------- */
function ScanPlane() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    const t = (performance.now() % 4000) / 4000;
    ref.current.position.y = -2 + t * 6;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      Math.sin(t * Math.PI) * 0.3;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[16, 16]} />
      <meshBasicMaterial
        color={CYAN}
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ---------------- Highlighted issue markers ---------------- */
function IssueMarkers() {
  const group = useRef<THREE.Group>(null);
  const issues = useMemo(
    () => [
      { pos: [2.4, 1.2, 1.5] as [number, number, number], type: 'critical' },
      { pos: [-1.8, 0.8, -2.2] as [number, number, number], type: 'warning' },
      { pos: [0.5, 2.2, 3.0] as [number, number, number], type: 'warning' },
      { pos: [-3.2, 1.6, 1.0] as [number, number, number], type: 'safe' },
    ],
    [],
  );

  useFrame(() => {
    if (!group.current) return;
    group.current.children.forEach((c) => {
      c.rotation.y += 0.01;
      const mesh = c.children[0] as THREE.Mesh;
      const s = 1 + Math.sin(performance.now() * 0.004) * 0.15;
      mesh.scale.setScalar(s);
    });
  });

  const colorFor = (t: string) =>
    t === 'critical' ? RED : t === 'warning' ? ORANGE : GREEN;

  return (
    <group ref={group}>
      {issues.map((iss, i) => (
        <group key={i} position={iss.pos}>
          <mesh>
            <ringGeometry args={[0.25, 0.3, 32]} />
            <meshBasicMaterial
              color={colorFor(iss.type)}
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------------- Main exported scene ---------------- */
export default function DigitalTwinScene({
  density = 1,
  holographic = false,
  thermal = false,
  stress = false,
  flow = true,
  scan = false,
  reduced = false,
}: TwinProps) {
  const root = useRef<THREE.Group>(null);
  const { gl } = useThree();

  useMemo(() => {
    gl.setClearColor(new THREE.Color('#02040a'), 1);
  }, [gl]);

  useFrame((_, dt) => {
    if (root.current) root.current.rotation.y += dt * 0.04;
  });

  const baseColor = thermal ? RED : stress ? ORANGE : CYAN;

  return (
    <group ref={root}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 8, 5]} intensity={0.6} color={CYAN} />
      <Structure />
      <PipeNetwork reduced={reduced} />
      <Tanks />
      <Machines />
      <Sensors />
      {flow && <FlowParticles count={reduced ? 30 : 70} />}
      {scan && <ScanPlane />}
      <IssueMarkers />
      {holographic && <ScanPlane />}

      {/* ground glow disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.7, 0]}>
        <ringGeometry args={[5, 6.5, 64]} />
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export { edgeMat, CYAN, DEEP, RED, ORANGE, GREEN };
