import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function createMinecraftTexture(seed: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const colors = [
    '#0a0a0f', '#0d0d18', '#111122', '#161630',
    '#1a1a3a', '#0f3460', '#16477a', '#2563eb',
    '#4a9eff', '#6db5ff', '#3d8bff', '#1e3a5f',
  ];

  const pixelSize = 8;
  let rng = seed;
  const random = () => {
    rng = (rng * 9301 + 49297) % 233280;
    return rng / 233280;
  };

  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, 64, 64);

  for (let y = 0; y < 64; y += pixelSize) {
    for (let x = 0; x < 64; x += pixelSize) {
      const r = random();
      let idx: number;
      if (r < 0.28) idx = 0;
      else if (r < 0.45) idx = 1;
      else if (r < 0.58) idx = 2;
      else if (r < 0.68) idx = 3;
      else if (r < 0.76) idx = 4;
      else if (r < 0.83) idx = 5;
      else if (r < 0.89) idx = 6;
      else if (r < 0.93) idx = 10;
      else if (r < 0.96) idx = 8;
      else if (r < 0.98) idx = 9;
      else idx = 7;

      ctx.fillStyle = colors[idx];
      ctx.fillRect(x, y, pixelSize, pixelSize);

      if (random() < 0.12) {
        ctx.fillStyle = colors[Math.min(colors.length - 1, idx + 1)];
        ctx.fillRect(x, y, pixelSize / 2, pixelSize / 2);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
}

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const baseY = useRef(0);

  const texture = useMemo(
    () => [createMinecraftTexture(42), createMinecraftTexture(137), createMinecraftTexture(269), createMinecraftTexture(851), createMinecraftTexture(991), createMinecraftTexture(333)],
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = baseY.current + Math.sin(state.clock.elapsedTime * 0.8) * 0.25;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2.6, 2.6, 2.6]} />
        {texture.map((tex, i) => (
          <meshStandardMaterial key={i} attach={`material-${i}`} map={tex} />
        ))}
      </mesh>
    </group>
  );
}

export function MinecraftCube() {
  return (
    <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <pointLight position={[-5, -3, 3]} intensity={0.4} color="#4a9eff" />
        <pointLight position={[3, 4, -2]} intensity={0.2} color="#2563eb" />
        <FloatingCube />
        <OrbitControls
          enableZoom={false}
          enablePan={true}
          panSpeed={0.4}
          rotateSpeed={0.6}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
      </Canvas>
    </div>
  );
}
