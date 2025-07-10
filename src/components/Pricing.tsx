import React from 'react';
import { Check, Diamond, Star, Zap } from 'lucide-react';

interface PricingProps {}

const Pricing: React.FC<PricingProps> = () => {
  const scrollToForm = (tier: string) => {
    const element = document.getElementById('submit-job');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Pre-fill the payment offer field
      setTimeout(() => {
        const paymentField = document.getElementById('paymentOffer') as HTMLInputElement;
        if (paymentField) {
          const tierPrices = { Basic: '5 diamonds', Premium: '15 diamonds', Deluxe: '30 diamonds' };
          paymentField.value = tierPrices[tier as keyof typeof tierPrices] || '';
          paymentField.focus();
        }
      }, 500);
    }
  };

  const pricingTiers = [
    {
      name: "Basic",
      price: "5 Diamonds",
      description: "Standard delivery service",
      features: [
        "Single item delivery",
        "Standard routes",
        "Professional service",
        "Delivery within 24 hours*"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "15 Diamonds",
      description: "Enhanced service tier",
      features: [
        "Up to 5 items",
        "Optimized routes",
        "Priority support",
        "Priority queue access",
        "Delivery within 12 hours*"
      ],
      popular: true
    },
    {
      name: "Deluxe",
      price: "30 Diamonds",
      description: "Premium delivery experience",
      features: [
        "Unlimited items",
        "Express delivery",
        "Premium support",
        "Full insurance coverage",
        "Delivery within 6 hours*",
        "Guaranteed delivery**"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Simple diamond-based pricing tiers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-gray-900 rounded-lg p-8 border-2 transition-all duration-300 hover:scale-105 ${
                tier.popular 
                  ? 'border-blue-500 ring-2 ring-blue-500/20' 
                  : 'border-gray-700 hover:border-blue-500'
              }`}
            >
              {tier.popular && (
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Diamond className="h-6 w-6 text-blue-400" />
                  <span className="text-3xl font-bold text-blue-400">{tier.price}</span>
                </div>
                <p className="text-gray-400">{tier.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => scrollToForm(tier.name)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Choose This Tier (If You Dare)
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>* Delivery times are estimates and may vary depending on circumstances.</p>
          <p>** "Complaint-free" means I'll do my best to keep things smooth and positive.</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;