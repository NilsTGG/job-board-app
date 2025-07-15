import React, { useState, useEffect } from 'react';
import { Calculator, Diamond, MapPin, ArrowRight, Zap } from 'lucide-react';
import { DistanceCalculator } from '../utils/distanceCalculator';
import { PricingCalculator } from '../utils/pricingCalculator';
import { useDebounce } from '../hooks/useDebounce';

const QuickQuoteWidget: React.FC = () => {
  const [pickupCoords, setPickupCoords] = useState('');
  const [deliveryCoords, setDeliveryCoords] = useState('');
  const [quote, setQuote] = useState<{
    distance: number;
    price: number;
    time: number;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce coordinate inputs
  const debouncedPickup = useDebounce(pickupCoords, 500);
  const debouncedDelivery = useDebounce(deliveryCoords, 500);

  // Calculate quote when coordinates change
  useEffect(() => {
    if (!debouncedPickup || !debouncedDelivery) {
      setQuote(null);
      setError(null);
      return;
    }

    setIsCalculating(true);
    setError(null);

    try {
      const pickup = DistanceCalculator.parseCoordinates(debouncedPickup);
      const delivery = DistanceCalculator.parseCoordinates(debouncedDelivery);

      if (pickup && delivery) {
        const analysis = DistanceCalculator.analyzeRoute(pickup, delivery);
        const pricing = PricingCalculator.calculatePrice({
          distance: analysis.distance,
          urgency: 'soon',
          insurance: 'basic',
          dangerLevel: analysis.dangerLevel,
          serviceType: 'delivery'
        });

        setQuote({
          distance: analysis.distance,
          price: pricing.totalPrice,
          time: analysis.estimatedTime
        });
      } else {
        setQuote(null);
        setError('Invalid coordinate format. Use: X, Y, Z (e.g., 100, 64, -200)');
      }
    } catch (err) {
      setQuote(null);
      setError('Error calculating distance. Please check coordinate format.');
      console.error('Quote calculation error:', err);
    }

    setIsCalculating(false);
  }, [debouncedPickup, debouncedDelivery]);

  const scrollToForm = () => {
    const element = document.getElementById('submit-job');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Pre-fill coordinates in main form
      setTimeout(() => {
        const pickupField = document.getElementById('pickupCoords') as HTMLInputElement;
        const deliveryField = document.getElementById('dropoffCoords') as HTMLInputElement;
        
        if (pickupField && pickupCoords) pickupField.value = pickupCoords;
        if (deliveryField && deliveryCoords) deliveryField.value = deliveryCoords;
        
        // Trigger change events to update form state
        if (pickupField) pickupField.dispatchEvent(new Event('input', { bubbles: true }));
        if (deliveryField) deliveryField.dispatchEvent(new Event('input', { bubbles: true }));
      }, 500);
    }
  };

  // Auto-format coordinates as user types
  const handleCoordChange = (value: string, setter: (value: string) => void) => {
    // Auto-format common coordinate patterns
    let formatted = value;
    if (value.match(/^\d+\s+\d+\s+\d+$/)) {
      formatted = value.replace(/\s+/g, ", ");
    }
    setter(formatted);
  };
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Calculator className="h-6 w-6 text-white" />
        <h3 className="text-xl font-bold text-white">Quick Quote</h3>
        <span className="text-blue-200 text-sm">30-second estimate</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-blue-100 text-sm mb-1">Pickup</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-400" />
            <input
              type="text"
              value={pickupCoords}
              onChange={(e) => handleCoordChange(e.target.value, setPickupCoords)}
              placeholder="100, 64, -200"
              className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          {pickupCoords && !DistanceCalculator.parseCoordinates(pickupCoords) && (
            <p className="text-red-300 text-xs mt-1">Invalid format</p>
          )}
        </div>

        <div>
          <label className="block text-blue-100 text-sm mb-1">Delivery</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
            <input
              type="text"
              value={deliveryCoords}
              onChange={(e) => handleCoordChange(e.target.value, setDeliveryCoords)}
              placeholder="300, 64, 150"
              className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          {deliveryCoords && !DistanceCalculator.parseCoordinates(deliveryCoords) && (
            <p className="text-red-300 text-xs mt-1">Invalid format</p>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 mb-4">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Quote Display */}
      {isCalculating && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          <span className="ml-2 text-white">Calculating...</span>
        </div>
      )}

      {quote && !isCalculating && (
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{quote.distance}</div>
              <div className="text-blue-200 text-sm">blocks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                <Diamond className="h-5 w-5" />
                {quote.price}
              </div>
              <div className="text-blue-200 text-sm">diamonds</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">~{quote.time}</div>
              <div className="text-blue-200 text-sm">minutes</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Debug info for testing */}
      {process.env.NODE_ENV === 'development' && (pickupCoords || deliveryCoords) && (
        <div className="text-xs text-blue-200 mt-2">
          Debug: Pickup valid: {DistanceCalculator.parseCoordinates(pickupCoords) ? '✅' : '❌'} | Delivery valid: {DistanceCalculator.parseCoordinates(deliveryCoords) ? '✅' : '❌'}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={scrollToForm}
        disabled={!quote}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          quote
            ? 'bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 shadow-lg'
            : 'bg-white/20 text-white/60 cursor-not-allowed'
        }`}
      >
        {quote ? (
          <>
            <Zap className="h-4 w-4" />
            Submit Full Order
            <ArrowRight className="h-4 w-4" />
          </>
        ) : (
          <>
            <Calculator className="h-4 w-4" />
            Enter coordinates for quote
          </>
        )}
      </button>

      <div className="text-center mt-3">
        <p className="text-blue-200 text-xs">
          * Basic estimate with standard options. Full form for custom requirements.
        </p>
      </div>
    </div>
  );
};

export default QuickQuoteWidget;