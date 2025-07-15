import React from "react";
import { TrendingUp, Clock, Package, Users, Activity } from "lucide-react";
import { useDeliveryStore } from "../store/deliveryStore";

const Stats: React.FC = () => {
  const { stats } = useDeliveryStore();

  const displayStats = [
    {
      icon: Package,
      number: stats.successfulDeliveries.toLocaleString(),
      label: "Successful Deliveries",
      subtext: "Successfully completed",
      color: "blue",
    },
    {
      icon: Users,
      number: stats.totalVisitors.toLocaleString(),
      label: "Total Visitors",
      subtext: "Mostly satisfied",
      color: "green",
    },
    {
      icon: Clock,
      number: stats.averageDeliveryTime.toFixed(1),
      label: "Avg Delivery Time",
      subtext: "Hours (when I'm motivated)",
      color: "yellow",
    },
    {
      icon: TrendingUp,
      number: `${stats.successRate.toFixed(1)}%`,
      label: "Success Rate",
      subtext: "Pretty reliable",
      color: "purple",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-600 group-hover:bg-blue-500 text-blue-400",
      green: "bg-green-600 group-hover:bg-green-500 text-green-400", 
      yellow: "bg-yellow-600 group-hover:bg-yellow-500 text-yellow-400",
      purple: "bg-purple-600 group-hover:bg-purple-500 text-purple-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Live Statistics
          </h2>
          <p className="text-lg text-gray-400">
            Real-time data from our delivery service
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700 hover:border-blue-500 transition-all duration-300 group hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${getColorClasses(stat.color).split(' ').slice(0, 2).join(' ')}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className={`text-3xl font-bold mb-2 ${getColorClasses(stat.color).split(' ')[2]}`}>
                {stat.number}
              </div>

              <div className="text-white font-medium mb-1">{stat.label}</div>

              <div className="text-gray-400 text-sm">{stat.subtext}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-green-400">
            <Activity className="h-4 w-4 animate-pulse" />
            <span className="text-sm">Live Statistics</span>
          </div>
          <p className="text-gray-500 text-xs italic">
            Disclaimer: All statistics displayed above are entirely fictional and provided for demonstration purposes only.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
