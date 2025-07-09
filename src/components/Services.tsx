import React from 'react';
import { Truck, Clock, Shield, Zap } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Truck,
      title: "Item Delivery",
      description: "Standard item transport from pickup to delivery location.",
      features: ["Any item, any distance", "Secure transport", "Reliable service"]
    },
    {
      icon: Clock,
      title: "Rush Delivery",
      description: "Faster delivery for urgent orders. Premium pricing applies.",
      features: ["Priority queue", "Express routes", "Same-day delivery"]
    },
    {
      icon: Shield,
      title: "Secure Transport",
      description: "Protected transport with backup storage systems.",
      features: ["Ender chest backup", "Safe routes", "Loss protection"]
    },
    {
      icon: Zap,
      title: "Bulk Orders",
      description: "Large quantity deliveries with volume discounts.",
      features: ["Quantity discounts", "Organized delivery", "Bulk pricing"]
    }
  ];

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
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4 group-hover:bg-blue-500 transition-colors">
                <service.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-200 mb-4">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-200 text-sm flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;