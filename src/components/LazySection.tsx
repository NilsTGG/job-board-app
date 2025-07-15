import React from 'react';
import { useLazyLoad } from '../hooks/useIntersectionObserver';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  minHeight?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  className = '',
  minHeight = '200px'
}) => {
  const { ref, shouldLoad } = useLazyLoad();

  const defaultFallback = (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ minHeight }}
    >
      <div className="animate-pulse text-gray-400">Loading section...</div>
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {shouldLoad ? children : (fallback || defaultFallback)}
    </div>
  );
};

export default LazySection;