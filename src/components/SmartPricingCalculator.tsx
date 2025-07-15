import React, { useState, useEffect } from "react";
import {
  Calculator,
  Diamond,
  AlertTriangle,
  Clock,
  Shield,
  Zap,
  MapPin,
  Skull,
  CheckCircle,
} from "lucide-react";
import { PRICING, UI_CONFIG } from "../constants";
import { useDebounce } from "../hooks/useDebounce";
import { DistanceCalculator } from "../utils/distanceCalculator";
import { PricingCalculator } from "../utils/pricingCalculator";
import { CoordinateInput } from "./CoordinateInput";

interface PricingFactors {
  pickupCoords: string;
  deliveryCoords: string;
  dangerLevel: "safe" | "risky" | "dangerous" | "suicidal";
  urgency: "whenever" | "soon" | "urgent" | "emergency";
  itemValue: "cheap" | "valuable" | "precious" | "irreplaceable";
  timeOfDay: "day" | "night" | "peak" | "dead";
  weather: "clear" | "rain" | "storm" | "apocalypse";
  serviceType: "delivery" | "shopping" | "rescue";
}

const SmartPricingCalculator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [factors, setFactors] = useState<PricingFactors>({
    pickupCoords: "",
    deliveryCoords: "",
    dangerLevel: "safe",
    urgency: "soon",
    itemValue: "cheap",
    timeOfDay: "day",
    weather: "clear",
    serviceType: "delivery",
  });

  const [calculatedDistance, setCalculatedDistance] = useState(0);
  const [routeAnalysis, setRouteAnalysis] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(5);
  const [priceBreakdown, setPriceBreakdown] = useState([]);
  const [coordErrors, setCoordErrors] = useState({ pickup: "", delivery: "" });

  // Debounce the factors to prevent excessive calculations
  const debouncedFactors = useDebounce(factors, UI_CONFIG.DEBOUNCE_DELAY);

  // Calculate distance whenever coordinates change
  useEffect(() => {
    if (!debouncedFactors.pickupCoords || !debouncedFactors.deliveryCoords) {
      setCalculatedDistance(0);
      setRouteAnalysis(null);
      setCoordErrors({ pickup: "", delivery: "" });
      return;
    }

    const pickup = DistanceCalculator.parseCoordinates(debouncedFactors.pickupCoords);
    const delivery = DistanceCalculator.parseCoordinates(debouncedFactors.deliveryCoords);

    const newErrors = { pickup: "", delivery: "" };

    if (!pickup) {
      newErrors.pickup = "Invalid coordinate format";
    }
    if (!delivery) {
      newErrors.delivery = "Invalid coordinate format";
    }

    setCoordErrors(newErrors);

    if (pickup && delivery) {
      const analysis = DistanceCalculator.analyzeRoute(pickup, delivery);
      setCalculatedDistance(analysis.distance);
      setRouteAnalysis(analysis);
    } else {
      setCalculatedDistance(0);
      setRouteAnalysis(null);
    }
  }, [debouncedFactors.pickupCoords, debouncedFactors.deliveryCoords]);

  // Calculate price whenever distance or other factors change
  useEffect(() => {
    if (calculatedDistance === 0 || !routeAnalysis) {
      setCalculatedPrice(5);
      setPriceBreakdown([]);
      return;
    }

    const pricing = PricingCalculator.calculatePrice({
      distance: calculatedDistance,
      urgency: debouncedFactors.urgency,
      insurance: debouncedFactors.itemValue === "cheap" ? "none" : 
                debouncedFactors.itemValue === "valuable" ? "basic" : "premium",
      dangerLevel: routeAnalysis.dangerLevel,
      serviceType: debouncedFactors.serviceType
    });

    setCalculatedPrice(pricing.totalPrice);
    setPriceBreakdown([
      {
        factor: "Base Fee",
        cost: pricing.basePrice,
        reason: "Minimum charge for existing",
      },
      {
        factor: "Distance",
        cost: pricing.distanceCost,
        reason: `${calculatedDistance} blocks = ${Math.ceil(calculatedDistance / 100)} chunks of boredom`,
      },
      ...pricing.modifiers,
    ]);
  }, [calculatedDistance, routeAnalysis, debouncedFactors]);

  const getDangerIcon = (level: string) => {
    switch (level) {
      case "safe":
        return <Shield className="h-4 w-4 text-green-400" />;
      case "risky":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case "dangerous":
        return <Zap className="h-4 w-4 text-orange-400" />;
      case "suicidal":
        return <Skull className="h-4 w-4 text-red-400" />;
      default:
        return <Shield className="h-4 w-4 text-gray-400" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "whenever":
        return "text-green-400";
      case "soon":
        return "text-blue-400";
      case "urgent":
        return "text-orange-400";
      case "emergency":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const handleCoordChange = (type: 'pickup' | 'delivery', value: string) => {
    setFactors(prev => ({
      ...prev,
      [`${type}Coords`]: value
    }));
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
            <span className="text-sm opacity-80">
              (Coordinate-based pricing)
            </span>
          </button>

          {isOpen && (
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Get an instant quote based on your actual pickup and delivery coordinates. 
              No guessing distances - just paste your coordinates and get accurate pricing.
            </p>
          )}
        </div>

        {isOpen && (
          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-6 space-y-6">
              {/* Coordinate Inputs - Primary Input Method */}
              <div className="bg-blue-900/10 border border-blue-700/30 rounded-lg p-4">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  Enter Your Coordinates
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CoordinateInput
                    label="Pickup Location"
                    value={factors.pickupCoords}
                    onChange={(value) => handleCoordChange('pickup', value)}
                    placeholder="100, 64, -200"
                    icon={<MapPin className="h-4 w-4 text-green-400" />}
                    error={coordErrors.pickup}
                    type="pickup"
                  />
                  
                  <CoordinateInput
                    label="Delivery Location"
                    value={factors.deliveryCoords}
                    onChange={(value) => handleCoordChange('delivery', value)}
                    placeholder="300, 64, 150"
                    icon={<MapPin className="h-4 w-4 text-blue-400" />}
                    error={coordErrors.delivery}
                    type="delivery"
                  />
                </div>

                {/* Auto-calculated Distance Display */}
                {calculatedDistance > 0 && routeAnalysis && (
                  <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <div>
                          <div className="text-white font-medium">
                            Distance: {calculatedDistance} blocks
                          </div>
                          <div className="text-gray-400 text-sm">
                            Travel time: ~{routeAnalysis.estimatedTime} minutes
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-400 font-bold">
                          Base: {Math.ceil(calculatedDistance / 100) * 2 + 3} diamonds
                        </div>
                        <div className="text-gray-400 text-xs">
                          Before modifiers
                        </div>
                      </div>
                    </div>
                    
                    {routeAnalysis.specialNotes.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-700">
                        {routeAnalysis.specialNotes.map((note, index) => (
                          <div key={index} className="text-yellow-300 text-xs flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {note}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Service Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {(["delivery", "shopping", "rescue"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() =>
                        setFactors((prev) => ({ ...prev, serviceType: type }))
                      }
                      className={`p-3 rounded-lg border transition-colors flex items-center gap-2 ${
                        factors.serviceType === type
                          ? "border-blue-500 bg-blue-900/30 text-white"
                          : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <span className="capitalize text-sm">{type}</span>
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
                  {(["whenever", "soon", "urgent", "emergency"] as const).map(
                    (urgency) => (
                      <button
                        key={urgency}
                        onClick={() =>
                          setFactors((prev) => ({ ...prev, urgency }))
                        }
                        className={`p-3 rounded-lg border transition-colors flex items-center gap-2 ${
                          factors.urgency === urgency
                            ? "border-blue-500 bg-blue-900/30 text-white"
                            : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
                        }`}
                      >
                        <Clock
                          className={`h-4 w-4 ${getUrgencyColor(urgency)}`}
                        />
                        <span className="capitalize text-sm">{urgency}</span>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Item Value */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Item Value (for insurance purposes)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(
                    ["cheap", "valuable", "precious", "irreplaceable"] as const
                  ).map((value) => (
                    <button
                      key={value}
                      onClick={() =>
                        setFactors((prev) => ({ ...prev, itemValue: value }))
                      }
                      className={`p-3 rounded-lg border transition-colors flex items-center gap-2 ${
                        factors.itemValue === value
                          ? "border-blue-500 bg-blue-900/30 text-white"
                          : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
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
                    onChange={(e) =>
                      setFactors((prev) => ({
                        ...prev,
                        timeOfDay: e.target.value as any,
                      }))
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="day">Day (Normal hours)</option>
                    <option value="night">Night (Mob dodging)</option>
                    <option value="peak">Peak Hours (Everyone's needy)</option>
                    <option value="dead">
                      Dead Hours (Nothing better to do)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Weather Conditions
                  </label>
                  <select
                    value={factors.weather}
                    onChange={(e) =>
                      setFactors((prev) => ({
                        ...prev,
                        weather: e.target.value as any,
                      }))
                    }
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

            {/* Price Display */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Estimated Cost
                  </h3>
                  <p className="text-blue-100 text-sm">
                    {calculatedDistance > 0 
                      ? `Based on ${calculatedDistance} block distance`
                      : "Enter coordinates for accurate pricing"
                    }
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Diamond className="h-8 w-8 text-yellow-400" />
                    <span className="text-4xl font-bold text-white">
                      {calculatedPrice}
                    </span>
                  </div>
                  <p className="text-blue-100 text-sm">diamonds</p>
                </div>
              </div>

              {/* Price Breakdown */}
              {priceBreakdown.length > 0 && (
                <div className="bg-black/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Price Breakdown</h4>
                  <div className="space-y-2">
                    {priceBreakdown.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm"
                      >
                        <div>
                          <span className="text-blue-100 font-medium">
                            {item.factor}:
                          </span>
                          <span className="text-blue-200 ml-2">
                            {item.reason}
                          </span>
                        </div>
                        <span
                          className={`font-bold ${
                            item.cost >= 0 ? "text-white" : "text-green-400"
                          }`}
                        >
                          {item.cost >= 0 ? "+" : ""}
                          {item.cost} 💎
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 text-center">
                <p className="text-blue-100 text-sm italic">
                  * Prices are calculated from actual coordinates. No guessing required!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SmartPricingCalculator;