import React from 'react';
import { useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import ProgressiveHero from './components/ProgressiveHero';
import StickyNavigation from './components/StickyNavigation';
import ModularServices from './components/ModularServices';
import Stats from './components/Stats';
import Pricing from './components/Pricing';
import ConversationalForm from './components/ConversationalForm';
import Footer from './components/Footer';
import UnifiedQuoteWidget from './components/UnifiedQuoteWidget';
import { useKonamiCode } from './hooks/useKonamiCode';
import ProgressiveEnhancement from './components/ProgressiveEnhancement';
import { useDeliveryStore } from './store/deliveryStore';
import { 
  LazyTestimonials,
  LazyFAQ,
  LazyBrokePeopleMenu,
  LazyCourierProfile,
  SuspenseSection,
  SuspenseGeneric
} from './components/LazyComponents';

// Memoized components for better performance
const MemoizedProgressiveHero = React.memo(ProgressiveHero);
const MemoizedModularServices = React.memo(ModularServices);
const MemoizedStats = React.memo(Stats);
const MemoizedPricing = React.memo(Pricing);
const MemoizedConversationalForm = React.memo(ConversationalForm);
const MemoizedUnifiedQuoteWidget = React.memo(UnifiedQuoteWidget);
const MemoizedFooter = React.memo(Footer);

function App() {
  const { isActivated } = useKonamiCode();
  const { trackVisitor } = useDeliveryStore();

  // Track visitor on app load
  useEffect(() => {
    trackVisitor();
  }, [trackVisitor]);

  const fallbackContent = (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Because You Won't™</h1>
        <p className="text-xl mb-8">Minecraft item delivery service. Because walking is overrated.</p>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Submit a Job (Basic Form)</h2>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Minecraft Username" 
              className="w-full p-3 bg-gray-700 rounded text-white"
            />
            <input 
              type="text" 
              placeholder="Items to deliver" 
              className="w-full p-3 bg-gray-700 rounded text-white"
            />
            <input 
              type="text" 
              placeholder="Pickup coordinates" 
              className="w-full p-3 bg-gray-700 rounded text-white"
            />
            <input 
              type="text" 
              placeholder="Delivery coordinates" 
              className="w-full p-3 bg-gray-700 rounded text-white"
            />
            <input 
              type="text" 
              placeholder="Payment offer" 
              className="w-full p-3 bg-gray-700 rounded text-white"
            />
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
            >
              Submit Job Request
            </button>
          </form>
        </div>
        
        <div className="text-center text-gray-400">
          <p>For the full experience with enhanced features, please enable JavaScript.</p>
        </div>
      </div>
    </div>
  );
  return (
    <ProgressiveEnhancement 
      fallbackContent={fallbackContent}
      enableOfflineSupport={true}
    >
      <ErrorBoundary>
        <div className={`min-h-screen bg-gray-900 text-white ${isActivated ? 'animate-pulse' : ''}`}>
          <div className={isActivated ? 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-[length:400%_400%] animate-gradient' : ''}>
            {/* Sticky Navigation */}
            <StickyNavigation />
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Hero section temporarily unavailable</div>}>
              <MemoizedProgressiveHero />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Services section temporarily unavailable</div>}>
              <MemoizedModularServices />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Stats section temporarily unavailable</div>}>
              <MemoizedStats />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Pricing section temporarily unavailable</div>}>
              <MemoizedPricing />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Quote calculator temporarily unavailable</div>}>
              <section className="py-16 bg-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Advanced Quote Calculator
                    </h2>
                    <p className="text-xl text-gray-400">
                      Get detailed pricing with custom options
                    </p>
                  </div>
                  <MemoizedUnifiedQuoteWidget variant="section" showFullCalculator={true} />
                </div>
              </section>
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Testimonials section temporarily unavailable</div>}>
              <SuspenseSection>
                <LazyTestimonials />
              </SuspenseSection>
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Job form temporarily unavailable</div>}>
              <section id="submit-job" className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Submit Your Job
                    </h2>
                    <p className="text-xl text-gray-400">
                      Let's get your stuff moved (so you don't have to)
                    </p>
                  </div>
                  <MemoizedConversationalForm />
                </div>
              </section>
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Budget menu temporarily unavailable</div>}>
              <SuspenseGeneric text="Loading budget options...">
                <LazyBrokePeopleMenu />
              </SuspenseGeneric>
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Courier profile temporarily unavailable</div>}>
              <SuspenseSection>
                <LazyCourierProfile />
              </SuspenseSection>
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">FAQ section temporarily unavailable</div>}>
              <SuspenseGeneric text="Loading FAQ...">
                <LazyFAQ />
              </SuspenseGeneric>
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Footer temporarily unavailable</div>}>
              <MemoizedFooter />
            </ErrorBoundary>
          </div>
          
          {isActivated && (
            <div className="fixed top-20 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
              🎉 Ultra Attitude Mode Activated! Discount code: CHEAT_DIAMONDS
            </div>
          )}
        </div>
      </ErrorBoundary>
    </ProgressiveEnhancement>
  );
}

export default App;