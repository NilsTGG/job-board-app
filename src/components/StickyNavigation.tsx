import React, { useState, useEffect } from 'react';
import { Calculator, MessageCircle, Package, Diamond, Menu, X } from 'lucide-react';

const StickyNavigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky nav after hero section
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
      
      // Update active section
      const sections = ['services', 'pricing', 'submit-job'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'services', label: 'Services', icon: Package },
    { id: 'pricing', label: 'Pricing', icon: Diamond },
    { id: 'submit-job', label: 'Submit Job', icon: MessageCircle, primary: true }
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Sticky Navigation */}
      <div className="hidden md:block fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : item.primary
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute bottom-16 right-0 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl min-w-[200px]">
            <div className="p-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Action Buttons - Mobile */}
      <div className="md:hidden fixed bottom-24 right-6 z-40 space-y-3">
        <button
          onClick={() => scrollToSection('submit-job')}
          className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          title="Submit Job"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollToSection('pricing')}
          className="bg-gray-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          title="Quick Quote"
        >
          <Calculator className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};

export default StickyNavigation;