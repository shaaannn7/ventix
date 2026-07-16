import React from 'react';
import { Html } from '@react-three/drei';

// Import modular stadium components
import Field from './Stadium/Field';
import Bowl from './Stadium/Bowl';
import Seating from './Stadium/Seating';
import StructuralArch from './Stadium/StructuralArch';
import Roof from './Stadium/Roof';
import Gates from './Stadium/Gates';
import Lighting from './Stadium/Lighting';
import MatchSimulation from './Stadium/MatchSimulation';

// New dynamic overlays
import ParkingGrid from './Stadium/ParkingGrid';
import AIHolographicScanner from './Stadium/AIHolographicScanner';
import EmergencyBeacons from './Stadium/EmergencyBeacons';
import WeatherSystem from './WeatherSystem';
import VisualizationLayers from './Stadium/VisualizationLayers';

interface StadiumMeshProps {
  activeDeck: string;
  emergencyMode: boolean;
  roofOpen: boolean;
  emergencyType?: string;
  predictionOffset?: number;
  activeLayers?: {
    density: boolean;
    crowd: boolean;
    volunteers: boolean;
    emergency: boolean;
    transport: boolean;
    cameras: boolean;
    wifi: boolean;
    power: boolean;
    sensors: boolean;
    amenities: boolean;
    noise: boolean;
    network: boolean;
  };
  layerOpacities?: {
    density: number;
    crowd: number;
    volunteers: number;
    emergency: number;
    transport: number;
    cameras: number;
    wifi: number;
    power: number;
    sensors: number;
    amenities: number;
    noise: number;
    network: number;
  };
}

interface TexasJumbotronProps {
  emergencyType: string;
  predictionOffset: number;
}

// ─── Texas Jumbotron (AT&T Center-Hung Screen) ───────────────────────────────
// ─── Texas Jumbotron (AT&T Center-Hung Screen) ───────────────────────────────
const TexasJumbotron: React.FC<TexasJumbotronProps> = ({ emergencyType, predictionOffset }) => {
  return (
    <group position={[0, 5.8, 0]}>
      {/* Steel Cables */}
      {[-8, 8].map((x) => (
        <group key={x}>
          <mesh position={[x, 2.6, -4.5]} rotation={[0.2, 0, -0.4]}>
            <cylinderGeometry args={[0.03, 0.03, 5.5, 4]} />
            <meshStandardMaterial color="#4b5563" metalness={0.9} />
          </mesh>
          <mesh position={[x, 2.6, 4.5]} rotation={[-0.2, 0, -0.4]}>
            <cylinderGeometry args={[0.03, 0.03, 5.5, 4]} />
            <meshStandardMaterial color="#4b5563" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Chassis */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[9.5, 2.8, 2.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Dynamic Screens displaying live mock game HUD */}
      {[-1.26, 1.26].map((z, idx) => (
        <mesh key={idx} position={[0, 0, z]} rotation={[0, z < 0 ? Math.PI : 0, 0]}>
          <planeGeometry args={[9.0, 2.4]} />
          <meshStandardMaterial color="#090d16" roughness={0.9} />
          <Html 
            transform 
            occlude 
            distanceFactor={5.2} 
            position={[0, 0, z < 0 ? -0.01 : 0.01]} 
            style={{ 
              width: '900px', 
              height: '240px', 
              background: '#070a13', 
              color: '#fff',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              fontFamily: 'monospace',
              padding: '12px',
              boxSizing: 'border-box'
            }}
          >
            <div className="w-full h-full flex flex-col justify-between select-none">
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1 text-[20px] text-cyan-400 font-bold">
                <span>FIFA WORLD CUP 2026</span>
                <span className="text-purple-400">STAGE 3 (74:12)</span>
              </div>

              {/* Main operational details */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[36px] font-black text-white leading-none">USA v MEX</span>
                  <span className="text-[18px] text-gray-400 mt-1">AT&T Stadium Operations Center</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[14px] text-gray-400 font-bold">ATTENDANCE</span>
                  <span className="text-[32px] font-black text-green-400 leading-none">83,412</span>
                </div>
              </div>

              {/* Status footer alerts */}
              <div className="flex items-center justify-between border-t border-cyan-500/20 pt-1 text-[16px]">
                <div>
                  <span className="text-gray-400">PREDICTION OFFSET: </span>
                  <span className="text-cyan-400 font-bold">+{predictionOffset} MIN</span>
                </div>
                <div>
                  {emergencyType !== 'none' ? (
                    <span className="text-red-500 font-bold animate-pulse">EMERGENCY PROTOCOL ACTIVE: {emergencyType.toUpperCase()}</span>
                  ) : (
                    <span className="text-green-500 font-bold">NOMINAL OPERATIONS</span>
                  )}
                </div>
              </div>
            </div>
          </Html>
        </mesh>
      ))}
    </group>
  );
};

// ─── Surrounding Plaza & Landscaping ─────────────────────────────────────────
const PlazaEnvironment: React.FC = () => {
  const trees: [number, number][] = [
    [-26, -18], [-28, -22], [-24, -25], [-29, -15],
    [26, 18], [28, 22], [24, 25], [29, 15],
    [-26, 18], [-28, 22], [-24, 25], [-29, 15],
    [26, -18], [28, -22], [24, -25], [29, -15],
  ];

  return (
    <group>
      {/* Plaza concrete base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[95, 95]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.9} />
      </mesh>

      {/* Soft Ground Shadow Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.09, 0]}>
        <circleGeometry args={[24, 64]} />
        <meshBasicMaterial color="#020617" opacity={0.6} transparent />
      </mesh>

      {/* Asphalt apron roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
        <ringGeometry args={[25, 42, 64]} />
        <meshStandardMaterial color="#1e293b" roughness={0.95} />
      </mesh>

      {/* 3D Landscaped Trees */}
      {trees.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.5, 6]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <coneGeometry args={[0.35, 0.8, 6]} />
            <meshStandardMaterial color="#166534" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Perimeter Columns (Outer Concrete Shell Support Ribs) */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 21.8;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 2.5, Math.sin(angle) * radius]}>
            <cylinderGeometry args={[0.15, 0.25, 5.0, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
};

// ─── Main Assembly Export ───────────────────────────────────────────────────
export const StadiumMesh: React.FC<StadiumMeshProps> = ({
  activeDeck,
  emergencyMode,
  roofOpen,
  emergencyType = 'none',
  predictionOffset = 0,
  activeLayers = {
    density: true,
    crowd: true,
    volunteers: true,
    emergency: true,
    transport: false,
    cameras: false,
    wifi: false,
    power: false,
    sensors: false,
    amenities: false,
    noise: false,
    network: false,
  },
  layerOpacities = {
    density: 0.8,
    crowd: 0.7,
    volunteers: 0.9,
    emergency: 0.9,
    transport: 0.6,
    cameras: 0.4,
    wifi: 0.4,
    power: 0.5,
    sensors: 0.8,
    amenities: 0.8,
    noise: 0.5,
    network: 0.7,
  },
}) => {
  return (
    <group>
      {/* 1. Surrounding landscape plaza, trees, and shadow grid */}
      <PlazaEnvironment />

      {/* 2. Football field pitch turf, boundaries, benches, and goalposts */}
      <Field />

      {/* Live active match simulation players layer */}
      <MatchSimulation />

      {/* 3. Seating bowl concrete supporting structure */}
      <Bowl activeDeck={activeDeck} />

      {/* 4. High-Performance GPU-Instanced seats rendering bowl */}
      <Seating emergencyMode={emergencyMode} />

      {/* 5. Soaring Structural Arch steel box trusses */}
      <StructuralArch />

      {/* 6. Suspended Center Jumbotron screens */}
      <TexasJumbotron emergencyType={emergencyType} predictionOffset={predictionOffset} />

      {/* 7. Entrances, checkpoints, and operable glass endzones */}
      <Gates />

      {/* 8. Retractable roof panels (left/right sliding down arches) */}
      <Roof roofOpen={roofOpen} emergencyMode={emergencyMode} />

      {/* 9. Dynamic Solar / Sky / Pitch illumination tracker */}
      <Lighting emergencyMode={emergencyMode} roofOpen={roofOpen} />

      {/* 10. Dynamic vehicle grid outside stadium */}
      <ParkingGrid predictionOffset={predictionOffset} emergencyType={emergencyType} />

      {/* 11. Holographic entry security turnstile scanners */}
      <AIHolographicScanner emergencyType={emergencyType} />

      {/* 12. Active emergency alarm beacons */}
      <EmergencyBeacons emergencyType={emergencyType} />

      {/* 13. Atmospheric weather rain particle system */}
      <WeatherSystem emergencyType={emergencyType} />

      {/* 14. Advanced spatial overlay visualization layers */}
      <VisualizationLayers activeLayers={activeLayers} layerOpacities={layerOpacities} />
    </group>
  );
};

export default StadiumMesh;
