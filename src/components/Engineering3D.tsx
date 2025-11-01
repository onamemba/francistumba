import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Simple 3D Engineering Gadget Component
function EngineeringGadget() {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Auto-rotate slowly
      if (!hovered) {
        meshRef.current.rotation.y += 0.005;
      } else {
        // Slight tilt on hover
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main body - cylindrical gear */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.3, 16]} />
        <meshStandardMaterial color="#4a90e2" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Gear teeth */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 16) * Math.PI * 2) * 1.1,
            0,
            Math.sin((i / 16) * Math.PI * 2) * 1.1
          ]}
          rotation={[0, (i / 16) * Math.PI * 2, 0]}
        >
          <boxGeometry args={[0.1, 0.3, 0.2]} />
          <meshStandardMaterial color="#357abd" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      
      {/* Center hub */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 8]} />
        <meshStandardMaterial color="#2c5aa0" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Side connectors */}
      <mesh position={[0, 0, 0.25]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 6]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, -0.25]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 6]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

const Engineering3D: React.FC = () => {
  return (
    <div className="engineering-3d-container">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#4a90e2" />
        
        <EngineeringGadget />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default Engineering3D;