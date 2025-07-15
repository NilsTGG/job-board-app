import React, { useState, useEffect } from 'react';
import { Calculator, Diamond, MapPin, ArrowRight, Zap, Loader2, AlertCircle } from 'lucide-react';
import { useDeliveryStore } from '../store/deliveryStore';
import { PricingService } from '../services/PricingService';
import { NavigationService } from '../services/NavigationService';
import { useDebounce } from '../hooks/useDebounce';

interface UnifiedQuoteWidgetProps {
  variant?: 'hero' | 'section' | 'inline';
  showFullCalculator?: boolean;
  onQuoteCalculated?: (quote: any) => void;
}

const UnifiedQuoteWidget: React.FC<UnifiedQuoteWidgetProps> = ({
  variant = 'inline',
  showFullCalculator = false,
  onQuoteCalculated
}) => {
  const {
    formData,
    currentQuote,
    isCalculatingQuote,
    quoteError,
    updateFormData,
    setQuote,
    setCalculatingQuote,
    setQuoteError
  } = useDeliveryStore();

  const [localPickup, setLocalPickup] = useState(formData.pickupCoords);
  const [localDelivery, setLocalDelivery] = useState(formData.dropoffCoords);
  const [advancedOptions, setAdvancedOptions] = useState({
    urgency: formData.urgency,
    insurance: formData.insurance,
    serviceType: 'delivery' as const,
    itemValue: 'valuable' as const
  });

  // Debounce coordinate inputs
  const debouncedPickup = useDebounce(localPickup, 500);
  const debouncedDelivery = useDebounce(localDelivery, 500);

  // Auto-calculate when coordinates change
  useEffect(() => {
    if (debouncedPickup && debouncedDelivery) {
      calculateQuote();
    } else {
      setQuote(null);
      setQuoteError(null);
    }
  }, [debouncedPickup, debouncedDelivery, advancedOptions]);

  const calculateQuote = async () => {
    if (!debouncedPickup.trim() || !debouncedDelivery.trim()) return;

    setCalculatingQuote(true);
    setQuoteError(null);

    try {
      const quote = await PricingService.getQuote(
        debouncedPickup,
        debouncedDelivery,
        showFullCalculator ? advancedOptions : { urgency: 'soon', insurance: 'basic' }
      );

      setQuote(quote);
      
      // Update form data
      updateFormData('pickupCoords', debouncedPickup);
      updateFormData('dropoffCoords', debouncedDelivery);
      
      if (onQuoteCalculated) {
        onQuoteCalculated(quote);
      }
    } catch (error) {
      setQuoteError(error instanceof Error ? error.message : 'Calculation failed');
    } finally {
      setCalculatingQuote(false);
    }
  };

  const handleCoordChange = (value: string, setter: (value: string) => void) => {
    // Auto-format coordinates
    let formatted = value;
    if (value.match(/^\d+\s+\d+\s+\d+$/)) {
      formatted = value.replace(/\s+/g, ", ");
    }
    setter(formatted);
  };

  const handleSubmitToForm = () => {
    NavigationService.scrollToSection('submit-job');
  };

  const handleKeyDown = (e: React.KeyboardEvent, isDeliveryField = false) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isDeliveryField && currentQuote) {
        handleSubmitToForm();
      } else if (!isDeliveryField) {
        // Focus delivery field
        const deliveryInput = document.querySelector('[data-delivery-input]') as HTMLInputElement;
        if (deliveryInput) {
          deliveryInput.focus();
        }
      }
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white';
      case 'section':
        return 'bg-gray-800 border border-gray-700 text-white';
      default:
        return 'bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white';
    }
  };

  return (
    <div className={`rounded-lg p-6 shadow-lg ${getVariantStyles()}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Calculator className="h-6 w-6" />
        <h3 className="text-xl font-bold">
          {showFullCalculator ? 'Advanced Quote Calculator' : 'Quick Quote'}
        </h3>
        {!showFullCalculator && (
          <span className="text-sm opacity-75">30-second estimate</span>
        )}
      </div>

      {/* Coordinate Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2 opacity-90">
            Pickup Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-400" />
            <input
              type="text"
              value={localPickup}
              onChange={(e) => handleCoordChange(e.target.value, setLocalPickup)}
              onKeyDown={(e) => handleKeyDown(e, false)}
              placeholder="100, 64, -200"
              className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 opacity-90">
            Delivery Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
            <input
              type="text"
              value={localDelivery}
              onChange={(e) => handleCoordChange(e.target.value, setLocalDelivery)}
              onKeyDown={(e) => handleKeyDown(e, true)}
              placeholder="300, 64, 150"
              data-delivery-input
              className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>
      </div>

      {/* Advanced Options */}
      {showFullCalculator && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 opacity-90">Urgency</label>
            <select
              value={advancedOptions.urgency}
              onChange={(e) => setAdvancedOptions(prev => ({ ...prev, urgency: e.target.value as any }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="whenever">Whenever (-20%)</option>
              <option value="soon">Soon-ish</option>
              <option value="urgent">ASAP (+50%)</option>
              <option value="emergency">Emergency (+100%)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 opacity-90">Insurance</label>
            <select
              value={advancedOptions.insurance}
              onChange={(e) => setAdvancedOptions(prev => ({ ...prev, insurance: e.target.value as any }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="none">None (YOLO)</option>
              <option value="basic">Basic (+2 diamonds)</option>
              <option value="premium">Premium (+5 diamonds)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 opacity-90">Service</label>
            <select
              value={advancedOptions.serviceType}
              onChange={(e) => setAdvancedOptions(prev => ({ ...prev, serviceType: e.target.value as any }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="delivery">Delivery</option>
              <option value="shopping">Shopping</option>
              <option value="rescue">Rescue</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 opacity-90">Item Value</label>
            <select
              value={advancedOptions.itemValue}
              onChange={(e) => setAdvancedOptions(prev => ({ ...prev, itemValue: e.target.value as any }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="cheap">Cheap</option>
              <option value="valuable">Valuable</option>
              <option value="precious">Precious</option>
              <option value="irreplaceable">Irreplaceable</option>
            </select>
          </div>
        </div>
      )}

      {/* Error Display */}
      {quoteError && (
        <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <p className="text-red-300 text-sm">{quoteError}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isCalculatingQuote && (
        <div className="flex items-center justify-center py-4 mb-4">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Calculating quote...</span>
        </div>
      )}

      {/* Quote Display */}
      {currentQuote && !isCalculatingQuote && (
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <div className="text-2xl font-bold">{currentQuote.distance}</div>
              <div className="text-sm opacity-75">blocks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                <Diamond className="h-5 w-5" />
                {currentQuote.price}
              </div>
              <div className="text-sm opacity-75">diamonds</div>
            </div>
            <div>
              <div className="text-2xl font-bold">~{currentQuote.estimatedTime}</div>
              <div className="text-sm opacity-75">minutes</div>
            </div>
          </div>

          {/* Price Breakdown */}
          {showFullCalculator && (
            <div className="border-t border-white/20 pt-3">
              <h4 className="font-medium mb-2 text-sm">Price Breakdown:</h4>
              <div className="space-y-1">
                {currentQuote.breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="opacity-75">{item.factor}:</span>
                    <span className={item.cost >= 0 ? '' : 'text-green-400'}>
                      {item.cost >= 0 ? '+' : ''}{item.cost} 💎
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleSubmitToForm}
        disabled={!currentQuote}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          currentQuote
            ? 'bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 shadow-lg'
            : 'bg-white/20 text-white/60 cursor-not-allowed'
        }`}
      >
        {currentQuote ? (
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

      {/* Help Text */}
      <div className="text-center mt-3">
        <p className="text-xs opacity-75">
          * {showFullCalculator ? 'Detailed' : 'Basic'} estimate with {showFullCalculator ? 'custom' : 'standard'} options
        </p>
      </div>
    </div>
  );
};

export default UnifiedQuoteWidget;