import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, Package, Users } from 'lucide-react';
import { getStats, trackVisitor, calculateSuccessRate, calculateAverageTime, type SiteStats } from '../utils/stats';

const Stats: React.FC = () => {
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track visitor and get updated stats
    const updatedStats = trackVisitor();
    setStats(updatedStats);
    setIsLoading(false);

    // Update stats every 30 seconds to show real-time changes
    const interval = setInterval(() => {
      const currentStats = getStats();
      setStats(currentStats);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading || !stats) {
    return (
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse text-gray-400">Loading stats...</div>
          </div>
        </div>
      </section>
    );
  }

  const successRate = calculateSuccessRate(stats);
  const avgTime = calculateAverageTime(stats);

  const displayStats = [
    {
      icon: Package,
      number: stats.totalVisitors.toLocaleString(),
      label: "Site Visitors",
      subtext: "And counting"
    },
    {
      icon: Users,
      number: stats.jobsSubmitted.toLocaleString(),
      label: "Jobs Submitted",
      subtext: "Real submissions"
    },
    {
      icon: Clock,
      number: avgTime.toFixed(1),
      label: "Average Hours",
      subtext: "Per delivery"
    },
    {
      icon: TrendingUp,
      number: `${successRate.toFixed(1)}%`,
      label: "Success Rate",
      subtext: "Reliable service"
    }
  ];

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

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Last updated: {new Date(stats.lastUpdated).toLocaleString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;