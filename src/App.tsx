import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Stats from './components/Stats';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import JobForm from './components/JobForm';
import CourierProfile from './components/CourierProfile';
import BrokePeopleMenu from './components/BrokePeopleMenu';
import FAQ from './components/FAQ';
import SmartPricingCalculator from './components/SmartPricingCalculator';
import Footer from './components/Footer';
import { useKonamiCode } from './hooks/useKonamiCode';
import ProgressiveEnhancement from './components/ProgressiveEnhancement';

// Memoized components for better performance
const MemoizedHeader = React.memo(Header);
const MemoizedHero = React.memo(Hero);
const MemoizedServices = React.memo(Services);
const MemoizedStats = React.memo(Stats);
const MemoizedPricing = React.memo(Pricing);
const MemoizedSmartPricingCalculator = React.memo(SmartPricingCalculator);
const MemoizedTestimonials = React.memo(Testimonials);
const MemoizedJobForm = React.memo(JobForm);
const MemoizedBrokePeopleMenu = React.memo(BrokePeopleMenu);
const MemoizedCourierProfile = React.memo(CourierProfile);
const MemoizedFAQ = React.memo(FAQ);
const MemoizedFooter = React.memo(Footer);

function App() {
  const { isActivated } = useKonamiCode();

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
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Navigation temporarily unavailable</div>}>
              <MemoizedHeader />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Hero section temporarily unavailable</div>}>
              <MemoizedHero />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Services section temporarily unavailable</div>}>
              <MemoizedServices />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Stats section temporarily unavailable</div>}>
              <MemoizedStats />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Pricing section temporarily unavailable</div>}>
              <MemoizedPricing />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Pricing calculator temporarily unavailable</div>}>
              <MemoizedSmartPricingCalculator />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Testimonials section temporarily unavailable</div>}>
              <MemoizedTestimonials />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Job form temporarily unavailable. Please contact us directly on Discord.</div>}>
              <MemoizedJobForm />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Budget menu temporarily unavailable</div>}>
              <MemoizedBrokePeopleMenu />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">Courier profile temporarily unavailable</div>}>
              <MemoizedCourierProfile />
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<div className="p-4 text-center text-red-400">FAQ section temporarily unavailable</div>}>
              <MemoizedFAQ />
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