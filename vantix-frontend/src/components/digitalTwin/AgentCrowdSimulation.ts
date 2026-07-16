import * as THREE from 'three';

export interface CrowdAgent {
  id: string;
  seatId: string;
  position: THREE.Vector3;
  target: THREE.Vector3;
  gateIndex: number;
  speed: number;
  state: 'WALKING' | 'SITTING' | 'CHEERING';
  cheerTimer: number;
}

export class AgentCrowdSimulation {
  public agents: CrowdAgent[] = [];
  private gatePositions: THREE.Vector3[] = [
    new THREE.Vector3(0, 0.1, -22),  // Gate A
    new THREE.Vector3(22, 0.1, 0),   // Gate B
    new THREE.Vector3(0, 0.1, 22),   // Gate C
    new THREE.Vector3(-22, 0.1, 0),  // Gate D
  ];

  private totalAgentsCount: number;

  constructor(totalAgentsCount: number = 2000) {
    this.totalAgentsCount = totalAgentsCount;
    this.initializeAgents();
  }

  /**
   * Initializes autonomous crowd agents with specific seats and gates
   */
  private initializeAgents() {
    for (let i = 0; i < this.totalAgentsCount; i++) {
      const gateIndex = Math.floor(Math.random() * this.gatePositions.length);
      const startPos = this.gatePositions[gateIndex].clone();
      
      // Calculate target seat coordinate (concentric rings mapping)
      const seatAngle = Math.random() * Math.PI * 2;
      const seatRadius = 12.0 + Math.random() * 8.0;
      const seatHeight = 0.4 + (seatRadius - 12.0) * 0.45;
      const targetPos = new THREE.Vector3(
        Math.cos(seatAngle) * seatRadius,
        seatHeight,
        Math.sin(seatAngle) * seatRadius
      );

      this.agents.push({
        id: `agent-${i}`,
        seatId: `seat-${i}`,
        position: startPos,
        target: targetPos,
        gateIndex,
        speed: 0.08 + Math.random() * 0.06,
        state: 'WALKING',
        cheerTimer: 0,
      });
    }
  }

  /**
   * Updates all agents using a parallel flat-array vector update loop for maximum efficiency.
   */
  public update(deltaTime: number, emergencyMode: boolean) {
    const tempDir = new THREE.Vector3();

    for (let i = 0; i < this.agents.length; i++) {
      const agent = this.agents[i];

      if (emergencyMode) {
        // Reroute agents towards the nearest evacuation gate
        const targetGate = this.gatePositions[agent.gateIndex];
        tempDir.subVectors(targetGate, agent.position);
        const dist = tempDir.length();

        if (dist > 0.4) {
          tempDir.normalize().multiplyScalar(agent.speed * 1.8 * deltaTime); // Running speed
          agent.position.add(tempDir);
          agent.state = 'WALKING';
        } else {
          // Agent successfully evacuated the stadium footprint
          agent.state = 'SITTING'; // Stop movement
        }
        continue;
      }

      // Normal Simulation flow states
      switch (agent.state) {
        case 'WALKING':
          tempDir.subVectors(agent.target, agent.position);
          const distanceToSeat = tempDir.length();

          if (distanceToSeat > 0.3) {
            tempDir.normalize().multiplyScalar(agent.speed * deltaTime);
            agent.position.add(tempDir);
          } else {
            agent.position.copy(agent.target);
            agent.state = 'SITTING';
          }
          break;

        case 'SITTING':
          // Randomly trigger cheering standing transitions
          if (Math.random() < 0.002) {
            agent.state = 'CHEERING';
            agent.cheerTimer = 2.0 + Math.random() * 3.0; // Cheer duration
          }
          break;

        case 'CHEERING':
          agent.cheerTimer -= deltaTime;
          if (agent.cheerTimer <= 0) {
            agent.state = 'SITTING';
          }
          break;
      }
    }
  }

  /**
   * Generates flat vertex buffers from current agent positions for instanced rendering or particle updates.
   */
  public getPositionsBuffer(): Float32Array {
    const buffer = new Float32Array(this.agents.length * 3);
    for (let i = 0; i < this.agents.length; i++) {
      const pos = this.agents[i].position;
      buffer[i * 3] = pos.x;
      buffer[i * 3 + 1] = pos.y;
      buffer[i * 3 + 2] = pos.z;
    }
    return buffer;
  }
}
