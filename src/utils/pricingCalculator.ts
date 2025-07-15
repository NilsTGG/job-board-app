interface PricingFactors {
  distance: number;
  urgency: 'whenever' | 'soon' | 'urgent' | 'emergency';
  insurance: 'none' | 'basic' | 'premium';
  dangerLevel: 'safe' | 'risky' | 'dangerous' | 'suicidal';
  serviceType: 'delivery' | 'shopping' | 'rescue';
}

interface PricingBreakdown {
  basePrice: number;
  distanceCost: number;
  modifiers: Array<{name: string, cost: number, reason: string}>;
  totalPrice: number;
}

export class PricingCalculator {
  private static readonly BASE_FEE = 3; // diamonds
  private static readonly COST_PER_100_BLOCKS = 2; // diamonds per 100 blocks
  private static readonly MINIMUM_CHARGE = 5; // diamonds

  static calculatePrice(factors: PricingFactors): PricingBreakdown {
    const { distance, urgency, insurance, dangerLevel, serviceType } = factors;
    
    // Base pricing
    const basePrice = this.BASE_FEE;
    
    // Distance-based cost (per 100 blocks)
    const distanceCost = Math.ceil(distance / 100) * this.COST_PER_100_BLOCKS;
    
    const modifiers: Array<{name: string, cost: number, reason: string}> = [];
    
    // Service type modifiers
    if (serviceType === 'shopping') {
      modifiers.push({
        name: 'Shopping Service',
        cost: 2,
        reason: 'Coordination and negotiation with sellers'
      });
    } else if (serviceType === 'rescue') {
      modifiers.push({
        name: 'Emergency Rescue',
        cost: 5,
        reason: 'Drop everything and come save you'
      });
    }
    
    // Urgency modifiers
    const urgencyModifiers = {
      whenever: { cost: -1, reason: 'Patience discount - thanks for not rushing' },
      soon: { cost: 0, reason: 'Standard timing' },
      urgent: { cost: 5, reason: 'Priority queue access' },
      emergency: { cost: 15, reason: 'Drop everything mode activated' }
    };
    
    if (urgencyModifiers[urgency].cost !== 0) {
      modifiers.push({
        name: 'Urgency Fee',
        ...urgencyModifiers[urgency]
      });
    }
    
    // Insurance costs
    const insuranceCosts = {
      none: 0,
      basic: 2,
      premium: 5
    };
    
    if (insuranceCosts[insurance] > 0) {
      modifiers.push({
        name: 'Insurance',
        cost: insuranceCosts[insurance],
        reason: insurance === 'basic' ? 'Basic coverage' : 'Full replacement guarantee'
      });
    }
    
    // Danger level multipliers (applied to total)
    const dangerMultipliers = {
      safe: 1,
      risky: 1.3,
      dangerous: 1.8,
      suicidal: 2.5
    };
    
    // Calculate subtotal
    const subtotal = basePrice + distanceCost + modifiers.reduce((sum, mod) => sum + mod.cost, 0);
    
    // Apply danger multiplier
    const dangerMultiplier = dangerMultipliers[dangerLevel];
    let totalPrice = Math.ceil(subtotal * dangerMultiplier);
    
    // Add danger multiplier as modifier if > 1
    if (dangerMultiplier > 1) {
      const dangerCost = totalPrice - subtotal;
      modifiers.push({
        name: 'Danger Tax',
        cost: dangerCost,
        reason: this.getDangerReason(dangerLevel)
      });
    }
    
    // Ensure minimum charge
    totalPrice = Math.max(totalPrice, this.MINIMUM_CHARGE);
    
    return {
      basePrice,
      distanceCost,
      modifiers,
      totalPrice
    };
  }
  
  private static getDangerReason(dangerLevel: string): string {
    const reasons = {
      risky: 'Some risk involved (mobs, terrain hazards)',
      dangerous: 'High risk area (Nether, deep caves, PvP zones)',
      suicidal: 'Extremely dangerous - I might actually die'
    };
    return reasons[dangerLevel as keyof typeof reasons] || '';
  }
}