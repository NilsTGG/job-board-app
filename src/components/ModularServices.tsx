import React from 'react';
import { Truck, Zap, Clock, Shield, Users, Package, ArrowRight } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

const ModularServices: React.FC = () => {
  const coreServices = [
    {
      icon: <Truck className="h-6 w-6 text-blue-400" />,
      title: "Item Delivery",
      subtitle: "Because walking is overrated",
      preview: "5-15 diamonds",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Free shulkers don't make the journey less boring. Why spend 2 hours loading, 
            traveling, and unloading when you could be building your dream project?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">What's Included:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Any item, any distance</li>
                <li>• I risk my life, you don't</li>
                <li>• Zero effort required from you</li>
                <li>• Your time &gt; diamond cost</li>
              </ul>
            </div>
            <div className="bg-blue-900/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">Pricing:</h4>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>• Base: 3 diamonds</li>
                <li>• Distance: 2 diamonds per 100 blocks</li>
                <li>• Danger zones: +50-100%</li>
                <li>• Rush jobs: +50%</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Zap className="h-6 w-6 text-orange-400" />,
      title: "Shopping Service",
      subtitle: "Multi-shop coordination for the time-conscious",
      preview: "Item cost + 5-7 diamonds",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Sure, you could visit 12 different shops, compare prices, and haul everything back. 
            Or you could keep building while I handle your shopping list.
          </p>
          <div className="bg-orange-900/20 rounded-lg p-4">
            <h4 className="text-orange-400 font-medium mb-3">How It Works:</h4>
            <div className="space-y-2 text-orange-200 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span>You give me your shopping list</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span>I visit shops, compare prices, negotiate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span>You pay me back item cost + my fee</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <span>Maximum laziness achieved</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const specializedServices = [
    {
      icon: <Users className="h-6 w-6 text-yellow-400" />,
      title: "Villager Transportation",
      subtitle: "The most annoying task in Minecraft",
      preview: "25-100 diamonds",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Professional villager wrangling with insurance options. Your valuable trades are safe with us.
          </p>
          <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
            <h4 className="text-red-400 font-medium mb-2">⚠️ High-Risk Service</h4>
            <p className="text-red-200 text-sm">
              Villagers are fragile, stupid, and have a death wish. Insurance highly recommended.
            </p>
          </div>
        </div>
      )
    },
    {
      icon: <Package className="h-6 w-6 text-indigo-400" />,
      title: "Base Relocation",
      subtitle: "Moving your entire life in blocks",
      preview: "50-200 diamonds",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Full inventory management, shulker organization, and storage system recreation in your new location.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-900/20 rounded-lg p-4">
              <h4 className="text-indigo-400 font-medium mb-2">Included:</h4>
              <ul className="text-indigo-200 text-sm space-y-1">
                <li>• Full inventory cataloging</li>
                <li>• Shulker organization</li>
                <li>• Storage system setup</li>
                <li>• Minimal downtime</li>
              </ul>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Timeline:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Small base: 2-4 hours</li>
                <li>• Medium base: 4-8 hours</li>
                <li>• Large base: 8-16 hours</li>
                <li>• Mega base: Let's negotiate</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Clock className="h-6 w-6 text-pink-400" />,
      title: "Supply Line Management",
      subtitle: "Automated laziness for ongoing projects",
      preview: "15-30 diamonds per delivery",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Regular deliveries for ongoing projects. Focus on creating, I'll keep your materials flowing.
          </p>
          <div className="bg-pink-900/20 rounded-lg p-4">
            <h4 className="text-pink-400 font-medium mb-2">Perfect For:</h4>
            <ul className="text-pink-200 text-sm space-y-1">
              <li>• Mega builds requiring constant materials</li>
              <li>• Redstone projects needing components</li>
              <li>• Farms requiring regular maintenance supplies</li>
              <li>• Any project where you're too lazy to plan ahead</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      icon: <Shield className="h-6 w-6 text-red-400" />,
      title: "Rescue Missions",
      subtitle: "When you've given up on yourself",
      preview: "20-75 diamonds",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Stuck on a boring transport job? We'll step in and finish it. No judgment, just results.
          </p>
          <div className="bg-red-900/20 rounded-lg p-4">
            <h4 className="text-red-400 font-medium mb-2">Rescue Scenarios:</h4>
            <ul className="text-red-200 text-sm space-y-1">
              <li>• Finish your abandoned transport jobs</li>
              <li>• Complete half-done base moves</li>
              <li>• Emergency supply runs</li>
              <li>• Judgment-free service (lies)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      icon: <Users className="h-6 w-6 text-cyan-400" />,
      title: "Debt Collection",
      subtitle: "Professional awkward conversation handler",
      preview: "5-15 diamonds + 20% of debt",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Someone owes you items but won't deliver? I'll handle the awkward conversation and collection for you.
          </p>
          <div className="bg-cyan-900/20 rounded-lg p-4">
            <h4 className="text-cyan-400 font-medium mb-2">What I Collect:</h4>
            <ul className="text-cyan-200 text-sm space-y-1">
              <li>• Unpaid trades and IOUs</li>
              <li>• Borrowed items never returned</li>
              <li>• Competition prizes owed</li>
              <li>• Professional intimidation included</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      icon: <Package className="h-6 w-6 text-emerald-400" />,
      title: "Bulk Shopping Runs",
      subtitle: "Your personal shopping slave",
      preview: "Item cost + 10-25 diamonds",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Give me a shopping list and diamonds. I'll hit every shop, compare prices, and deliver everything in one trip.
          </p>
          <div className="bg-emerald-900/20 rounded-lg p-4">
            <h4 className="text-emerald-400 font-medium mb-2">Shopping Services:</h4>
            <ul className="text-emerald-200 text-sm space-y-1">
              <li>• Multi-shop coordination</li>
              <li>• Price comparison included</li>
              <li>• Bulk discount negotiations</li>
              <li>• Single delivery of everything</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-400" />,
      title: "Emergency Supply Drops",
      subtitle: "Rescue service for the helpless",
      preview: "20-75 diamonds + premium surcharge",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Stuck in a cave? Out of food? Lost and dying? Text your location and I'll come save you.
          </p>
          <div className="bg-amber-900/20 rounded-lg p-4">
            <h4 className="text-amber-400 font-medium mb-2">Emergency Situations:</h4>
            <ul className="text-amber-200 text-sm space-y-1">
              <li>• Food delivery to prevent starvation</li>
              <li>• Tools when you're stuck mining</li>
              <li>• Torches for cave exploration</li>
              <li>• "I'm dying" premium pricing applies</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      icon: <Users className="h-6 w-6 text-violet-400" />,
      title: "Proxy Shopping",
      subtitle: "Social anxiety delivery service",
      preview: "Item cost + 5-12 diamonds",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Too awkward to negotiate with sellers? I'll handle the social interaction and deliver your items.
          </p>
          <div className="bg-violet-900/20 rounded-lg p-4">
            <h4 className="text-violet-400 font-medium mb-2">Social Services:</h4>
            <ul className="text-violet-200 text-sm space-y-1">
              <li>• Handle seller negotiations</li>
              <li>• Deal with difficult shop owners</li>
              <li>• Avoid awkward small talk</li>
              <li>• Professional social buffer</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Item delivery across all dimensions (because you won't do it yourself)
          </p>
        </div>

        {/* Core Services */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Package className="h-6 w-6 text-blue-400 mr-3" />
            Core Services
          </h3>
          <div className="space-y-4">
            {coreServices.map((service, index) => (
              <CollapsibleSection
                key={index}
                title={service.title}
                subtitle={service.subtitle}
                icon={service.icon}
                previewContent={service.preview}
                defaultOpen={index === 0}
              >
                {service.content}
              </CollapsibleSection>
            ))}
          </div>
        </div>

        {/* Specialized Services */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Zap className="h-6 w-6 text-purple-400 mr-3" />
            Specialized Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specializedServices.map((service, index) => (
              <CollapsibleSection
                key={index}
                title={service.title}
                subtitle={service.subtitle}
                icon={service.icon}
                previewContent={service.preview}
                className="h-fit"
              >
                {service.content}
              </CollapsibleSection>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              const element = document.getElementById('submit-job');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ModularServices;