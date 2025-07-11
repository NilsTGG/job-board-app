import React from 'react';
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
import Footer from './components/Footer';
import { useKonamiCode } from './hooks/useKonamiCode';
import ProgressiveEnhancement from './components/ProgressiveEnhancement';

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
      <div className={`min-h-screen bg-gray-900 text-white ${isActivated ? 'animate-pulse' : ''}`}>
        <div className={isActivated ? 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-[length:400%_400%] animate-gradient' : ''}>
          <Header />
          <Hero />
          <Services />
          <Stats />
          <Pricing />
          <Testimonials />
          <JobForm />
          <BrokePeopleMenu />
          <CourierProfile />
          <FAQ />
          <Footer />
        </div>
        
        {isActivated && (
          <div className="fixed top-20 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
            🎉 Ultra Attitude Mode Activated! Discount code: CHEAT_DIAMONDS
          </div>
        )}
      </div>
    </ProgressiveEnhancement>
  );
}

export default App;