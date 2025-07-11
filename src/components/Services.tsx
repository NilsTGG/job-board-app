import React from 'react';
import { Truck, Clock, Shield, Zap, ArrowRight, Users, Package } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Truck,
      title: "Item Delivery (Because You Won't)",
      description: "Free shulkers don't make the journey less boring. Why spend 2 hours loading, traveling, and unloading when you could be building your dream project?",
      features: ["Any item, any distance", "I risk my life, you don't", "Zero effort required from you", "Your time > diamond cost"],
      color: "blue"
    },
    {
      icon: Zap,
      title: "Shopping Service",
      description: "Sure, you could visit 12 different shops, compare prices, and haul everything back. Or you could keep building while we handle your shopping list.",
      features: ["Multi-shop coordination", "Price comparison included", "Bulk discount negotiations", "You pay me back + fee", "Maximum laziness achieved"],
      color: "orange"
    },
    {
      icon: Clock,
      title: "Multi-Stop Shopping Runs",
      description: "One trip, multiple shops, zero headaches. We'll coordinate pickups from every shop on your list so you don't have to.",
      features: ["Visit multiple shops in one trip", "Coordinate pickup times", "Bulk transport efficiency", "Shopping list management"],
      color: "purple"
    },
    {
      icon: Shield,
      title: "Risk Delivery (Insurance Included)",
      description: "Free shulkers don't help when you die in lava with 64 diamond blocks. We take the risk, you keep your stuff.",
      features: ["Nether/End/PvP delivery", "Full insurance coverage", "I die so you don't have to", "Guaranteed replacement if lost"],
      color: "green"
    }
  ];

  const additionalServices = [
    {
      icon: Users,
      title: "Villager Transportation",
      description: "The most annoying task in Minecraft. Your valuable trades are safe with us, guaranteed.",
      features: ["Professional villager handling", "Insurance available", "Boat/minecart logistics", "No more villager deaths"],
      color: "yellow"
    },
    {
      icon: Package,
      title: "Base Relocation Service", 
      description: "Moving bases? We'll pack, transport, and help organize your entire storage system in the new location.",
      features: ["Full base inventory management", "Shulker organization", "Storage system setup", "Minimal downtime"],
      color: "indigo"
    },
    {
      icon: Clock,
      title: "Supply Line Management",
      description: "Regular deliveries for ongoing projects. Focus on creating, we'll keep your materials flowing.",
      features: ["Scheduled deliveries", "Project material planning", "Automatic restocking", "Progress tracking"],
      color: "pink"
    },
    {
      icon: Zap,
      title: "Rescue Missions",
      description: "Stuck on a boring transport job? We'll step in and finish it. No judgment, just results.",
      features: ["Take over abandoned jobs", "Complete half-finished moves", "Emergency supply runs", "Motivation not included"],
      color: "cyan"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-600 group-hover:bg-blue-500",
      orange: "bg-orange-600 group-hover:bg-orange-500",
      green: "bg-green-600 group-hover:bg-green-500", 
      purple: "bg-purple-600 group-hover:bg-purple-500",
      yellow: "bg-yellow-600 group-hover:bg-yellow-500",
      indigo: "bg-indigo-600 group-hover:bg-indigo-500",
      pink: "bg-pink-600 group-hover:bg-pink-500",
      cyan: "bg-cyan-600 group-hover:bg-cyan-500",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Item delivery across all dimensions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
              onClick={() => {
                const serviceDetails = {
                  "Item Delivery (Because You Won't)": "Time is diamonds. Literally.\n\n• Free shulkers ≠ free time\n• 2 hours of hauling vs 2 hours of building\n• I risk death, you risk nothing\n• Your opportunity cost > my fee\n• 5-15 diamonds depending on distance",
                  "Shopping Service": "Multi-shop coordination for the time-conscious:\n\n• Visit 12 shops or pay me to do it\n• Price comparison included\n• Bulk negotiations\n• You pay: item cost + my fee\n• Your time is worth more than my attitude",
                  "Multi-Stop Shopping Runs": "One trip, multiple shops, zero headaches:\n\n• Coordinate all your shop visits\n• Bulk transport efficiency\n• Shopping list management\n• Why make 5 trips when I can make 1?\n• 10-25 diamonds depending on shop count",
                  "Risk Delivery (Insurance Included)": "Premium 'I might die for your stuff' service:\n\n• Nether/End/PvP deliveries\n• Full insurance coverage\n• I die, you get compensated\n• Free shulkers don't prevent lava deaths\n• 20-50 diamonds + insurance premium"
                };
                alert(serviceDetails[service.title as keyof typeof serviceDetails] || 'Service details coming soon!');
              }}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-colors ${getColorClasses(service.color)}`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-200 mb-4">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-200 text-sm flex items-center">
                    <ArrowRight className="h-3 w-3 text-blue-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <button className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors w-full text-left">
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Specialized Services
            </h3>
            <p className="text-lg text-gray-400">
              For when regular delivery isn't annoying enough
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
                onClick={() => {
                  const serviceDetails = {
                    "Villager Transportation": "The most frustrating task in Minecraft:\n\n• Professional villager wrangling\n• Boat/minecart logistics handled\n• Insurance available (highly recommended)\n• No more villager 'accidents'\n• 25-100 diamonds depending on distance + danger",
                    "Base Relocation Service": "Moving your entire life in blocks:\n\n• Full inventory management\n• Shulker organization and labeling\n• Storage system recreation\n• Minimal downtime for your builds\n• 50-200 diamonds depending on base size",
                    "Supply Line Management": "Automated laziness for ongoing projects:\n\n• Scheduled material deliveries\n• Project planning assistance\n• Never run out of blocks mid-build\n• Progress tracking included\n• 15-30 diamonds per delivery + planning fee",
                    "Rescue Missions": "When you've given up on yourself:\n\n• Finish your abandoned transport jobs\n• Complete half-done base moves\n• Emergency supply runs\n• Judgment-free service (lies)\n• 20-75 diamonds depending on how badly you messed up"
                  };
                  alert(serviceDetails[service.title as keyof typeof serviceDetails] || 'Service details coming soon!');
                }}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-colors ${getColorClasses(service.color)}`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-200 mb-4">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-200 text-sm flex items-center">
                      <ArrowRight className="h-3 w-3 text-blue-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors w-full text-left">
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;