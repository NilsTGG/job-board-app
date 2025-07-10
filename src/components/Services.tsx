import React from 'react';
import { Truck, Clock, Shield, Zap, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Truck,
      title: "Item Delivery",
      description: "Standard item transport from pickup to delivery location.",
      features: ["Any item, any distance", "Secure transport", "Reliable service"],
      color: "blue"
    },
    {
      icon: Clock,
      title: "Rush Delivery",
      description: "Faster delivery for urgent orders. Premium pricing applies.",
      features: ["Priority queue", "Express routes", "Same-day delivery"],
      color: "orange"
    },
    {
      icon: Shield,
      title: "Secure Transport",
      description: "Protected transport with backup storage systems.",
      features: ["Ender chest backup", "Safe routes", "Loss protection"],
      color: "green"
    },
    {
      icon: Zap,
      title: "Bulk Orders",
      description: "Large quantity deliveries with volume discounts.",
      features: ["Quantity discounts", "Organized delivery", "Bulk pricing"],
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
                <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                  Learn more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;