import React from 'react';
import { Truck, Clock, Shield, Zap } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Truck,
      title: "Item Delivery",
      description: "I'll move your stuff from Point A to Point B. Revolutionary, I know.",
      features: ["Any item, any distance", "Probably won't steal it", "Delivered with attitude"]
    },
    {
      icon: Clock,
      title: "Rush Delivery",
      description: "Need it fast? Pay extra diamonds and I'll consider hurrying.",
      features: ["Priority queue (maybe)", "Faster than walking", "Double the sarcasm"]
    },
    {
      icon: Shield,
      title: "Secure Transport",
      description: "Your items are as safe as my motivation to do this job.",
      features: ["Ender chest backup", "Grief-resistant routes", "Insurance not included"]
    },
    {
      icon: Zap,
      title: "Bulk Orders",
      description: "Multiple items? How ambitious. I'll handle your shopping list.",
      features: ["Quantity discounts", "Organized delivery", "Increased complaining"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What I Do (Reluctantly)
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Because apparently running your own errands is too hard
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