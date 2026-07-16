import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SeatOptimizerProps {
  seatCount?: number;
  emergencyMode: boolean;
}

export const SeatOptimizer: React.FC<SeatOptimizerProps> = ({
  seatCount = 16000,
  emergencyMode,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const lastFlashTime = useRef(0);

  // Generate transformation matrices for 16,000 seats distributed across the 3D seating bowl
  const { matrices, colors } = useMemo(() => {
    const tempMatrix = new THREE.Object3D();
    const tempColor = new THREE.Color();
    const generatedMatrices: THREE.Matrix4[] = [];
    const generatedColors: Float32Array = new Float32Array(seatCount * 3);

    const seatSpacingAngle = 0.04; // Adjust spacing around rings for lower seatCount
    const rowDepth = 0.18;         // distance between rows

    for (let i = 0; i < seatCount; i++) {
      // Divide seats into 3 sloped decks
      let tier = 0;
      let radiusStart = 12.0;
      let heightStart = 0.3;
      let slope = 0.33;
      let seatsInTier = seatCount * 0.45; // Lower deck

      if (i >= seatCount * 0.45 && i < seatCount * 0.8) {
        // Mid deck
        tier = 1;
        radiusStart = 15.2;
        heightStart = 1.4;
        slope = 0.4;
        seatsInTier = seatCount * 0.35;
      } else if (i >= seatCount * 0.8) {
        // Upper deck
        tier = 2;
        radiusStart = 18.2;
        heightStart = 2.5;
        slope = 0.5;
        seatsInTier = seatCount * 0.2;
      }

      const localIndex = i - (tier === 0 ? 0 : tier === 1 ? seatCount * 0.45 : seatCount * 0.8);
      const rowsPerTier = Math.floor(Math.sqrt(seatsInTier * 0.25));
      const row = Math.floor(localIndex / (seatsInTier / rowsPerTier));
      const col = localIndex % Math.floor(seatsInTier / rowsPerTier);

      const radius = radiusStart + row * rowDepth;
      const height = heightStart + row * rowDepth * slope;
      const angle = col * seatSpacingAngle * (11.5 / radius); // Angular compression to maintain density

      // Position using cylindrical coordinates
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      tempMatrix.position.set(x, height, z);
      tempMatrix.rotation.set(0, -angle + Math.PI / 2, 0); // Face inward towards the pitch center
      tempMatrix.scale.set(0.04, 0.06, 0.04);
      tempMatrix.updateMatrix();

      generatedMatrices.push(tempMatrix.matrix.clone());

      // Assign seat color state (Texas Stadium dark blue / slate gray base)
      const seatState = Math.random();
      if (seatState > 0.95) {
        // VIP Seat (Cyan)
        tempColor.set('#06b6d4');
      } else if (seatState > 0.85) {
        // Empty / Grey Seat
        tempColor.set('#475569');
      } else {
        // Occupied Seat (Slate blue)
        tempColor.set('#1e293b');
      }

      generatedColors[i * 3] = tempColor.r;
      generatedColors[i * 3 + 1] = tempColor.g;
      generatedColors[i * 3 + 2] = tempColor.b;
    }

    return { matrices: generatedMatrices, colors: generatedColors };
  }, [seatCount]);

  // Set position matrices and colors to GPU Instanced Mesh
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Apply instancing matrices
    matrices.forEach((matrix, index) => {
      mesh.setMatrixAt(index, matrix);
    });

    // Apply color buffers
    mesh.geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colors, 3));
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.geometry.attributes.color) {
      mesh.geometry.attributes.color.needsUpdate = true;
    }
  }, [matrices, colors]);

  // Dynamic state update during Emergency Mode (flashing warning colors, throttled to 2 FPS)
  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || !emergencyMode) return;

    const time = clock.getElapsedTime();
    if (time - lastFlashTime.current < 0.5) return;
    lastFlashTime.current = time;

    const tempColor = new THREE.Color();
    const cycle = Math.sin(time * 5.0) > 0;

    for (let i = 0; i < seatCount; i++) {
      if (i % 8 === 0) {
        // Flashing evacuation aisle indicators
        tempColor.set(cycle ? '#ef4444' : '#1e293b');
        mesh.setColorAt(i, tempColor);
      }
    }
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, seatCount]}>
      <boxGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </boxGeometry>
      <meshStandardMaterial roughness={0.7} metalness={0.1} vertexColors />
    </instancedMesh>
  );
};

export default SeatOptimizer;
