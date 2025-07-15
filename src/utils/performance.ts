// Performance monitoring utilities
export class PerformanceMonitor {
  private static marks: Map<string, number> = new Map();

  // Mark the start of a performance measurement
  static mark(name: string): void {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(`${name}-start`);
      this.marks.set(name, performance.now());
    }
  }

  // Measure the time since a mark was set
  static measure(name: string): number {
    if (typeof performance !== 'undefined' && performance.measure) {
      try {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
        
        const measure = performance.getEntriesByName(name)[0];
        return measure.duration;
      } catch (error) {
        console.warn(`Performance measurement failed for ${name}:`, error);
      }
    }
    
    // Fallback to manual timing
    const startTime = this.marks.get(name);
    if (startTime) {
      return performance.now() - startTime;
    }
    
    return 0;
  }

  // Log performance metrics
  static logMetrics(): void {
    if (typeof performance !== 'undefined') {
      // Log Core Web Vitals if available
      if ('getEntriesByType' in performance) {
        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach(entry => {
          console.log(`${entry.name}: ${entry.startTime}ms`);
        });

        const navigationEntries = performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0) {
          const nav = navigationEntries[0] as PerformanceNavigationTiming;
          console.log('Navigation Timing:', {
            'DNS Lookup': nav.domainLookupEnd - nav.domainLookupStart,
            'TCP Connection': nav.connectEnd - nav.connectStart,
            'Request': nav.responseStart - nav.requestStart,
            'Response': nav.responseEnd - nav.responseStart,
            'DOM Processing': nav.domContentLoadedEventStart - nav.responseEnd,
            'Load Complete': nav.loadEventEnd - nav.loadEventStart
          });
        }
      }
    }
  }

  // Debounce function for performance
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  }

  // Throttle function for performance
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Image optimization utilities
export const optimizeImage = (src: string, width?: number, quality = 80): string => {
  // For static hosting, we can't do server-side optimization
  // But we can provide hints for browser optimization
  if (width) {
    // This would work with a service like Cloudinary or similar
    // For now, just return the original src
    return src;
  }
  return src;
};

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
};

// Prefetch resources for next navigation
export const prefetchResource = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get connection information
export const getConnectionInfo = (): {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
} => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt
    };
  }
  return {};
};

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  // Log performance metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      PerformanceMonitor.logMetrics();
    }, 1000);
  });
}