import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SeatOptimizer from './SeatOptimizer';

interface StadiumMeshProps {
  activeDeck: string;
  emergencyMode: boolean;
  roofOpen: boolean;
}

// ─── Security Tents & Plaza Event Objects (Replicating Photo Details) ────────
const EventPlazaObjects: React.FC = () => {
  return (
    <group position={[0, 0.02, 26]}>
      {/* 1. Large Event Tent (White Gable Roof) */}
      <group position={[-8, 0, 0]}>
        {/* Tent base */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[4.2, 0.8, 2.5]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </mesh>
        {/* Tent roof (prism/cone) */}
        <mesh position={[0, 1.0, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[2.0, 0.7, 4]} />
          <meshStandardMaterial color="#ffffff" roughness={0.8} />
        </mesh>
      </group>

      {/* 2. Security Checkpoint Tents (Smaller White Boxes) */}
      {[[-3, -2], [-1.2, -2], [1.2, -2], [3, -2]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.8, 0.6, 0.8]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.7, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.55, 0.25, 4]} />
            <meshStandardMaterial color="#ffffff" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* 3. Outdoor Display Screen Board */}
      <group position={[7, 0, -2]}>
        {/* Screen Stand */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.7} />
        </mesh>
        {/* Display board */}
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[1.8, 1.0, 0.15]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        {/* Glowing Face */}
        <mesh position={[0, 1.4, 0.09]}>
          <planeGeometry args={[1.6, 0.8]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  );
};

// ─── Football Pitch & Markings ────────────────────────────────────────────────
const Pitch: React.FC = () => {
  const pitchW = 22;
  const pitchH = 14;
  const stripeCount = 11;
  const stripeW = pitchW / stripeCount;

  return (
    <group>
      {/* Grass Lanes */}
      {Array.from({ length: stripeCount }, (_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-pitchW / 2 + stripeW * i + stripeW / 2, 0.01, 0]}
        >
          <planeGeometry args={[stripeW, pitchH]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#1b5e20' : '#2e7d32'}
            roughness={0.95}
          />
        </mesh>
      ))}

      {/* Boundary lines */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.25, 64]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
      {/* Outer bounding lines */}
      <mesh position={[0, 0.015, -pitchH / 2]}>
        <boxGeometry args={[pitchW, 0.005, 0.06]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.015, pitchH / 2]}>
        <boxGeometry args={[pitchW, 0.005, 0.06]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-pitchW / 2, 0.015, 0]}>
        <boxGeometry args={[0.06, 0.005, pitchH]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[pitchW / 2, 0.015, 0]}>
        <boxGeometry args={[0.06, 0.005, pitchH]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.06, 0.005, pitchH]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

// ─── 3D Concrete Seating Tiers Base ───────────────────────────────────────────
const SeatingBowlBase: React.FC<{ activeDeck: string }> = ({ activeDeck }) => {
  return (
    <group>
      {/* Lower deck concrete support */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[16.0, 12.8, 1.6, 64, 1, true]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Mid deck concrete support */}
      {activeDeck !== 'lower' && (
        <mesh position={[0, 2.3, 0]}>
          <cylinderGeometry args={[18.6, 17.0, 1.4, 64, 1, true]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Upper deck concrete support */}
      {activeDeck === 'upper' && (
        <mesh position={[0, 4.0, 0]}>
          <cylinderGeometry args={[21.3, 19.0, 2.0, 64, 1, true]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// ─── Texas Jumbotron (AT&T Center-Hung Screen) ───────────────────────────────
const TexasJumbotron: React.FC = () => {
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

      {/* Screens displaying live mock game HUD */}
      {[-1.26, 1.26].map((z, idx) => (
        <mesh key={idx} position={[0, 0, z]} rotation={[0, z < 0 ? Math.PI : 0, 0]}>
          <planeGeometry args={[9.0, 2.4]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0284c7"
            emissiveIntensity={0.65}
            roughness={0.15}
          />
        </mesh>
      ))}
    </group>
  );
};

// ─── Double Soaring Steel Truss Arches with Triangular End Anchors ────────────
const SoaringSteelArches: React.FC = () => {
  const segments = 32;
  const archRadius = 23.5; // Scaled out to match the photo arches profile

  const renderTrussArch = (zOffset: number) => {
    const trussCylinders: React.ReactNode[] = [];

    for (let i = 0; i < segments; i++) {
      const t1 = (i / segments) * Math.PI;
      const t2 = ((i + 1) / segments) * Math.PI;

      // Outer arch cord
      const x1 = Math.cos(t1) * archRadius;
      const y1 = Math.sin(t1) * archRadius - 8.5;
      const x2 = Math.cos(t2) * archRadius;
      const y2 = Math.sin(t2) * archRadius - 8.5;

      // Inner arch cord (offset downwards by 0.7)
      const ix1 = Math.cos(t1) * (archRadius - 0.7);
      const iy1 = Math.sin(t1) * (archRadius - 0.7) - 8.5;
      const ix2 = Math.cos(t2) * (archRadius - 0.7);
      const iy2 = Math.sin(t2) * (archRadius - 0.7) - 8.5;

      const p1 = new THREE.Vector3(x1, y1, zOffset);
      const p2 = new THREE.Vector3(x2, y2, zOffset);
      const ip1 = new THREE.Vector3(ix1, iy1, zOffset);
      const ip2 = new THREE.Vector3(ix2, iy2, zOffset);

      const drawBar = (start: THREE.Vector3, end: THREE.Vector3, radius: number, keySuffix: string) => {
        const distance = start.distanceTo(end);
        const position = start.clone().add(end).multiplyScalar(0.5);
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        return (
          <mesh key={`${i}-${keySuffix}`} position={position} quaternion={quaternion}>
            <cylinderGeometry args={[radius, radius, distance, 6]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
          </mesh>
        );
      };

      trussCylinders.push(drawBar(p1, p2, 0.16, 'outer'));
      trussCylinders.push(drawBar(ip1, ip2, 0.13, 'inner'));
      trussCylinders.push(drawBar(p1, ip1, 0.08, 'vertical'));
      trussCylinders.push(drawBar(p1, ip2, 0.06, 'diagonal'));
    }

    return trussCylinders;
  };

  return (
    <group>
      {/* North Arch Truss */}
      {renderTrussArch(4.2)}
      {/* South Arch Truss */}
      {renderTrussArch(-4.2)}

      {/* Massive Triangular Arch Support Pillars (Meeting the ground at X ends, matching photo) */}
      {[-23.5, 23.5].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {/* North Support pillar leg */}
          <mesh position={[x < 0 ? 0.7 : -0.7, 2.5, 4.2]} rotation={[0, 0, x < 0 ? -Math.PI / 9 : Math.PI / 9]}>
            <cylinderGeometry args={[0.4, 0.6, 5.2, 8]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
          </mesh>
          {/* South Support pillar leg */}
          <mesh position={[x < 0 ? 0.7 : -0.7, 2.5, -4.2]} rotation={[0, 0, x < 0 ? -Math.PI / 9 : Math.PI / 9]}>
            <cylinderGeometry args={[0.4, 0.6, 5.2, 8]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
          </mesh>
          {/* Braced Concrete base block */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.8, 0.8, 10.5]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// ─── Giant Entrance Glass Facade with FIFA World Cup Branding Banners ──────
const EntranceGlassFacade: React.FC = () => {
  // Coordinates for the 4 large colored banners in the photo
  const banners = [
    { color: '#a855f7', label: 'FIFA', x: -3.5 }, // Purple banner
    { color: '#0ea5e9', label: '2026', x: -1.2 }, // Blue banner
    { color: '#10b981', label: 'WORLD', x: 1.2 }, // Green banner
    { color: '#f59e0b', label: 'CUP', x: 3.5 },   // Orange/Yellow banner
  ];

  return (
    <group position={[0, 3.2, 22.2]}>
      {/* Main glass wall structure */}
      <mesh>
        <planeGeometry args={[16, 6.2]} />
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Structural window pane grid lines */}
      <gridHelper args={[16, 8, '#0891b2', '#0891b2']} position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]} />

      {/* FIFA World Cup Banners (Vertical colored bands hanging on facade, matching photo) */}
      {banners.map((ban, i) => (
        <group key={i} position={[ban.x, 0, 0.02]}>
          {/* Banner canvas */}
          <mesh>
            <planeGeometry args={[1.8, 5.5]} />
            <meshStandardMaterial color={ban.color} roughness={0.8} side={THREE.DoubleSide} />
          </mesh>
          {/* White label accent */}
          <mesh position={[0, -2.0, 0.01]}>
            <planeGeometry args={[1.4, 0.8]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* Massive Outer Arch Steel Frame for entrance */}
      <mesh position={[0, 3.1, 0]}>
        <boxGeometry args={[16.5, 0.35, 0.4]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.6} />
      </mesh>
    </group>
  );
};

// ─── Horizontal Silver-Metallic Panel Bands (Outer Stadium Shell, Tapered) ───
const SilverStadiumShell: React.FC = () => {
  return (
    <group>
      {/* Lower Silver Band */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[22.0, 21.0, 1.8, 64, 1, true, Math.PI / 4, 1.5 * Math.PI]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Mid Silver Band */}
      <mesh position={[0, 2.8, 0]}>
        <cylinderGeometry args={[22.6, 22.0, 1.6, 64, 1, true, Math.PI / 4, 1.5 * Math.PI]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Upper Silver Band */}
      <mesh position={[0, 4.4, 0]}>
        <cylinderGeometry args={[23.2, 22.6, 1.8, 64, 1, true, Math.PI / 4, 1.5 * Math.PI]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const RetractableRoof: React.FC<{ roofOpen: boolean; emergencyMode: boolean }> = ({
  roofOpen,
  emergencyMode,
}) => {
  const panelNorthRef = useRef<THREE.Group>(null);
  const panelSouthRef = useRef<THREE.Group>(null);

  // Z-axis sliding offset: 5.6 (open) vs 2.2 (closed)
  const targetOffset = roofOpen ? 5.6 : 2.2;
  const offset = useRef(targetOffset);

  useFrame(() => {
    offset.current += (targetOffset - offset.current) * 0.065;
    if (panelNorthRef.current) panelNorthRef.current.position.z = offset.current;
    if (panelSouthRef.current) panelSouthRef.current.position.z = -offset.current;
  });

  const getRoofColor = () => (emergencyMode ? '#7f1d1d' : '#f8fafc');

  return (
    <group position={[0, -8.5, 0]}>
      {/* North Curved Panel */}
      <group ref={panelNorthRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[23.6, 23.6, 3.4, 64, 1, true, Math.PI * 0.35, Math.PI * 0.3]} />
          <meshStandardMaterial
            color={getRoofColor()}
            roughness={0.5}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* South Curved Panel */}
      <group ref={panelSouthRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[23.6, 23.6, 3.4, 64, 1, true, Math.PI * 0.35, Math.PI * 0.3]} />
          <meshStandardMaterial
            color={getRoofColor()}
            roughness={0.5}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Outer fixed track guide rails running along the arches */}
      <mesh position={[0, 0, 4.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[23.7, 23.7, 0.15, 64, 1, true, Math.PI * 0.34, Math.PI * 0.32]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, -4.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[23.7, 23.7, 0.15, 64, 1, true, Math.PI * 0.34, Math.PI * 0.32]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

// ─── Main Export ─────────────────────────────────────────────────────────────
export const StadiumMesh: React.FC<StadiumMeshProps> = ({
  activeDeck,
  emergencyMode,
  roofOpen,
}) => {
  return (
    <group>
      {/* 1. Concrete ground and asphalt apron surroundings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[95, 95]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.9} />
      </mesh>

      {/* Soft Ground Shadow Plane (Dark circle directly under the stadium) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.09, 0]}>
        <circleGeometry args={[24, 64]} />
        <meshBasicMaterial color="#020617" opacity={0.6} transparent />
      </mesh>

      {/* Asphalt apron roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
        <ringGeometry args={[25, 42, 64]} />
        <meshStandardMaterial color="#1e293b" roughness={0.95} />
      </mesh>

      {/* 2. Plaza landscaping with white security check tents & display screen */}
      <EventPlazaObjects />

      {/* 3. Turf grass field & goalposts */}
      <Pitch />

      {/* 4. Concrete seating bowl decks base support */}
      <SeatingBowlBase activeDeck={activeDeck} />

      {/* 5. High-Performance GPU-Instanced seats rendering bowl */}
      <SeatOptimizer emergencyMode={emergencyMode} />

      {/* 6. Double Soaring Steel Truss Arches with massive end triangular pillars */}
      <SoaringSteelArches />

      {/* 7. Curved Horizontal Metallic panel outer shell */}
      <SilverStadiumShell />

      {/* 8. Front entrance glass facade displaying FIFA colored banners (matching photo) */}
      <EntranceGlassFacade />

      {/* 9. Center suspended Jumbotron Screen */}
      <TexasJumbotron />

      {/* 10. Sliding Retractable Roof panels */}
      <RetractableRoof roofOpen={roofOpen} emergencyMode={emergencyMode} />

      {/* 11. Turf spotlights and ambient glows */}
      <directionalLight position={[15, 30, 15]} intensity={1.4} />
      <pointLight
        position={[0, 6, 0]}
        intensity={emergencyMode ? 3.0 : 1.4}
        color={emergencyMode ? '#ef4444' : '#bae6fd'}
        distance={35}
      />
    </group>
  );
};

export default StadiumMesh;
