import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParkingGridProps {
  predictionOffset: number;
  emergencyType: string;
}

export const ParkingGrid: React.FC<ParkingGridProps> = ({ predictionOffset, emergencyType }) => {
  const carsRef = useRef<THREE.Group>(null);

  // Generate coordinate grid for 3D parking lot outside the stadium (North-West corner)
  const parkingSpots = useMemo(() => {
    const spots: { position: [number, number, number]; occupied: boolean }[] = [];
    const baseNorthX = -32;
    const baseNorthZ = -32;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        // Space columns and rows
        const x = baseNorthX - row * 1.5;
        const z = baseNorthZ + col * 1.2;
        
        // Randomly determine occupancy based on prediction offset (more cars arrive over time)
        const occupancyThreshold = 0.4 + (predictionOffset / 30) * 0.45; // 40% -> 85% full
        spots.push({
          position: [x, 0.05, z],
          occupied: Math.random() < occupancyThreshold,
        });
      }
    }
    return spots;
  }, [predictionOffset]);

  // Animate cars exiting during an active evacuation
  useFrame((state) => {
    if (!carsRef.current || emergencyType !== 'evacuation') return;
    const elapsed = state.clock.getElapsedTime();
    
    // Smoothly slide cars outwards along X/Z paths
    carsRef.current.children.forEach((carChild, idx) => {
      const dir = idx % 2 === 0 ? 1 : -1;
      carChild.position.x += dir * 0.05 * Math.sin(elapsed * 2.0);
    });
  });

  return (
    <group ref={carsRef}>
      {/* Draw parking tarmac bay lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-34.5, 0.01, -28.0]}>
        <planeGeometry args={[6, 12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Render 3D miniature vehicle blocks */}
      {parkingSpots.map((spot, idx) => {
        if (!spot.occupied) return null;
        
        // Pick a dynamic car color
        const carColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#f8fafc', '#64748b'];
        const color = carColors[idx % carColors.length];

        return (
          <group key={idx} position={spot.position}>
            {/* Main chassis block */}
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[1.0, 0.15, 0.6]} />
              <meshStandardMaterial color={color} roughness={0.4} metalness={0.8} />
            </mesh>
            {/* Top cabin block */}
            <mesh position={[-0.1, 0.22, 0]}>
              <boxGeometry args={[0.5, 0.12, 0.55]} />
              <meshStandardMaterial color="#0f172a" roughness={0.1} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default ParkingGrid;
