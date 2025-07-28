import React, { useState } from "react";
import { Package, Heart, Disc as Discord } from "lucide-react";
import PrivacyPolicy from "./PrivacyPolicy";

const Footer: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showDiscordToast, setShowDiscordToast] = useState(false);
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">
                Because You Won't™
              </span>
            </div>
            <p className="text-gray-400">
              Professional Minecraft delivery service for all your item
              transport needs.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#services"
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#submit-job"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg block text-center"
                >
                  Submit Job
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-blue-400 transition-colors underline bg-transparent border-none p-0 m-0 text-left"
                  onClick={() => setShowPrivacy(true)}
                >
                  Privacy Policy
                </button>
              </li>
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
              <button
                onClick={() => setShowDiscordToast(true)}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Show Discord username"
              >
                <Discord className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-400" /> and a touch of
            good humor
          </p>
          <p className="text-gray-500 text-xs italic mt-2">
            Disclaimer: All reviews and statistics on this site are fictional
            and for demonstration only. Please don't take them too seriously!
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2024 Because You Won't™. All rights reserved. Terms apply. Side
            effects may include dependency on delivery services.
          </p>
        </div>
      </div>
    {/* Discord Toast Popup */}
    {showDiscordToast && (
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-gray-800 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 border border-blue-600">
          <Discord className="h-6 w-6 text-blue-400" />
          <span className="font-semibold">Discord:</span>
          <span className="text-blue-300">NilsTG</span>
          <button
            onClick={() => setShowDiscordToast(false)}
            className="ml-4 text-gray-400 hover:text-white text-lg font-bold px-2"
            aria-label="Close Discord popup"
          >
            ×
          </button>
        </div>
      </div>
    )}
    {/* Privacy Policy Modal */}
    {showPrivacy && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="relative">
          <button
            onClick={() => setShowPrivacy(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold px-2"
            aria-label="Close Privacy Policy"
          >
            ×
          </button>
          <PrivacyPolicy />
        </div>
      </div>
    )}
  </footer>
  );
};

export default Footer;
