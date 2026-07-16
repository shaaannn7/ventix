import * as THREE from 'three';

export interface CrowdAgent {
  id: string;
  seatId: string;
  startPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  position: THREE.Vector3;
  gateIndex: number;
  speed: number;
  progress: number; // 0.0 (gate) to 1.0 (seat)
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

      // Add a slight queue deviation to startPos so they don't spawn in a single point
      const angleOffset = Math.random() * Math.PI * 2;
      const queueRadius = 1.0 + Math.random() * 3.0;
      startPos.add(new THREE.Vector3(
        Math.cos(angleOffset) * queueRadius,
        0,
        Math.sin(angleOffset) * queueRadius
      ));

      this.agents.push({
        id: `agent-${i}`,
        seatId: `seat-${i}`,
        startPos,
        targetPos,
        position: startPos.clone(),
        gateIndex,
        speed: 0.8 + Math.random() * 0.6,
        progress: 0.05 + Math.random() * 0.1, // Start slightly walked in
        state: 'WALKING',
        cheerTimer: 0,
      });
    }
  }

  /**
   * Updates all agents based on prediction offset and active emergencies
   */
  public update(deltaTime: number, emergencyMode: boolean, predictionOffset: number) {
    for (let i = 0; i < this.agents.length; i++) {
      const agent = this.agents[i];

      // Calculate target progress index based on parameters
      let targetProgress = 1.0;
      
      if (emergencyMode) {
        targetProgress = 0.0; // Evacuate back to gates
      } else {
        // Map time prediction offset to target progress profiles
        if (predictionOffset === 0) {
          targetProgress = 0.15 + (i % 6) * 0.08; // Drizzle ingress flow
        } else if (predictionOffset === 5) {
          targetProgress = 0.45 + (i % 6) * 0.08; // In progress
        } else if (predictionOffset === 15) {
          targetProgress = 0.82 + (i % 6) * 0.03; // Most seated
        } else {
          targetProgress = 1.0; // Fully seated
        }
      }

      // Smooth progress interpolation
      const diff = targetProgress - agent.progress;
      agent.progress += diff * agent.speed * deltaTime * 0.4;
      agent.progress = Math.max(0, Math.min(1, agent.progress));

      // Calculate 3D position vector
      agent.position.lerpVectors(agent.startPos, agent.targetPos, agent.progress);

      // Adjust state mapping
      if (agent.progress > 0.96) {
        if (agent.state === 'WALKING') {
          agent.state = 'SITTING';
        }
        
        // Randomly trigger cheering standing transitions for seated agents
        if (agent.state === 'SITTING' && Math.random() < 0.001) {
          agent.state = 'CHEERING';
          agent.cheerTimer = 2.0 + Math.random() * 2.0;
        }

        if (agent.state === 'CHEERING') {
          agent.cheerTimer -= deltaTime;
          // Animate small vertical cheer bounce
          agent.position.y += Math.sin(stateTimeSecs() * 12.0) * 0.08;
          if (agent.cheerTimer <= 0) {
            agent.state = 'SITTING';
          }
        }
      } else {
        agent.state = 'WALKING';
      }
    }
  }
}

// Helper to get time elapsed for cheer animation loops without full frame context
function stateTimeSecs() {
  return Date.now() / 1000;
}
