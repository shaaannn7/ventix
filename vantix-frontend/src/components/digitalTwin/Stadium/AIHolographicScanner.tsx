import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AIHolographicScannerProps {
  emergencyType: string;
}

export const AIHolographicScanner: React.FC<AIHolographicScannerProps> = ({ emergencyType }) => {
  const scannersRef = useRef<THREE.Group>(null);

  // Four main Gate entrances coordinates
  const gateCoords: [number, number, number][] = [
    [0, 3.5, -22],  // Gate A
    [22, 3.5, 0],   // Gate B
    [0, 3.5, 22],   // Gate C
    [-22, 3.5, 0],  // Gate D
  ];

  // Rotate/oscillate scanning cones in the render loop
  useFrame((state) => {
    if (!scannersRef.current) return;
    const elapsed = state.clock.getElapsedTime();

    scannersRef.current.children.forEach((child, idx) => {
      // Stagger rotations using index
      const speed = 1.2 + idx * 0.15;
      child.rotation.y = Math.sin(elapsed * speed) * 0.25;
      child.rotation.z = Math.cos(elapsed * speed * 0.8) * 0.12;

      // Pulse opacity dynamically to show active AI checking
      const materials = (child.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial;
      if (materials) {
        materials.opacity = 0.12 + Math.sin(elapsed * 4.0 + idx) * 0.06;
      }
    });
  });

  // Green flashing for evacuations, red for fire alerts, purple for general checkin
  const scanColor = emergencyType === 'evacuation' 
    ? '#10b981' 
    : emergencyType === 'fire' 
    ? '#ef4444' 
    : '#a855f7';

  return (
    <group ref={scannersRef}>
      {gateCoords.map((coord, idx) => (
        <group key={idx} position={coord}>
          {/* Scanning Cone pointing downward */}
          <mesh rotation={[Math.PI, 0, 0]} position={[0, -1.8, 0]}>
            <coneGeometry args={[1.5, 3.6, 16, 1, true]} />
            <meshBasicMaterial 
              color={scanColor} 
              transparent 
              opacity={0.15} 
              side={THREE.DoubleSide} 
              depthWrite={false}
            />
          </mesh>

          {/* Core laser dot anchor at the base */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshBasicMaterial color={scanColor} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default AIHolographicScanner;
