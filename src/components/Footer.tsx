import React from 'react';
import { Package, Heart, Github, Twitter, Disc as Discord } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold text-white">Because You Won't™</span>
            </div>
            <p className="text-gray-400">
              Professional Minecraft delivery service for all your item transport needs.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a></li>
              <li><a href="#submit-job" className="hover:text-blue-400 transition-colors">Submit Job</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Service Details</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Payment in diamonds only</li>
              <li>• Delivery times are estimates</li>
              <li>• Professional service guaranteed</li>
              <li>• All dimensions covered</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Discord className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-400" /> and a touch of good humor
          </p>
          <p className="text-gray-500 text-xs italic mt-2">
            Disclaimer: All reviews and statistics on this site are fictional and for demonstration only. Please don't take them too seriously!
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2024 Because You Won't™. All rights reserved. Terms apply. Side effects may include dependency on delivery services.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;