import React, { useState } from 'react';
import { Menu, X, Package, Bell } from 'lucide-react';
import { NavigationService } from '../services/NavigationService';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications] = useState(3); // Simulated notification count

  const scrollToSection = (sectionId: string) => {
    NavigationService.scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">Because You Won't™</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <div className="flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('submit-job')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Submit Job
            </button>
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => alert('📦 New delivery requests available!\n\n• BuilderBob2024: 64 Oak Logs\n• NoobMiner: Emergency food delivery\n• PvPMaster: Diamond armor transport')}
                className="text-gray-300 hover:text-blue-400 transition-colors p-2"
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('submit-job')}
                className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Job
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;