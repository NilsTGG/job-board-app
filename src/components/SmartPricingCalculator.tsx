import React, { useState, useEffect } from 'react';
import { Calculator, Diamond, AlertTriangle, Clock, Shield, Zap, Skull } from 'lucide-react';
import { UI_CONFIG } from '../constants';
import { useDebounce } from '../hooks/useDebounce';
import { CoordinateInput } from './CoordinateInput';
import { useDistanceCalculation } from '../utils/distanceCalculator';
import { PricingCalculator } from '../utils/pricingCalculator';

interface PricingFactors {
  pickupCoords: string;
  deliveryCoords: string;
  dangerLevel: 'safe' | 'risky' | 'dangerous' | 'suicidal';
  urgency: 'whenever' | 'soon' | 'urgent' | 'emergency';
  itemValue: 'cheap' | 'valuable' | 'precious' | 'irreplaceable';
  timeOfDay: 'day' | 'night' | 'peak' | 'dead';
  weather: 'clear' | 'rain' | 'storm' | 'apocalypse';
  serviceType: 'delivery' | 'shopping' | 'rescue';
}

const SmartPricingCalculator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [factors, setFactors] = useState<PricingFactors>({
    pickupCoords: '',
    deliveryCoords: '',
    dangerLevel: 'safe',
    urgency: 'soon',
    itemValue: 'cheap',
    timeOfDay: 'day',
    weather: 'clear',
    serviceType: 'delivery'
  });

  const [calculatedPrice, setCalculatedPrice] = useState(5);
  const [priceBreakdown, setPriceBreakdown] = useState<Array<{factor: string, cost: number, reason: string}>>([]);

  // Debounce the factors to prevent excessive calculations
  const debouncedFactors = useDebounce(factors, UI_CONFIG.DEBOUNCE_DELAY);

  // Auto-calculate distance from coordinates
  const { analysis: routeAnalysis } = useDistanceCalculation(
    debouncedFactors.pickupCoords,
    debouncedFactors.deliveryCoords
  );

  const calculatePrice = () => {
    if (!routeAnalysis) {
      setCalculatedPrice(5);
      setPriceBreakdown([]);
      return;
    }

    const pricing = PricingCalculator.calculatePrice({
      distance: routeAnalysis.distance,
      urgency: debouncedFactors.urgency,
      insurance: debouncedFactors.itemValue === 'cheap' ? 'none' : 
                debouncedFactors.itemValue === 'valuable' ? 'basic' : 'premium',
      dangerLevel: routeAnalysis.dangerLevel,
      serviceType: debouncedFactors.serviceType
    });

    setCalculatedPrice(pricing.totalPrice);
    setPriceBreakdown([
      { factor: 'Base Fee', cost: pricing.basePrice, reason: 'Minimum charge for existing' },
      { factor: 'Distance', cost: pricing.distanceCost, reason: `${routeAnalysis.distance} blocks of travel` },
      ...pricing.modifiers
    ]);
  };

  useEffect(() => {
    if (routeAnalysis) {
      calculatePrice();
    }
  }, [debouncedFactors, routeAnalysis]);

  const getDangerIcon = (level: string) => {
    switch (level) {
      case 'safe': return <Shield className="h-4 w-4 text-green-400" />;
      case 'risky': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'dangerous': return <Zap className="h-4 w-4 text-orange-400" />;
      case 'suicidal': return <Skull className="h-4 w-4 text-red-400" />;
      default: return <Shield className="h-4 w-4 text-gray-400" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'whenever': return 'text-green-400';
      case 'soon': return 'text-blue-400';
      case 'urgent': return 'text-orange-400';
      case 'emergency': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
          >
            <Calculator className="h-6 w-6" />
            Smart Pricing Calculator
            <span className="text-sm opacity-80">(Because transparency is overrated)</span>
          </button>
          
          {isOpen && (
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Get an instant quote based on distance, danger level, urgency, and my current mood. 
              Prices subject to change based on how much I don't want to do your job.
            </p>
          )}
        </div>

        {isOpen && (
          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-6 space-y-6">
              {/* Coordinate Inputs */}
              <div>
                <h4 className="text-md font-medium text-white mb-4">Enter Coordinates for Accurate Pricing</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CoordinateInput
                    label="Pickup Location"
                    value={factors.pickupCoords}
                    onChange={(value) => setFactors(prev => ({ ...prev, pickupCoords: value }))}
                    placeholder="100, 64, -200"
                    icon={<Package className="h-5 w-5 text-green-400" />}
                    type="pickup"
                  />
                  
                  <CoordinateInput
                    label="Delivery Location"
                    value={factors.deliveryCoords}
                    onChange={(value) => setFactors(prev => ({ ...prev, deliveryCoords: value }))}
                    placeholder="300, 64, 150"
                    icon={<Package className="h-5 w-5 text-blue-400" />}
                    type="delivery"
                  />
                </div>
                
                {routeAnalysis && (
                  <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                    <div className="text-blue-400 font-medium">
                      Calculated Distance: {routeAnalysis.distance} blocks
                    </div>
                    <div className="text-blue-300 text-sm">
                      Estimated travel time: {routeAnalysis.estimatedTime} minutes
                    </div>
                  </div>
                )}
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {(['delivery', 'shopping', 'rescue'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFactors(prev => ({ ...prev, serviceType: type }))}
                      className={`p-3 rounded-lg border transition-colors flex items-center gap-2 ${
                        factors.serviceType === type
                          ? 'border-blue-500 bg-blue-900/30 text-white'
                          : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <Package className="h-4 w-4 text-blue-400" />
                      <span className="capitalize text-sm">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Danger Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Danger Level
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['safe', 'risky', 'dangerous', 'suicidal'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setFactors(prev => ({ ...prev, dangerLevel: level }))}
                      className={`p-3 rounded-lg border transition-colors flex items-center gap-2 ${
                        factors.dangerLevel === level
                          ? 'border-blue-500 bg-blue-900/30 text-white'
                          : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {getDangerIcon(level)}
                      <span className="capitalize text-sm">{level}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  How badly do you need this?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['whenever', 'soon', 'urgent', 'emergency'] as const).map((urgency) => (
                    <button
                      key={urgency}
                      onClick={() => setFactors(prev => ({ ...prev, urgency }))}
                      className={`p-3 rounded-lg border transition-colors flex items-center gap-2 ${
                        factors.urgency === urgency
                          ? 'border-blue-500 bg-blue-900/30 text-white'
                          : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <Clock className={`h-4 w-4 ${getUrgencyColor(urgency)}`} />
                      <span className="capitalize text-sm">{urgency}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Item Value */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Item Value (for insurance purposes)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['cheap', 'valuable', 'precious', 'irreplaceable'] as const).map((value) => (
                    <button
                      key={value}
                      onClick={() => setFactors(prev => ({ ...prev, itemValue: value }))}
                      className={`p-3 rounded-lg border transition-colors flex items-center gap-2 ${
                        factors.itemValue === value
                          ? 'border-blue-500 bg-blue-900/30 text-white'
                          : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <Diamond className="h-4 w-4 text-blue-400" />
                      <span className="capitalize text-sm">{value}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time and Weather */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time of Day
                  </label>
                  <select
                    value={factors.timeOfDay}
                    onChange={(e) => setFactors(prev => ({ ...prev, timeOfDay: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="day">Day (Normal hours)</option>
                    <option value="night">Night (Mob dodging)</option>
                    <option value="peak">Peak Hours (Everyone's needy)</option>
                    <option value="dead">Dead Hours (Nothing better to do)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Weather Conditions
                  </label>
                  <select
                    value={factors.weather}
                    onChange={(e) => setFactors(prev => ({ ...prev, weather: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="clear">Clear (Perfect)</option>
                    <option value="rain">Rain (Annoying)</option>
                    <option value="storm">Storm (Dangerous)</option>
                    <option value="apocalypse">Apocalyptic (Why now?)</option>
                  </select>
                </div>
              </div>
            </div>

            {routeAnalysis && (
              <div className="bg-black/20 rounded-lg p-3 mb-4">
                <h5 className="text-blue-200 font-medium mb-2">Route Analysis</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-300">Distance:</span>
                    <span className="text-white ml-2">{routeAnalysis.distance} blocks</span>
                  </div>
                  <div>
                    <span className="text-blue-300">Danger Level:</span>
                    <span className="text-orange-400 ml-2 capitalize">{routeAnalysis.dangerLevel}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Price Display */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">Estimated Cost</h3>
                  <p className="text-blue-100 text-sm">Subject to my mood and availability</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Diamond className="h-8 w-8 text-yellow-400" />
                    <span className="text-4xl font-bold text-white">{calculatedPrice}</span>
                  </div>
                  <p className="text-blue-100 text-sm">diamonds</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-black/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Price Breakdown</h4>
                <div className="space-y-2">
                  {priceBreakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-blue-100 font-medium">{item.factor}:</span>
                        <span className="text-blue-200 ml-2">{item.reason}</span>
                      </div>
                      <span className={`font-bold ${item.cost >= 0 ? 'text-white' : 'text-green-400'}`}>
                        {item.cost >= 0 ? '+' : ''}{item.cost} 💎
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-blue-100 text-sm italic">
                  * Prices are estimates. Actual cost may vary based on how much I don't want to do your job.
                * Prices calculated from actual coordinates. Final cost may vary based on my mood.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SmartPricingCalculator;