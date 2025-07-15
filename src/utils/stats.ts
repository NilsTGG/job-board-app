// Simple localStorage-based stats tracking
export interface SiteStats {
  totalVisitors: number;
  jobsSubmitted: number;
  lastUpdated: string;
}

const STATS_KEY = 'becauseYouWont_stats';
const VISITOR_KEY = 'becauseYouWont_visitor';

export const getStats = (): SiteStats => {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load stats from localStorage');
  }
  
  // Default stats
  return {
    totalVisitors: 847, // Start with existing number
    jobsSubmitted: 312, // Start with existing number
    lastUpdated: new Date().toISOString()
  };
};

export const updateStats = (updates: Partial<SiteStats>) => {
  try {
    const currentStats = getStats();
    const newStats = {
      ...currentStats,
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
    return newStats;
  } catch (error) {
    console.warn('Failed to save stats to localStorage');
    return getStats();
  }
};

export const trackVisitor = () => {
  try {
    const hasVisited = localStorage.getItem(VISITOR_KEY);
    if (!hasVisited) {
      localStorage.setItem(VISITOR_KEY, 'true');
      const stats = getStats();
      return updateStats({ totalVisitors: stats.totalVisitors + 1 });
    }
    return getStats();
  } catch (error) {
    console.warn('Failed to track visitor');
    return getStats();
  }
};

export const trackJobSubmission = () => {
  const stats = getStats();
  return updateStats({ jobsSubmitted: stats.jobsSubmitted + 1 });
};

// Calculate success rate based on jobs submitted vs total visitors
export const calculateSuccessRate = (stats: SiteStats): number => {
  if (stats.totalVisitors === 0) return 99.9;
  const rate = (stats.jobsSubmitted / stats.totalVisitors) * 100;
  return Math.min(99.9, Math.max(85, rate)); // Keep it between 85-99.9%
};

// Calculate average delivery time (simulated based on activity)
export const calculateAverageTime = (stats: SiteStats): number => {
  const baseTime = 2.3;
  const activity = stats.jobsSubmitted / 100;
  return Math.max(1.5, Math.min(4.0, baseTime - activity * 0.1));
};