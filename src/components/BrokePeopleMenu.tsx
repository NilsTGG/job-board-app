import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Coins, AlertTriangle, Shield, Clock, Package, Users, Home, Zap } from 'lucide-react';
import { PricingService } from '../services/PricingService';

const BrokePeopleMenu: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const brokeServices = [
    {
      icon: Package,
      service: "Basic Delivery (within 300 blocks)",
      price: `${PricingService.getBrokePersonPrice('basic-delivery', 300)} diamonds`,
      notes: "Includes sarcasm and passive-aggression at no extra cost.",
      expandedContent: "Look, I get it. You're broke. But even broke people need stuff moved sometimes. This covers short-distance hauling within a reasonable area. Don't expect me to be happy about the low pay, but I'll do it. Barely.",
      color: "blue"
    },
    {
      icon: Zap,
      service: "Multi-Shop Delivery",
      price: `${PricingService.getBrokePersonPrice('multi-shop', 500)} diamonds`,
      notes: "Because you couldn't walk to two places. Tragic.",
      expandedContent: "The absolute minimum for coordinating multiple shop visits. I'll hit 2-3 shops max for this price. Want more? Pay more. It's not rocket science, it's basic economics.",
      color: "orange"
    },
    {
      icon: Users,
      service: "Villager Transport",
      price: `${PricingService.getBrokePersonPrice('villager-transport', 400)} diamonds (with insurance)`,
      notes: "Without insurance? You don't even want to know.",
      expandedContent: "Villagers are the worst. They're slow, they're stupid, and they die if you look at them wrong. 8 diamonds includes basic 'oops I killed your librarian' insurance. Without insurance? 5 diamonds and you're gambling with your trades.",
      color: "green"
    },
    {
      icon: Home,
      service: "Item Relocation (within your base)",
      price: `${PricingService.getBrokePersonPrice('item-relocation', 50)} diamonds`,
      notes: "Literally carrying something 10 blocks. Can't believe this is real.",
      expandedContent: "This is for when you're too lazy to move stuff within your own base. I'm talking chest-to-chest, farm-to-storage type moves. It's embarrassing that this service exists, but here we are.",
      color: "purple"
    },
    {
      icon: AlertTriangle,
      service: "Emergency Rescue",
      price: `Starts at ${PricingService.getBrokePersonPrice('emergency-rescue', 600)} diamonds`,
      notes: "Oh no, you're stuck. Again.",
      expandedContent: "Got yourself into trouble? Died in lava? Lost in a cave? I'll bail you out, but I'm going to judge you the entire time. Price goes up based on how stupid your situation is.",
      color: "red"
    },
    {
      icon: Clock,
      service: "Low Priority Queue Slot",
      price: `${PricingService.getBrokePersonPrice('low-priority', 100)} diamond`,
      notes: "I'll get to it. Eventually. Maybe.",
      expandedContent: "Rock bottom pricing for rock bottom service. Your job goes to the very end of my list. Perfect for non-urgent tasks when you're really, truly broke. No guarantees on timing.",
      color: "gray"
    }
  ];

  const addOns = [
    {
      name: '"Rush Job" Fee',
      price: '+5 diamonds',
      description: 'Your emergency ≠ my urgency, but money talks.'
    },
    {
      name: '"I Feel Bad" Tip Option',
      price: "Whatever's left in your ender chest",
      description: 'You know who you are.'
    }
  ];

  const originalEstimates = [
    { service: 'Basic delivery', price: '5 diamonds' },
    { service: 'Long-distance (Nether, End, etc)', price: '10–15 diamonds' },
    { service: 'Shopping on behalf of someone', price: '5–7 diamonds + item cost' },
    { service: 'Villager transport', price: '10–12 diamonds (with optional "rage insurance")' },
    { service: 'Risk missions (PvP zone)', price: '"Negotiable" (read: dangerous and expensive)' },
    { service: 'Credit jobs', price: '20% markup, collateral required (no IOUs unless funny)' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-600 group-hover:bg-blue-500",
      orange: "bg-orange-600 group-hover:bg-orange-500",
      green: "bg-green-600 group-hover:bg-green-500", 
      purple: "bg-purple-600 group-hover:bg-purple-500",
      red: "bg-red-600 group-hover:bg-red-500",
      gray: "bg-gray-600 group-hover:bg-gray-500",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with expandable trigger */}
        <div className="text-center mb-12">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg mx-auto flex items-center gap-3"
          >
            <Coins className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">
              🪙 Broke People Menu™
            </span>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-white group-hover:text-yellow-200 transition-colors" />
            ) : (
              <ChevronDown className="h-5 w-5 text-white group-hover:text-yellow-200 transition-colors" />
            )}
          </button>
          
          {isExpanded && (
            <div className="mt-6 space-y-2">
              <p className="text-xl text-gray-300 italic">
                "Because even cheapskates deserve service. Just not fast service."
              </p>
              <p className="text-sm text-gray-400">
                A beautiful, deeply sarcastic gesture of generosity aimed at the poor, the diamond-deficient, and the tragically unprepared.
              </p>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="space-y-8">
            {/* Main Services Table */}
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-3">
                <h3 className="text-white font-bold text-lg">Budget Services</h3>
              </div>
              
              <div className="divide-y divide-gray-700">
                {brokeServices.map((item, index) => (
                  <div key={index} className="group hover:bg-gray-800 transition-colors">
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleItem(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${getColorClasses(item.color)}`}>
                            <item.icon className="h-5 w-5 text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h4 className="text-white font-medium">{item.service}</h4>
                              <div className="text-yellow-400 font-bold flex items-center gap-2">
                                {item.price}
                                {index === 2 && <Shield className="h-4 w-4 text-blue-400" />}
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{item.notes}</p>
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          {expandedItems.includes(index) ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      {expandedItems.includes(index) && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {item.expandedContent}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons Section */}
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3">
                <h3 className="text-white font-bold text-lg">🧂 Optional Add-ons</h3>
              </div>
              
              <div className="p-6 space-y-4">
                {addOns.map((addon, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <div>
                      <div className="text-white font-medium">{addon.name}</div>
                      <div className="text-gray-400 text-sm">{addon.description}</div>
                    </div>
                    <div className="text-orange-400 font-bold">{addon.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Original Estimates Section */}
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3">
                <h3 className="text-white font-bold text-lg">💡 Original Price Estimates</h3>
                <p className="text-blue-200 text-sm">From back when you still had optimism</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {originalEstimates.map((estimate, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                      <div className="text-gray-300">{estimate.service}</div>
                      <div className="text-blue-400 font-medium">{estimate.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom disclaimer */}
            <div className="text-center bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium">Broke People Menu™ Terms</span>
              </div>
              <div className="text-gray-300 text-sm space-y-2">
                <p>• All prices are minimums. Actual costs may vary based on your level of helplessness.</p>
                <p>• "Budget" doesn't mean "fast" or "with a smile."</p>
                <p>• Payment due upfront. No credit for broke people. That's the whole point.</p>
                <p>• Attitude adjustment not included in any package.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrokePeopleMenu;