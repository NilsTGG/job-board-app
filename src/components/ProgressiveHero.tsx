import React, { useState } from 'react';
import { ArrowRight, Diamond, Sparkles, ChevronDown, Calculator, MessageCircle } from 'lucide-react';
import { NavigationService } from '../services/NavigationService';
import UnifiedQuoteWidget from './UnifiedQuoteWidget';

const ProgressiveHero: React.FC = () => {
  const [showQuickStart, setShowQuickStart] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'quote' | 'submit' | null>(null);


  return (
    <section id="hero" className="pt-16 pb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 min-h-screen flex items-center">
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
                      onClick={() => NavigationService.scrollToSection('services')}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      See Services
                    </button>
                    <span className="text-gray-500">•</span>
                    <button 
                      onClick={() => NavigationService.scrollToSection('pricing')}
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
              <UnifiedQuoteWidget variant="hero" />
            )}

            {selectedAction === 'submit' && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-purple-400" />
                  Job Submission
                </h3>
                <button
                  onClick={() => NavigationService.scrollToSection('submit-job')}
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