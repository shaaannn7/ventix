import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AgentCrowdSimulation } from './AgentCrowdSimulation';

interface CrowdParticlesProps {
  densityFactor: number;
  heatmapActive: boolean;
  emergencyMode: boolean;
}

export const CrowdParticles: React.FC<CrowdParticlesProps> = ({
  densityFactor,
  heatmapActive,
  emergencyMode,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 600;

  // Instantiate the agent-based crowd simulator
  const simulation = React.useMemo(() => new AgentCrowdSimulation(count), []);

  // Initial position positions state (needed for buffer attribute initialization)
  const [initialPositions] = React.useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const pos = simulation.agents[i].position;
      arr[i * 3] = pos.x;
      arr[i * 3 + 1] = pos.y;
      arr[i * 3 + 2] = pos.z;
    }
    return arr;
  });

  // Assign agent colors based on their state/path profiles
  const [colors] = React.useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const rnd = Math.random();
      if (rnd > 0.88) {
        // Warning (Red)
        arr[i * 3] = 0.94; arr[i * 3 + 1] = 0.27; arr[i * 3 + 2] = 0.27;
      } else if (rnd > 0.78) {
        // Congestion (Amber)
        arr[i * 3] = 0.96; arr[i * 3 + 1] = 0.62; arr[i * 3 + 2] = 0.04;
      } else {
        // Nominal flow (Cyan)
        arr[i * 3] = 0.02; arr[i * 3 + 1] = 0.71; arr[i * 3 + 2] = 0.83;
      }
    }
    return arr;
  });

  // Update dynamic agent coordinates in the ThreeJS render tick loop
  useFrame((state) => {
    if (!pointsRef.current) return;
    const delta = Math.min(state.clock.getDelta(), 0.1); // Cap delta to prevent coordinate explosions

    // Advance agent simulation (Walking -> Sitting -> Cheering)
    simulation.update(delta * (densityFactor > 0 ? densityFactor : 0.2) * 8.0, emergencyMode);

    // Update point mesh position buffers
    const posAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = posAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const pos = simulation.agents[i].position;
      posArray[i * 3] = pos.x;
      posArray[i * 3 + 1] = pos.y;
      posArray[i * 3 + 2] = pos.z;
    }

    posAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={heatmapActive ? 0.24 : 0.15}
        vertexColors
        transparent
        opacity={heatmapActive ? 0.9 : 0.65}
        sizeAttenuation
      />
    </points>
  );
};

export default CrowdParticles;
