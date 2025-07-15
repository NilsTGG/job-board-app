import React, { useState } from 'react';
import { ArrowRight, Diamond, Sparkles, ChevronDown, Calculator, MessageCircle } from 'lucide-react';
import { DistanceCalculator } from '../utils/distanceCalculator';
import { PricingCalculator } from '../utils/pricingCalculator';

const ProgressiveHero: React.FC = () => {
  const [showQuickStart, setShowQuickStart] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'quote' | 'submit' | null>(null);
  const [pickupCoords, setPickupCoords] = useState('');
  const [deliveryCoords, setDeliveryCoords] = useState('');
  const [quote, setQuote] = useState<{
    distance: number;
    price: number;
    time: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const calculatePrice = async () => {
    if (!pickupCoords.trim() || !deliveryCoords.trim()) {
      setError('Please enter both pickup and delivery coordinates');
      return;
    }

    setIsCalculating(true);
    setError(null);

    try {
      const pickup = DistanceCalculator.parseCoordinates(pickupCoords);
      const delivery = DistanceCalculator.parseCoordinates(deliveryCoords);

      if (!pickup || !delivery) {
        setError('Invalid coordinate format. Use: X, Y, Z (e.g., 100, 64, -200)');
        setIsCalculating(false);
        return;
      }

      // Simulate brief calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));

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
    } catch (err) {
      setError('Error calculating distance. Please check coordinate format.');
      console.error('Quote calculation error:', err);
    }

    setIsCalculating(false);
  };

  const handleCoordChange = (value: string, setter: (value: string) => void) => {
    // Auto-format coordinates
    let formatted = value;
    if (value.match(/^\d+\s+\d+\s+\d+$/)) {
      formatted = value.replace(/\s+/g, ", ");
    }
    setter(formatted);
    
    // Clear quote and error when coordinates change
    if (quote) setQuote(null);
    if (error) setError(null);
  };

  return (
    <section className="pt-16 pb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Primary Value Proposition */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Diamond className="h-16 w-16 text-blue-400 animate-pulse" />
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Because You Won't™
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Minecraft delivery service for players whose time is worth more than transport costs.
          </p>

          {/* Quick Stats Bar */}
          <div className="flex justify-center items-center gap-6 mb-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Online Now</span>
            </div>
            <div>•</div>
            <div>1,247+ Deliveries</div>
            <div>•</div>
            <div>99.2% Success Rate</div>
          </div>
        </div>

        {/* Progressive Action Selection */}
        {!selectedAction ? (
          <div className="space-y-4">
            <p className="text-center text-gray-300 mb-6">What do you need?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button
                onClick={() => setSelectedAction('quote')}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all duration-300 hover:scale-105 text-left"
              >
                <Calculator className="h-8 w-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Quick Price Quote</h3>
                <p className="text-gray-400 text-sm">Get instant pricing for your delivery</p>
                <div className="flex items-center text-blue-400 text-sm mt-3">
                  <span>30 seconds</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => setSelectedAction('submit')}
                className="group bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/50 rounded-lg p-6 hover:border-blue-400 transition-all duration-300 hover:scale-105 text-left"
              >
                <MessageCircle className="h-8 w-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Submit Full Job</h3>
                <p className="text-gray-400 text-sm">Complete delivery request form</p>
                <div className="flex items-center text-purple-400 text-sm mt-3">
                  <span>2-3 minutes</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="text-center mt-8">
              <button
                onClick={() => setShowQuickStart(!showQuickStart)}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 mx-auto"
              >
                <span>First time here?</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showQuickStart ? 'rotate-180' : ''}`} />
              </button>
              
              {showQuickStart && (
                <div className="mt-4 p-4 bg-gray-800/30 rounded-lg max-w-md mx-auto">
                  <p className="text-gray-300 text-sm mb-3">
                    We deliver items across Minecraft so you don't have to. Payment in diamonds only.
                  </p>
                  <div className="flex gap-2 text-xs">
                    <button 
                      onClick={() => scrollToSection('services')}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      See Services
                    </button>
                    <span className="text-gray-500">•</span>
                    <button 
                      onClick={() => scrollToSection('pricing')}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View Pricing
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Selected Action Flow */
          <div className="max-w-md mx-auto">
            {selectedAction === 'quote' && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-400" />
                  Quick Quote
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Pickup Coordinates</label>
                    <input
                      type="text"
                      value={pickupCoords}
                      onChange={(e) => handleCoordChange(e.target.value, setPickupCoords)}
                      placeholder="100, 64, -200"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const nextInput = e.currentTarget.parentElement?.parentElement?.nextElementSibling?.querySelector('input');
                          if (nextInput) {
                            (nextInput as HTMLInputElement).focus();
                          } else if (pickupCoords && deliveryCoords) {
                            calculatePrice();
                          }
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Delivery Coordinates</label>
                    <input
                      type="text"
                      value={deliveryCoords}
                      onChange={(e) => handleCoordChange(e.target.value, setDeliveryCoords)}
                      placeholder="300, 64, 150"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (pickupCoords && deliveryCoords) {
                            calculatePrice();
                          }
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  {/* Error Display */}
                  {error && (
                    <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Quote Display */}
                  {quote && (
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-white">{quote.distance}</div>
                          <div className="text-green-300 text-xs">blocks</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-400 flex items-center justify-center gap-1">
                            <Diamond className="h-4 w-4" />
                            {quote.price}
                          </div>
                          <div className="text-green-300 text-xs">diamonds</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">~{quote.time}</div>
                          <div className="text-green-300 text-xs">minutes</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={calculatePrice}
                    disabled={!pickupCoords.trim() || !deliveryCoords.trim() || isCalculating}
                    className={`w-full py-2 rounded transition-colors ${
                      pickupCoords.trim() && deliveryCoords.trim() && !isCalculating
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isCalculating ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Calculating...
                      </div>
                    ) : (
                      'Calculate Price'
                    )}
                  </button>
                  
                  {/* Submit to Full Form Button */}
                  {quote && (
                    <button
                      onClick={() => {
                        scrollToSection('submit-job');
                        // Pre-fill the main form with coordinates
                        setTimeout(() => {
                          const pickupField = document.getElementById('pickupCoords') as HTMLInputElement;
                          const deliveryField = document.getElementById('dropoffCoords') as HTMLInputElement;
                          
                          if (pickupField && pickupCoords) {
                            pickupField.value = pickupCoords;
                            pickupField.dispatchEvent(new Event('input', { bubbles: true }));
                          }
                          if (deliveryField && deliveryCoords) {
                            deliveryField.value = deliveryCoords;
                            deliveryField.dispatchEvent(new Event('input', { bubbles: true }));
                          }
                        }, 500);
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 rounded hover:from-green-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Submit Full Order
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {selectedAction === 'submit' && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-purple-400" />
                  Job Submission
                </h3>
                <button
                  onClick={() => scrollToSection('submit-job')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Start Full Form
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            <button
              onClick={() => setSelectedAction(null)}
              className="text-gray-400 hover:text-white text-sm mt-4 mx-auto block"
            >
              ← Back to options
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgressiveHero;