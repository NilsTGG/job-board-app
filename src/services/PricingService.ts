import { DistanceCalculator } from '../utils/distanceCalculator';
import { PricingCalculator } from '../utils/pricingCalculator';
import { QuoteData } from '../store/deliveryStore';

export interface QuoteOptions {
  urgency?: 'whenever' | 'soon' | 'urgent' | 'emergency';
  insurance?: 'none' | 'basic' | 'premium';
  serviceType?: 'delivery' | 'shopping' | 'rescue';
  itemValue?: 'cheap' | 'valuable' | 'precious' | 'irreplaceable';
  timeOfDay?: 'day' | 'night' | 'peak' | 'dead';
  weather?: 'clear' | 'rain' | 'storm' | 'apocalypse';
}

export class PricingService {
  private static cache = new Map<string, QuoteData>();

  static async getQuote(
    pickupCoords: string,
    deliveryCoords: string,
    options: QuoteOptions = {}
  ): Promise<QuoteData> {
    // Create cache key
    const cacheKey = `${pickupCoords}-${deliveryCoords}-${JSON.stringify(options)}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Validate coordinates
    const pickup = DistanceCalculator.parseCoordinates(pickupCoords);
    const delivery = DistanceCalculator.parseCoordinates(deliveryCoords);

    if (!pickup || !delivery) {
      throw new Error('Invalid coordinate format. Use: X, Y, Z (e.g., 100, 64, -200)');
    }

    // Calculate route analysis
    const analysis = DistanceCalculator.analyzeRoute(pickup, delivery);

    // Calculate pricing with options
    const pricing = PricingCalculator.calculatePrice({
      distance: analysis.distance,
      urgency: options.urgency || 'soon',
      insurance: this.mapInsurance(options.insurance || 'basic'),
      dangerLevel: analysis.dangerLevel,
      serviceType: options.serviceType || 'delivery'
    });

    // Create quote data
    const quote: QuoteData = {
      distance: analysis.distance,
      price: pricing.totalPrice,
      estimatedTime: analysis.estimatedTime,
      dangerLevel: analysis.dangerLevel,
      breakdown: [
        {
          factor: 'Base Fee',
          cost: pricing.basePrice,
          reason: 'Minimum charge for existing'
        },
        {
          factor: 'Distance',
          cost: pricing.distanceCost,
          reason: `${analysis.distance} blocks = ${Math.ceil(analysis.distance / 100)} chunks of boredom`
        },
        ...pricing.modifiers
      ]
    };

    // Cache the result
    this.cache.set(cacheKey, quote);

    // Clear cache after 5 minutes to prevent memory leaks
    setTimeout(() => {
      this.cache.delete(cacheKey);
    }, 5 * 60 * 1000);

    return quote;
  }

  static getBrokePersonPrice(serviceType: string, distance: number = 300): number {
    const baseDiscounts = {
      'basic-delivery': 3,
      'multi-shop': 5,
      'villager-transport': 8,
      'item-relocation': 2,
      'emergency-rescue': 7,
      'low-priority': 1
    };

    const base = baseDiscounts[serviceType as keyof typeof baseDiscounts] || 5;
    const distanceMultiplier = Math.ceil(distance / 100) * 0.5;
    
    return Math.max(1, Math.floor(base + distanceMultiplier));
  }

  static getServiceTierPrice(tier: 'Basic' | 'Premium' | 'Deluxe'): number {
    const tierPrices = {
      'Basic': 5,
      'Premium': 15,
      'Deluxe': 30
    };
    return tierPrices[tier];
  }

  private static mapInsurance(insurance: string): 'none' | 'basic' | 'premium' {
    const mapping: Record<string, 'none' | 'basic' | 'premium'> = {
      'none': 'none',
      'basic': 'basic',
      'premium': 'premium',
      'cheap': 'none',
      'valuable': 'basic',
      'precious': 'premium',
      'irreplaceable': 'premium'
    };
    return mapping[insurance] || 'basic';
  }

  static clearCache(): void {
    this.cache.clear();
  }
}