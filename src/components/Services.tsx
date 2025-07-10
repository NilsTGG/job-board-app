import React from 'react';
import { Truck, Clock, Shield, Zap, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Truck,
      title: "Item Delivery (Because You Won't)",
      description: "You have stuff. You want it somewhere else. I'll do it. You pay diamonds.",
      features: ["Any item, any distance", "I risk my life, you don't", "Zero effort required from you"],
      color: "blue"
    },
    {
      icon: Zap,
      title: "Shopping Service",
      description: "Don't have the item? Can't find the seller? I'll buy it for you like the enabler I am.",
      features: ["I find the seller", "I negotiate the price", "You pay me back + fee", "Maximum laziness achieved"],
      color: "orange"
    },
    {
      icon: Shield,
      title: "Risk Delivery (Danger Tax Included)",
      description: "Nether? End? PvP zones? Sure, I hate myself anyway.",
      features: ["I die so you don't have to", "Premium 'I might not come back' pricing", "Passive-aggressive delivery notes"],
      color: "green"
    },
    {
      icon: Clock,
      title: "Buy Now, Regret Later",
      description: "I'll buy it upfront. You pay me back. Eventually. Maybe.",
      features: ["Zero upfront cost", "Custom debt reminder messages", "Interest in the form of sarcasm"],
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-600 group-hover:bg-blue-500",
      orange: "bg-orange-600 group-hover:bg-orange-500",
      green: "bg-green-600 group-hover:bg-green-500", 
      purple: "bg-purple-600 group-hover:bg-purple-500",
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
                  "Item Delivery (Because You Won't)": "Why pay extra when you could get it yourself?\n\n• Your time is worth more than walking\n• I risk death, you risk nothing\n• No PvP drama for you\n• It actually gets done (unlike your 'I'll do it later')\n• 5-15 diamonds depending on how far I have to walk",
                  "Shopping Service": "Personal shopping for the terminally lazy:\n\n• I find sellers you're too lazy to locate\n• I negotiate prices you're too awkward to discuss\n• You pay: item cost + my fee + emotional damage\n• Perfect for people who say 'someone should sell X' instead of looking",
                  "Risk Delivery (Danger Tax Included)": "Premium 'I might die' service:\n\n• Nether deliveries: +100% surcharge\n• End dimension: +150% surcharge\n• PvP zones: +200% surcharge + therapy costs\n• Includes complimentary passive-aggressive sign at delivery",
                  "Buy Now, Regret Later": "Credit system for the financially irresponsible:\n\n• I buy it now, you owe me later\n• Custom debt reminder messages\n• Interest calculated in disappointment\n• Perfect for impulse buyers with commitment issues"
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
    </section>
  );
};

export default Services;