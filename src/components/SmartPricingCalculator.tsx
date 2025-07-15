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
} from "lucide-react";
import { PRICING, UI_CONFIG } from "../constants";
import { useDebounce } from "../hooks/useDebounce";

interface PricingFactors {
  distance: number;
  dangerLevel: "safe" | "risky" | "dangerous" | "suicidal";
  urgency: "whenever" | "soon" | "urgent" | "emergency";
  itemValue: "cheap" | "valuable" | "precious" | "irreplaceable";
  timeOfDay: "day" | "night" | "peak" | "dead";
  weather: "clear" | "rain" | "storm" | "apocalypse";
}

const SmartPricingCalculator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [factors, setFactors] = useState<PricingFactors>({
    distance: 100,
    dangerLevel: "safe",
    urgency: "soon",
    itemValue: "cheap",
    timeOfDay: "day",
    weather: "clear",
  });

  const [calculatedPrice, setCalculatedPrice] = useState(5);
  const [priceBreakdown, setPriceBreakdown] = useState<
    Array<{ factor: string; cost: number; reason: string }>
  >([]);

  // Debounce the factors to prevent excessive calculations
  const debouncedFactors = useDebounce(factors, UI_CONFIG.DEBOUNCE_DELAY);

  const calculatePrice = () => {
    let basePrice = PRICING.BASE_FEE;
    const breakdown: Array<{ factor: string; cost: number; reason: string }> =
      [];

    // Distance calculation
    const distanceCost = Math.max(
      0,
      Math.ceil(debouncedFactors.distance / PRICING.CHUNKS_PER_DISTANCE_UNIT) *
        PRICING.DISTANCE_MULTIPLIER
    );
    if (distanceCost > 0) {
      breakdown.push({
        factor: "Distance",
        cost: distanceCost,
        reason: `${debouncedFactors.distance} blocks = ${Math.ceil(
          debouncedFactors.distance / PRICING.CHUNKS_PER_DISTANCE_UNIT
        )} chunks of boredom`,
      });
    }

    // Danger level multiplier
    const dangerInfo = PRICING.DANGER_MULTIPLIERS[debouncedFactors.dangerLevel];
    if (dangerInfo.multiplier > 1) {
      const dangerCost = Math.ceil(
        (basePrice + distanceCost) * (dangerInfo.multiplier - 1)
      );
      breakdown.push({
        factor: "Danger Tax",
        cost: dangerCost,
        reason: dangerInfo.reason,
      });
    }

    // Urgency surcharge
    const urgencyInfo = PRICING.URGENCY_FEES[debouncedFactors.urgency];
    if (urgencyInfo.fee > 0) {
      breakdown.push({
        factor: "Urgency Fee",
        cost: urgencyInfo.fee,
        reason: urgencyInfo.reason,
      });
    } else if (debouncedFactors.urgency === "whenever") {
      const discount = Math.ceil(
        (basePrice + distanceCost) * PRICING.PATIENCE_DISCOUNT_RATE
      );
      breakdown.push({
        factor: "Patience Discount",
        cost: -discount,
        reason: "Thanks for not being in a rush",
      });
    }

    // Item value insurance
    const valueInfo = PRICING.VALUE_FEES[debouncedFactors.itemValue];
    if (valueInfo.fee > 0) {
      breakdown.push({
        factor: "Insurance",
        cost: valueInfo.fee,
        reason: valueInfo.reason,
      });
    }

    // Time of day modifier
    const timeInfo = PRICING.TIME_FEES[debouncedFactors.timeOfDay];
    if (timeInfo.fee !== 0) {
      breakdown.push({
        factor: "Time Modifier",
        cost: timeInfo.fee,
        reason: timeInfo.reason,
      });
    }

    // Weather conditions
    const weatherInfo = PRICING.WEATHER_FEES[debouncedFactors.weather];
    if (weatherInfo.fee > 0) {
      breakdown.push({
        factor: "Weather Tax",
        cost: weatherInfo.fee,
        reason: weatherInfo.reason,
      });
    }

    // Calculate total
    const totalCost = Math.max(
      PRICING.MINIMUM_PRICE,
      basePrice + breakdown.reduce((sum, item) => sum + item.cost, 0)
    );

    // Apply danger multiplier to final price
    const finalPrice = Math.ceil(
      totalCost *
        PRICING.DANGER_MULTIPLIERS[debouncedFactors.dangerLevel].multiplier
    );

    setCalculatedPrice(finalPrice);
    setPriceBreakdown([
      {
        factor: "Base Fee",
        cost: basePrice,
        reason: "Minimum charge for existing",
      },
      ...breakdown,
    ]);
  };

  useEffect(() => {
    calculatePrice();
  }, [debouncedFactors]);

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
              (Because transparency is overrated)
            </span>
          </button>

          {isOpen && (
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Get an instant quote based on distance, danger level, urgency, and
              my current mood. Prices subject to change based on how much I
              don't want to do your job.
            </p>
          )}
        </div>

        {isOpen && (
          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-6 space-y-6">
              {/* Distance Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Distance (blocks)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="10"
                    max="2000"
                    value={factors.distance}
                    onChange={(e) =>
                      setFactors((prev) => ({
                        ...prev,
                        distance: parseInt(e.target.value),
                      }))
                    }
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="text-white font-medium">
                      {factors.distance} blocks
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {factors.distance < 100
                    ? "Practically next door"
                    : factors.distance < 500
                    ? "Reasonable distance"
                    : factors.distance < 1000
                    ? "Getting annoying"
                    : "Why do you live so far away?"}
                </div>
              </div>

              {/* Danger Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Danger Level
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(["safe", "risky", "dangerous", "suicidal"] as const).map(
                    (level) => (
                      <button
                        key={level}
                        onClick={() =>
                          setFactors((prev) => ({
                            ...prev,
                            dangerLevel: level,
                          }))
                        }
                        className={`p-3 rounded-lg border transition-colors flex items-center gap-2 ${
                          factors.dangerLevel === level
                            ? "border-blue-500 bg-blue-900/30 text-white"
                            : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
                        }`}
                      >
                        {getDangerIcon(level)}
                        <span className="capitalize text-sm">{level}</span>
                      </button>
                    )
                  )}
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
                    Subject to my mood and availability
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

              <div className="mt-4 text-center">
                <p className="text-blue-100 text-sm italic">
                  * Prices are estimates. Actual cost may vary based on how much
                  I don't want to do your job.
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
