import React from 'react';
import { TrendingUp, Clock, Package, Users } from 'lucide-react';

const Stats: React.FC = () => {
  const stats = [
    {
      icon: Package,
      number: "847",
      label: "Items Delivered",
      subtext: "And counting (unfortunately)"
    },
    {
      icon: Users,
      number: "312",
      label: "Satisfied Customers",
      subtext: "Define 'satisfied'"
    },
    {
      icon: Clock,
      number: "2.3",
      label: "Average Hours",
      subtext: "Per delivery (when I feel like it)"
    },
    {
      icon: TrendingUp,
      number: "99.9%",
      label: "Success Rate",
      subtext: "That 0.1% was their fault"
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Numbers That Look Impressive
          </h2>
          <p className="text-lg text-gray-400">
            Statistics that may or may not be accurate
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {stat.number}
              </div>
              
              <div className="text-white font-medium mb-1">
                {stat.label}
              </div>
              
              <div className="text-gray-400 text-sm">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;