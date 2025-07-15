interface Coordinates {
  x: number;
  y: number;
  z: number;
}

interface RouteAnalysis {
  distance: number;
  difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
  dangerLevel: 'safe' | 'risky' | 'dangerous' | 'suicidal';
  estimatedTime: number; // minutes
  specialNotes: string[];
}

export class DistanceCalculator {
  // Parse coordinate string to object
  static parseCoordinates(coordString: string): Coordinates | null {
    if (!coordString || typeof coordString !== 'string') return null;
    
    const patterns = [
      /^(-?\d+),?\s*(-?\d+),?\s*(-?\d+)$/, // "100, 64, -200"
      /^X:\s*(-?\d+)\s*Y:\s*(-?\d+)\s*Z:\s*(-?\d+)$/i, // "X: 100 Y: 64 Z: -200"
      /^(-?\d+)\s+(-?\d+)\s+(-?\d+)$/ // "100 64 -200"
    ];
    
    for (const pattern of patterns) {
      const match = coordString.trim().match(pattern);
      if (match) {
        return {
          x: parseInt(match[1]),
          y: parseInt(match[2]),
          z: parseInt(match[3])
        };
      }
    }
    return null;
  }

  // Calculate 2D horizontal distance (ignoring Y-coordinate)
  // Justification: SMP players travel horizontally, Y-level doesn't affect travel time
  static calculate2DDistance(pickup: Coordinates, delivery: Coordinates): number {
    const deltaX = delivery.x - pickup.x;
    const deltaZ = delivery.z - pickup.z;
    return Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
  }

  // Analyze route difficulty and danger
  static analyzeRoute(pickup: Coordinates, delivery: Coordinates): RouteAnalysis {
    const distance = this.calculate2DDistance(pickup, delivery);
    const avgY = (pickup.y + delivery.y) / 2;
    const yDifference = Math.abs(pickup.y - delivery.y);
    
    // Determine difficulty based on distance
    let difficulty: RouteAnalysis['difficulty'] = 'easy';
    if (distance > 2000) difficulty = 'extreme';
    else if (distance > 1000) difficulty = 'hard';
    else if (distance > 500) difficulty = 'moderate';

    // Determine danger level based on Y-level and distance
    let dangerLevel: RouteAnalysis['dangerLevel'] = 'safe';
    const specialNotes: string[] = [];

    // Nether coordinates detection (Y < 0 typically indicates Nether)
    if (avgY < 0) {
      dangerLevel = 'dangerous';
      specialNotes.push('Nether coordinates detected - high danger zone');
    } else if (avgY < 16) {
      dangerLevel = 'risky';
      specialNotes.push('Deep underground - lava and mob risks');
    } else if (distance > 1500) {
      dangerLevel = 'risky';
      specialNotes.push('Long distance - higher exposure to dangers');
    }

    // Estimate travel time (blocks per minute varies by terrain)
    const baseSpeed = avgY < 16 ? 60 : 120; // blocks per minute
    const estimatedTime = Math.ceil(distance / baseSpeed);

    // Add notes for special conditions
    if (yDifference > 50) {
      specialNotes.push(`Significant elevation change: ${yDifference} blocks`);
    }
    if (distance < 100) {
      specialNotes.push('Short distance - minimum pricing applies');
    }

    return {
      distance: Math.round(distance),
      difficulty,
      dangerLevel,
      estimatedTime,
      specialNotes
    };
  }

  // Validate coordinate format
  static validateCoordinates(coordString: string): { isValid: boolean; error?: string } {
    if (!coordString || !coordString.trim()) {
      return { isValid: false, error: 'Coordinates are required' };
    }

    const coords = this.parseCoordinates(coordString);
    if (!coords) {
      return { 
        isValid: false, 
        error: 'Invalid format. Use: X, Y, Z (e.g., 100, 64, -200)' 
      };
    }

    // Check for reasonable coordinate ranges
    if (Math.abs(coords.x) > 30000000 || Math.abs(coords.z) > 30000000) {
      return { 
        isValid: false, 
        error: 'Coordinates too far from spawn (world border limits)' 
      };
    }

    if (coords.y < -64 || coords.y > 320) {
      return { 
        isValid: false, 
        error: 'Y coordinate out of valid range (-64 to 320)' 
      };
    }

    return { isValid: true };
  }
}

// Hook for real-time distance calculation
export const useDistanceCalculation = (pickupCoords: string, deliveryCoords: string) => {
  const [analysis, setAnalysis] = React.useState<RouteAnalysis | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!pickupCoords || !deliveryCoords) {
      setAnalysis(null);
      setError(null);
      return;
    }

    const pickup = DistanceCalculator.parseCoordinates(pickupCoords);
    const delivery = DistanceCalculator.parseCoordinates(deliveryCoords);

    if (!pickup || !delivery) {
      setError('Invalid coordinate format');
      setAnalysis(null);
      return;
    }

    setError(null);
    const routeAnalysis = DistanceCalculator.analyzeRoute(pickup, delivery);
    setAnalysis(routeAnalysis);
  }, [pickupCoords, deliveryCoords]);

  return { analysis, error };
};