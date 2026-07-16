import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EmergencyBeaconsProps {
  emergencyType: string;
}

export const EmergencyBeacons: React.FC<EmergencyBeaconsProps> = ({ emergencyType }) => {
  const fireBeaconRef = useRef<THREE.Mesh>(null);
  const medicalBeaconRef = useRef<THREE.Mesh>(null);
  const surgeRingRef = useRef<THREE.Mesh>(null);
  const exitBeaconsRef = useRef<THREE.Group>(null);

  // Pulse animations in rendering loop
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const pulseFactor = 1.0 + Math.sin(elapsed * 5.0) * 0.15;
    const ringScale = 1.0 + (elapsed % 1.5) * 1.2;

    if (fireBeaconRef.current) {
      fireBeaconRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
    }
    if (medicalBeaconRef.current) {
      medicalBeaconRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
    }
    if (surgeRingRef.current) {
      surgeRingRef.current.scale.set(ringScale, 1, ringScale);
      const mat = surgeRingRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = Math.max(0, 0.6 * (1.0 - (elapsed % 1.5) / 1.5));
      }
    }
    if (exitBeaconsRef.current) {
      exitBeaconsRef.current.children.forEach((child) => {
        child.scale.set(pulseFactor, pulseFactor, pulseFactor);
      });
    }
  });

  return (
    <group>
      {/* 1. Fire Hazard Alert Beacons (Sector West) */}
      {emergencyType === 'fire' && (
        <group position={[-12, 1.2, 6]}>
          {/* Vertical beacon warning beam */}
          <mesh>
            <cylinderGeometry args={[0.02, 0.6, 5.0, 16, 1, true]} />
            <meshBasicMaterial color="#ef4444" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
          {/* Pulsing indicator core */}
          <mesh ref={fireBeaconRef} position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      )}

      {/* 2. Medical Rescue Alert Beacon (Gate C concessions) */}
      {emergencyType === 'medical' && (
        <group position={[16, 1.2, -8]}>
          {/* Dispatch direction beam */}
          <mesh>
            <cylinderGeometry args={[0.02, 0.5, 4.0, 16, 1, true]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
          {/* Pulsing ambulance dispatch beacon */}
          <mesh ref={medicalBeaconRef} position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshBasicMaterial color="#06b6d4" />
          </mesh>
        </group>
      )}

      {/* 3. Ingress Crowd Surge Expanding Rings */}
      {emergencyType === 'surge' && (
        <group position={[16, 0.05, -8]}>
          {/* Expanding warning indicator ring */}
          <mesh ref={surgeRingRef} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 1.0, 32]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.05, 0.4, 2.5, 16, 1, true]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.25} />
          </mesh>
        </group>
      )}

      {/* 4. Exit Evacuation Plazas Guidance Indicators */}
      {emergencyType === 'evacuation' && (
        <group ref={exitBeaconsRef}>
          {/* Render glowing pillars at all exits (Gate A, B, C, D) */}
          {[
            [0, 1.0, -22],  // Gate A
            [22, 1.0, 0],   // Gate B
            [0, 1.0, 22],   // Gate C
            [-22, 1.0, 0],  // Gate D
          ].map((pos, idx) => (
            <group key={idx} position={pos as [number, number, number]}>
              <mesh>
                <cylinderGeometry args={[0.01, 0.8, 4.0, 16, 1, true]} />
                <meshBasicMaterial color="#10b981" transparent opacity={0.22} side={THREE.DoubleSide} />
              </mesh>
              <mesh position={[0, 0.2, 0]}>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshBasicMaterial color="#10b981" />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
};

export default EmergencyBeacons;
