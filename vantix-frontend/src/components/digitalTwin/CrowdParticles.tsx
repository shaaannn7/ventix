import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AgentCrowdSimulation } from './AgentCrowdSimulation';

interface CrowdParticlesProps {
  densityFactor: number;
  heatmapActive: boolean;
  emergencyMode: boolean;
  predictionOffset: number;
}

export const CrowdParticles: React.FC<CrowdParticlesProps> = ({
  densityFactor,
  heatmapActive,
  emergencyMode,
  predictionOffset,
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

  // Assign agent default colors based on their state/path profiles
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

  // Update dynamic agent coordinates and colors in the render tick loop
  useFrame((state) => {
    if (!pointsRef.current) return;
    const delta = Math.min(state.clock.getDelta(), 0.1);

    // Update agent movement simulation parameters (deltaTime, emergencyMode, predictionOffset)
    simulation.update(delta * (densityFactor > 0 ? densityFactor : 0.2) * 5.0, emergencyMode, predictionOffset);

    // Update point mesh position buffers
    const posAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = posAttribute.array as Float32Array;

    const colorAttribute = pointsRef.current.geometry.attributes.color;
    const colorArray = colorAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const agent = simulation.agents[i];
      const pos = agent.position;
      posArray[i * 3] = pos.x;
      posArray[i * 3 + 1] = pos.y;
      posArray[i * 3 + 2] = pos.z;

      // Dynamically calculate colors if density heatmap mode is active
      if (heatmapActive) {
        if (agent.progress < 0.25) {
          // Congested check-in queue zone (High density red)
          colorArray[i * 3] = 0.94; // R
          colorArray[i * 3 + 1] = 0.27; // G
          colorArray[i * 3 + 2] = 0.27; // B
        } else if (agent.progress < 0.65) {
          // Corridor flow zone (Medium density yellow)
          colorArray[i * 3] = 0.96; // R
          colorArray[i * 3 + 1] = 0.8; // G
          colorArray[i * 3 + 2] = 0.04; // B
        } else {
          // Seated area zone (Low density green/blue)
          colorArray[i * 3] = 0.1; // R
          colorArray[i * 3 + 1] = 0.73; // G
          colorArray[i * 3 + 2] = 0.35; // B
        }
      } else {
        // Reset to default static flow colors (original profile)
        const rnd = (i % 10) / 10;
        if (rnd > 0.88) {
          colorArray[i * 3] = 0.94; colorArray[i * 3 + 1] = 0.27; colorArray[i * 3 + 2] = 0.27;
        } else if (rnd > 0.78) {
          colorArray[i * 3] = 0.96; colorArray[i * 3 + 1] = 0.62; colorArray[i * 3 + 2] = 0.04;
        } else {
          colorArray[i * 3] = 0.02; colorArray[i * 3 + 1] = 0.71; colorArray[i * 3 + 2] = 0.83;
        }
      }
    }

    posAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={heatmapActive ? 0.35 : 0.16}
        vertexColors
        transparent
        opacity={heatmapActive ? 0.95 : 0.7}
        sizeAttenuation
      />
    </points>
  );
};

export default CrowdParticles;
