import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import JobForm from './components/JobForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { useKonamiCode } from './hooks/useKonamiCode';

function App() {
  const { isActivated } = useKonamiCode();

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${isActivated ? 'animate-pulse' : ''}`}>
      <div className={isActivated ? 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-[length:400%_400%] animate-gradient' : ''}>
        <Header />
        <Hero />
        <Services />
        <Pricing />
        <JobForm />
        <FAQ />
        <Footer />
      </div>
      
      {isActivated && (
        <div className="fixed top-20 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
          🎉 Ultra Attitude Mode Activated! Discount code: CHEAT_DIAMONDS
        </div>
      )}
    </div>
  );
}

export default App;