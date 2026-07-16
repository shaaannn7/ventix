import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

interface VisualizationLayersProps {
  activeLayers: {
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
  layerOpacities: {
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

export const VisualizationLayers: React.FC<VisualizationLayersProps> = ({
  activeLayers,
  layerOpacities,
}) => {
  const cameraSweepsRef = useRef<THREE.Group>(null);
  const wifiWavesRef = useRef<THREE.Group>(null);
  const noiseWavesRef = useRef<THREE.Mesh>(null);
  const networkPacketsRef = useRef<THREE.Group>(null);

  const [hoveredSensor, setHoveredSensor] = useState<string | null>(null);
  const [hoveredAmenity, setHoveredAmenity] = useState<string | null>(null);

  // Dynamic animations inside the frame tick loop
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // 1. Oscillate security camera coverage cones
    if (cameraSweepsRef.current && activeLayers.cameras) {
      cameraSweepsRef.current.children.forEach((cone, idx) => {
        cone.rotation.y = Math.sin(elapsed * 1.5 + idx) * 0.3;
        cone.rotation.z = Math.cos(elapsed * 1.0 + idx) * 0.1;
      });
    }

    // 2. Animate WiFi wave wireframe expansion
    if (wifiWavesRef.current && activeLayers.wifi) {
      wifiWavesRef.current.children.forEach((wave, idx) => {
        const scale = 1.0 + ((elapsed + idx * 0.8) % 2.4) * 0.8;
        wave.scale.set(scale, scale, scale);
        const mat = (wave as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = layerOpacities.wifi * Math.max(0, 1.0 - ((elapsed + idx * 0.8) % 2.4) / 2.4);
        }
      });
    }

    // 3. Pulse noise level scale waves on the turf
    if (noiseWavesRef.current && activeLayers.noise) {
      const scalePulse = 1.0 + Math.sin(elapsed * 4.0) * 0.08;
      noiseWavesRef.current.scale.set(scalePulse, 1, scalePulse);
    }

    // 4. Animate network data packets flowing up scoreboard cables
    if (networkPacketsRef.current && activeLayers.network) {
      networkPacketsRef.current.children.forEach((packet, idx) => {
        // Translate vertically upwards along cables
        const speed = 1.8 + idx * 0.4;
        const startHeight = 0.5;
        const endHeight = 5.8;
        packet.position.y = startHeight + ((elapsed * speed + idx * 1.2) % (endHeight - startHeight));
      });
    }
  });

  return (
    <group>
      {/* ─── 1. CAMERA COVERAGE LAYER ─── */}
      {activeLayers.cameras && (
        <group ref={cameraSweepsRef}>
          {/* Sweeping cameras located at stadium canopy corners */}
          {[
            [-18, 8.0, -18],
            [18, 8.0, -18],
            [-18, 8.0, 18],
            [18, 8.0, 18],
          ].map((pos, idx) => (
            <mesh key={idx} position={pos as [number, number, number]} rotation={[Math.PI / 3, 0, 0]}>
              <coneGeometry args={[2.5, 6.0, 16, 1, true]} />
              <meshBasicMaterial 
                color="#06b6d4" 
                transparent 
                opacity={layerOpacities.cameras * 0.25} 
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* ─── 2. WIFI COVERAGE LAYER ─── */}
      {activeLayers.wifi && (
        <group ref={wifiWavesRef}>
          {/* Wireframe expansion wave nodes on arches */}
          {[
            [-10, 6.5, 0],
            [10, 6.5, 0],
          ].map((pos, idx) => (
            <mesh key={idx} position={pos as [number, number, number]}>
              <sphereGeometry args={[2.0, 16, 12]} />
              <meshBasicMaterial 
                color="#a855f7" 
                wireframe 
                transparent 
                opacity={layerOpacities.wifi} 
              />
            </mesh>
          ))}
        </group>
      )}

      {/* ─── 3. POWER GRID CONNECTIONS ─── */}
      {activeLayers.power && (
        <group>
          {/* Neon lines mapping power distribution from bottom hubs to upper lighting rigs */}
          <Line 
            points={[[-20, 0.1, -20], [-10, 6.2, 0], [0, 5.8, 0]]} 
            color="#eab308" 
            lineWidth={2} 
            opacity={layerOpacities.power}
            transparent
          />
          <Line 
            points={[[20, 0.1, 20], [10, 6.2, 0], [0, 5.8, 0]]} 
            color="#eab308" 
            lineWidth={2} 
            opacity={layerOpacities.power}
            transparent
          />
        </group>
      )}

      {/* ─── 4. IOT SENSOR BEACONS ─── */}
      {activeLayers.sensors && (
        <group>
          {[
            { id: 'sens-1', name: 'Thermal Sensor W-02', pos: [-12, 1.2, 6], temp: '24.2°C', health: 'Nominal' },
            { id: 'sens-2', name: 'Vibration Array A-12', pos: [14, 2.5, -4], temp: '21.8°C', health: 'Nominal' },
            { id: 'sens-3', name: 'HVAC Airflow Joint N-04', pos: [0, 6.4, 0], temp: '19.4°C', health: 'Filtered' },
          ].map((sens) => (
            <group key={sens.id} position={sens.pos as [number, number, number]}>
              <mesh 
                onPointerOver={() => setHoveredSensor(sens.id)}
                onPointerOut={() => setHoveredSensor(null)}
              >
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshBasicMaterial color="#10b981" transparent opacity={layerOpacities.sensors} />
              </mesh>
              {/* Pulsing ring */}
              <mesh scale={[1.4, 1.4, 1.4]}>
                <sphereGeometry args={[0.22, 8, 8]} />
                <meshBasicMaterial color="#10b981" transparent opacity={layerOpacities.sensors * 0.3} wireframe />
              </mesh>

              {/* 3D spatial hover tag overlay */}
              {hoveredSensor === sens.id && (
                <Html distanceFactor={10} position={[0, 0.5, 0]}>
                  <div className="bg-obsidian border border-system-green/50 text-[8px] font-mono text-white p-xs rounded-xs whitespace-nowrap shadow-high">
                    <span className="font-bold text-system-green block">{sens.name}</span>
                    <span>Temp: {sens.temp} // {sens.health}</span>
                  </div>
                </Html>
              )}
            </group>
          ))}
        </group>
      )}

      {/* ─── 5. AMENITIES CONTROL GRID (Food, Restrooms, Water) ─── */}
      {activeLayers.amenities && (
        <group>
          {[
            { id: 'am-1', label: '🍔 Concourse Food A', pos: [-14, 1.0, -10], status: 'Queue: 4 mins' },
            { id: 'am-2', label: '🚻 Restroom Hub West', pos: [-16, 1.0, 10], status: '90% occupied' },
            { id: 'am-3', label: '💧 Water Station 04', pos: [14, 1.0, 12], status: 'Flow: Nominal' },
          ].map((amenity) => (
            <group key={amenity.id} position={amenity.pos as [number, number, number]}>
              <mesh 
                onPointerOver={() => setHoveredAmenity(amenity.id)}
                onPointerOut={() => setHoveredAmenity(null)}
              >
                <boxGeometry args={[0.25, 0.25, 0.25]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={layerOpacities.amenities} />
              </mesh>

              {/* Text label floating in 3D scene space */}
              <Html distanceFactor={12} position={[0, 0.4, 0]}>
                <div className="bg-obsidian/90 border border-system-cyan/40 text-[7px] font-mono text-white px-xs py-[2px] rounded-2xs whitespace-nowrap">
                  {amenity.label}
                </div>
              </Html>

              {/* Advanced detailed hover specs card */}
              {hoveredAmenity === amenity.id && (
                <Html distanceFactor={8} position={[0, 0.8, 0]}>
                  <div className="bg-obsidian-elevated border border-system-cyan text-[8px] font-mono text-white p-xs rounded-xs shadow-high">
                    <span className="font-bold text-system-cyan block">{amenity.label}</span>
                    <span>Status: {amenity.status}</span>
                  </div>
                </Html>
              )}
            </group>
          ))}
        </group>
      )}

      {/* ─── 6. NOISE LEVEL CONCENTRIC WAVES ─── */}
      {activeLayers.noise && (
        <mesh ref={noiseWavesRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[10.0, 12.5, 32]} />
          <meshBasicMaterial 
            color="#ef4444" 
            transparent 
            opacity={layerOpacities.noise * 0.45} 
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* ─── 7. NETWORK PACKET FLOWS ─── */}
      {activeLayers.network && (
        <group ref={networkPacketsRef}>
          {/* Glowing box nodes flowing up cables to scoreboard */}
          {[
            [-8, 0.5, -4.5],
            [-8, 0.5, 4.5],
            [8, 0.5, -4.5],
            [8, 0.5, 4.5],
          ].map((pos, idx) => (
            <mesh key={idx} position={pos as [number, number, number]}>
              <boxGeometry args={[0.15, 0.15, 0.15]} />
              <meshBasicMaterial color="#a855f7" transparent opacity={layerOpacities.network} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};

export default VisualizationLayers;
