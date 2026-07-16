import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WeatherSystemProps {
  emergencyType: string;
}

export const WeatherSystem: React.FC<WeatherSystemProps> = ({ emergencyType }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 500;

  // Generate random rain particle coordinates
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vels = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spawn particles inside stadium radius (approx 30 units) and high up
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 26.0;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = 8.0 + Math.random() * 16.0; // Height between 8 and 24
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      vels[i] = 4.0 + Math.random() * 6.0; // Fall speed
    }
    return [pos, vels];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const delta = Math.min(state.clock.getDelta(), 0.1);
    
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    // Determine rain intensity based on active weather state
    const isRaining = emergencyType === 'none' || emergencyType === 'surge'; // Rain during ingress simulation
    const speedMultiplier = isRaining ? 1.0 : 0.0;

    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] -= velocities[i] * delta * speedMultiplier;
      
      // Reset rain drop if it hits the ground/stadium roof
      if (posArray[i * 3 + 1] < 0.2) {
        posArray[i * 3 + 1] = 20.0 + Math.random() * 4.0;
      }
    }

    posAttr.needsUpdate = true;
  });

  // If not raining (e.g. fire hazard or evacuation), don't show the rain points
  const showRain = emergencyType === 'none' || emergencyType === 'surge';
  if (!showRain) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#7dd3fc"
        size={0.06}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
};

export default WeatherSystem;
