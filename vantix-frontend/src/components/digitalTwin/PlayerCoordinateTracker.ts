import * as THREE from 'three';

export interface PlayerTelemetryTick {
  playerId: string;
  x: number; // 2D Field X coordinate (-52.5 to 52.5 representing 105m length)
  z: number; // 2D Field Z coordinate (-34 to 34 representing 68m width)
  speed?: number;
}

export class PlayerCoordinateTracker {
  // Translate 2D field coordinates directly into the 3D model space
  private fieldScaleX = 22.0 / 105.0; // Scaled down to match Pitch geometry width (22 units)
  private fieldScaleZ = 14.0 / 68.0;  // Scaled down to match Pitch geometry depth (14 units)

  private currentPositions: Map<string, THREE.Vector3> = new Map();
  private targetPositions: Map<string, THREE.Vector3> = new Map();

  /**
   * Translates absolute field meters/yards coordinate tick to local 3D workspace vector
   */
  public translateToLocalSpace(fieldX: number, fieldZ: number): THREE.Vector3 {
    return new THREE.Vector3(
      fieldX * this.fieldScaleX,
      0.03, // Place slightly above green turf line to prevent clipping
      fieldZ * this.fieldScaleZ
    );
  }

  /**
   * Ingests a new coordinate packet tick from streaming source
   */
  public ingestCoordinates(tick: PlayerTelemetryTick) {
    const localTarget = this.translateToLocalSpace(tick.x, tick.z);
    this.targetPositions.set(tick.playerId, localTarget);

    if (!this.currentPositions.has(tick.playerId)) {
      // First frame initialization to prevent starting at origin (0,0)
      this.currentPositions.set(tick.playerId, localTarget.clone());
    }
  }

  /**
   * Applies Linear Interpolation (Lerp) over active streams to guarantee smooth transitions
   */
  public updateSmoothing(lerpFactor: number = 0.12) {
    this.targetPositions.forEach((targetPos, playerId) => {
      const currentPos = this.currentPositions.get(playerId);
      if (currentPos) {
        // Move current position smoothly towards the target position
        currentPos.lerp(targetPos, lerpFactor);
      }
    });
  }

  /**
   * Retrieves the smoothed 3D vector for rendering
   */
  public getPlayerPosition(playerId: string): THREE.Vector3 | undefined {
    return this.currentPositions.get(playerId);
  }
}
