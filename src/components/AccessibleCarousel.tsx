import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

interface CarouselItem {
  id: string;
  content: React.ReactNode;
  title: string;
}

interface AccessibleCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  ariaLabel: string;
}

const AccessibleCarousel: React.FC<AccessibleCarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
  ariaLabel
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto-play functionality with respect for user preferences
  useEffect(() => {
    if (isPlaying && !userHasInteracted && !reducedMotion) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % items.length);
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, userHasInteracted, reducedMotion, items.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setUserHasInteracted(true);
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const goToPrevious = () => {
    setUserHasInteracted(true);
    setCurrentIndex(prev => prev === 0 ? items.length - 1 : prev - 1);
    setIsPlaying(false);
  };

  const goToNext = () => {
    setUserHasInteracted(true);
    setCurrentIndex(prev => (prev + 1) % items.length);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setUserHasInteracted(true);
    setIsPlaying(!isPlaying);
  };

  const resetToFirst = () => {
    setUserHasInteracted(true);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToNext();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(items.length - 1);
        break;
      case ' ':
        e.preventDefault();
        togglePlayPause();
        break;
    }
  };

  return (
    <div className="relative">
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing item {currentIndex + 1} of {items.length}: {items[currentIndex]?.title}
      </div>

      {/* Main carousel container */}
      <div
        ref={carouselRef}
        className="relative overflow-hidden rounded-lg bg-gray-800 border border-gray-700"
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Carousel content */}
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transitionDuration: reducedMotion ? '0ms' : '300ms'
          }}
          aria-live="polite"
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="w-full flex-shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}: ${item.title}`}
              aria-hidden={index !== currentIndex}
            >
              {item.content}
            </div>
          ))}
        </div>

        {/* Navigation controls */}
        {showControls && items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Carousel controls */}
      {showControls && items.length > 1 && (
        <div className="flex items-center justify-between mt-4">
          {/* Slide indicators */}
          <div className="flex space-x-2" role="tablist" aria-label="Slide navigation">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  index === currentIndex
                    ? 'bg-blue-500'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to slide ${index + 1}: ${items[index].title}`}
              />
            ))}
          </div>

          {/* Playback controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={resetToFirst}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 p-1 rounded"
              aria-label="Reset to first slide"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            
            {autoPlay && (
              <button
                onClick={togglePlayPause}
                className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 p-1 rounded"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Alternative list view for users who prefer it */}
      <details className="mt-4">
        <summary className="text-blue-400 hover:text-blue-300 cursor-pointer text-sm">
          View all items as list (alternative to carousel)
        </summary>
        <div className="mt-2 space-y-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goToSlide(index)}
              className={`w-full text-left p-3 rounded border transition-colors ${
                index === currentIndex
                  ? 'border-blue-500 bg-blue-900/20'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-sm text-gray-400">Item {index + 1}:</span>
              <div className="text-white">{item.title}</div>
            </button>
          ))}
        </div>
      </details>
    </div>
  );
};

export default AccessibleCarousel;