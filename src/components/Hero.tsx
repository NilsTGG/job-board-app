import React from 'react';
import { ArrowRight, Diamond } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToForm = () => {
    const element = document.getElementById('submit-job');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-16 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Diamond className="h-20 w-20 text-blue-400 animate-pulse" />
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Because You Won't™
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Minecraft item delivery service. Because walking is overrated.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={scrollToForm}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
            >
              Submit Job (Because You Won't)
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="text-gray-400 text-sm">
              * Payment accepted in diamonds only. Obviously.
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-blue-400 text-3xl font-bold mb-2">24/7</div>
              <div className="text-gray-300">Available (terms apply)</div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-blue-400 text-3xl font-bold mb-2">100%</div>
              <div className="text-gray-300">Delivery rate (mostly)</div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-blue-400 text-3xl font-bold mb-2">0%</div>
              <div className="text-gray-300">Chance I'll be nice about it</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;