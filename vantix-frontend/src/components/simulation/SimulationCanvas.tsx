import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

interface SimulationCanvasProps {
  scenario: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timeOffset: number; // 0, 5, 10, 15, 30, 60
}

const StadiumOutline: React.FC<{ scenario: string }> = ({ scenario }) => {
  const isFire = scenario === 'fire';
  const isPower = scenario === 'power';

  return (
    <group>
      {/* Field grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[14, 8]} />
        <meshBasicMaterial color={isPower ? '#1c1c1f' : '#06b6d4'} opacity={0.12} transparent />
      </mesh>
      {!isPower && <gridHelper args={[14, 8, '#06b6d4', '#27272a']} position={[0, 0, 0]} />}

      {/* Basic Concourse Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
        <ringGeometry args={[8, 10, 64]} />
        <meshBasicMaterial color={isPower ? '#09090b' : '#09090b'} opacity={0.7} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.8, 0]}>
        <ringGeometry args={[10, 12, 64]} />
        <meshBasicMaterial color="#121214" opacity={0.6} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Main outer boundary ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[14.9, 15, 64]} />
        <meshBasicMaterial color={isFire ? '#ef4444' : isPower ? '#27272a' : '#a855f7'} opacity={0.8} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const SimulatingCrowd: React.FC<{ scenario: string; severity: string; timeOffset: number }> = ({ scenario, severity, timeOffset }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 300;

  // Particle locations setup
  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.1;
      const radius = 9 + Math.random() * 4;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = 0.3 + Math.random() * 0.05;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  });

  // Calculate colors dynamically based on scenario and timeOffset
  const [colors, setColors] = useState(() => new Float32Array(count * 3));

  useEffect(() => {
    const arr = new Float32Array(count * 3);
    const isCrisis = severity === 'high' || severity === 'critical';
    
    for (let i = 0; i < count; i++) {
      const ratio = i / count;
      // If Gate closure scenario, make gate segment congested
      const inGateZone = ratio > 0.3 && ratio < 0.45;
      const congested = (scenario === 'gate' && inGateZone) || (scenario === 'rain' && Math.random() > 0.4) || (scenario === 'surge' && Math.random() > 0.3);

      if (congested && timeOffset > 0) {
        arr[i * 3] = isCrisis ? 0.93 : 0.96;     // R
        arr[i * 3 + 1] = isCrisis ? 0.26 : 0.62; // G
        arr[i * 3 + 2] = isCrisis ? 0.26 : 0.04; // B (Red critical / Amber warning)
      } else {
        arr[i * 3] = 0.02;     // R
        arr[i * 3 + 1] = 0.71; // G
        arr[i * 3 + 2] = 0.83; // B (Cyan normal)
      }
    }
    setColors(arr);
  }, [scenario, severity, timeOffset]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Slow down speed if rain is active
    const baseSpeed = scenario === 'rain' ? 0.001 : 0.003;
    const speed = baseSpeed * (1 + timeOffset * 0.05);

    for (let i = 0; i < count; i++) {
      const x = pos[i * 3];
      const z = pos[i * 3 + 2];
      const angle = Math.atan2(z, x) + speed * (1 + Math.random() * 0.2);
      const radius = Math.sqrt(x * x + z * z);
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          args={[colors, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.18} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  );
};

export const SimulationCanvas: React.FC<SimulationCanvasProps> = ({ scenario, severity, timeOffset }) => {
  return (
    <div className="w-full h-full min-h-[360px] bg-obsidian relative rounded-xs overflow-hidden border border-system-border/80">
      
      {/* Simulation status text overlay */}
      <div className="absolute top-sm left-sm z-10 flex flex-col gap-2xs bg-obsidian-elevated/80 border border-system-border/60 p-sm rounded-xs backdrop-blur-command">
        <span className="font-mono text-[8px] text-system-purple font-bold uppercase tracking-widest animate-pulse">Simulator Sandbox</span>
        <span className="text-[11px] font-semibold text-white tracking-wide">3D Operations Simulator</span>
        <span className="font-mono text-[8px] text-system-cyan">ACTIVE_MODEL: SIM_LAB_RUNNING</span>
      </div>

      <Canvas camera={{ position: [18, 15, 18], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[15, 15, 15]} intensity={1.2} />

        {/* Stadium outline grids */}
        <StadiumOutline scenario={scenario} />

        {/* Dynamic crowd simulation particles */}
        <SimulatingCrowd scenario={scenario} severity={severity} timeOffset={timeOffset} />

        {/* Evacuation spline lines when fire scenario is active */}
        {scenario === 'fire' && (
          <Line 
            points={[[-6, 0.3, 6], [-2, 0.3, 2], [3, 0.3, -4], [9, 0.3, -9]]} 
            color="#10b981" 
            lineWidth={3} 
            dashed 
          />
        )}

        {/* Blocked zones indicator meshes */}
        {scenario === 'gate' && (
          <group position={[6, 0.3, 6]}>
            <mesh>
              <cylinderGeometry args={[1, 1, 0.4, 16]} />
              <meshBasicMaterial color="#ef4444" opacity={0.4} transparent />
            </mesh>
          </group>
        )}

        <OrbitControls enablePan enableZoom maxPolarAngle={Math.PI / 2.1} minDistance={6} maxDistance={35} />
      </Canvas>

      {/* Active parameters display footer overlay */}
      <div className="absolute bottom-sm right-sm z-10 flex flex-col items-end text-right font-mono text-[8px] text-system-mutedText">
        <span>Active Scenario: {scenario.toUpperCase()}</span>
        <span>Severity: {severity.toUpperCase()}</span>
        <span>Time Projection: +{timeOffset} MIN</span>
      </div>
    </div>
  );
};
export default SimulationCanvas;
