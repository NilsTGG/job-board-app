import React from 'react';
import { Route, Clock, AlertTriangle, Diamond, TrendingUp } from 'lucide-react';
import { RouteAnalysis } from '../utils/distanceCalculator';
import { PricingCalculator } from '../utils/pricingCalculator';

interface DistanceDisplayProps {
  analysis: RouteAnalysis;
  urgency: string;
  insurance: string;
  serviceType: string;
}

const DistanceDisplay: React.FC<DistanceDisplayProps> = ({
  analysis,
  urgency,
  insurance,
  serviceType
}) => {
  // Calculate pricing based on route analysis
  const pricing = PricingCalculator.calculatePrice({
    distance: analysis.distance,
    urgency: urgency as any,
    insurance: insurance as any,
    dangerLevel: analysis.dangerLevel,
    serviceType: serviceType as any
  });

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'text-green-400',
      moderate: 'text-yellow-400',
      hard: 'text-orange-400',
      extreme: 'text-red-400'
    };
    return colors[difficulty as keyof typeof colors] || 'text-gray-400';
  };

  const getDangerColor = (dangerLevel: string) => {
    const colors = {
      safe: 'text-green-400',
      risky: 'text-yellow-400',
      dangerous: 'text-orange-400',
      suicidal: 'text-red-400'
    };
    return colors[dangerLevel as keyof typeof colors] || 'text-gray-400';
  };

  return (
    <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Route className="h-5 w-5 text-blue-400" />
          <div>
            <div className="text-white font-medium">
              Distance: {analysis.distance} blocks
            </div>
            <div className="text-blue-300 text-sm flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Estimated travel time: {analysis.estimatedTime} minutes
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-blue-400 font-bold text-lg flex items-center gap-1">
            <Diamond className="h-5 w-5" />
            {pricing.totalPrice}
          </div>
          <div className="text-blue-300 text-sm">
            diamonds
          </div>
        </div>
      </div>
      
      {/* Route Analysis */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <div>
          <span className="text-gray-400">Difficulty:</span>
          <span className={`ml-2 font-medium capitalize ${getDifficultyColor(analysis.difficulty)}`}>
            {analysis.difficulty}
          </span>
        </div>
        
        <div>
          <span className="text-gray-400">Danger Level:</span>
          <span className={`ml-2 font-medium capitalize ${getDangerColor(analysis.dangerLevel)}`}>
            {analysis.dangerLevel}
          </span>
        </div>
      </div>

      {/* Special Notes */}
      {analysis.specialNotes.length > 0 && (
        <div className="mb-3">
          <div className="text-gray-400 text-xs mb-1">Route Notes:</div>
          {analysis.specialNotes.map((note, index) => (
            <div key={index} className="text-yellow-300 text-xs flex items-center gap-1 mb-1">
              <AlertTriangle className="h-3 w-3 flex-shrink-0" />
              {note}
            </div>
          ))}
        </div>
      )}

      {/* Price Breakdown */}
      <div className="border-t border-blue-700/30 pt-3">
        <div className="text-blue-300 text-sm font-medium mb-2 flex items-center gap-1">
          <TrendingUp className="h-4 w-4" />
          Price Breakdown:
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Base fee:</span>
            <span className="text-white">{pricing.basePrice} 💎</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Distance ({analysis.distance} blocks):</span>
            <span className="text-white">{pricing.distanceCost} 💎</span>
          </div>
          {pricing.modifiers.map((modifier, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-400">{modifier.name}:</span>
              <span className={modifier.cost >= 0 ? 'text-white' : 'text-green-400'}>
                {modifier.cost >= 0 ? '+' : ''}{modifier.cost} 💎
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistanceDisplay;