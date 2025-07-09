import React from 'react';
import { User, MapPin, Clock, Star, Coffee } from 'lucide-react';

const CourierProfile: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet Your Courier
          </h2>
          <p className="text-xl text-gray-400">
            Professional item delivery specialist
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-4xl">🦊</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">FoxCart_Delivery</h3>
              <p className="text-blue-400 mb-4">Professional Item Relocator & Part-Time Philosopher</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">847</div>
                  <div className="text-sm text-gray-400">Deliveries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">99.9%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">4.2</div>
                  <div className="text-sm text-gray-400">Star Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">∞</div>
                  <div className="text-sm text-gray-400">Sarcasm Level</div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                "Started this delivery service three years ago when I realized there was a real need 
                for reliable item transport. Been perfecting the routes and service ever since."
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  All Dimensions
                </span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  24/7 (When Awake)
                </span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Coffee className="h-3 w-3" />
                  Caffeine Dependent
                </span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Professionally Grumpy
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-3">Recent Reviews</h4>
            <div className="space-y-3">
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-gray-300 text-sm">"Fast delivery, but why so grumpy?"</p>
                <p className="text-gray-500 text-xs">- Steve_Builder</p>
              </div>
              <div className="border-l-2 border-green-500 pl-3">
                <p className="text-gray-300 text-sm">"Got my diamonds delivered safely. Attitude was... memorable."</p>
                <p className="text-gray-500 text-xs">- DiamondHunter99</p>
              </div>
              <div className="border-l-2 border-yellow-500 pl-3">
                <p className="text-gray-300 text-sm">"10/10 would get roasted again"</p>
                <p className="text-gray-500 text-xs">- NoobMiner2024</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-3">Fun Facts (That aren't fun)</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Has been stuck in a minecart for 3 years</li>
              <li>• Knows every shortcut in the Overworld</li>
              <li>• Once delivered 64 dirt blocks to the End</li>
              <li>• Powered entirely by spite and energy drinks</li>
              <li>• Has never lost a package (yet)</li>
              <li>• Considers customer service a form of art</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourierProfile;