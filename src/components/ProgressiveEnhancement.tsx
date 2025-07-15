import React, { useState, useEffect, useRef } from 'react';
import { Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';
import App from '../App';

interface ProgressiveEnhancementProps {
  children: React.ReactNode;
  fallbackContent?: React.ReactNode;
  enableOfflineSupport?: boolean;
}

const ProgressiveEnhancement: React.FC<ProgressiveEnhancementProps> = ({
  children,
  fallbackContent,
  enableOfflineSupport = true
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [jsEnabled, setJsEnabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'fast' | 'slow' | 'unknown'>('unknown');
  const errorBoundaryRef = useRef<boolean>(false);

  // Detect JavaScript availability
  useEffect(() => {
    setJsEnabled(true);
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Detect connection quality
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const updateConnectionInfo = () => {
        if (connection.effectiveType === '4g' || connection.effectiveType === '3g') {
          setConnectionQuality('fast');
        } else {
          setConnectionQuality('slow');
        }
      };

      updateConnectionInfo();
      connection.addEventListener('change', updateConnectionInfo);

      return () => {
        connection.removeEventListener('change', updateConnectionInfo);
      };
    }
  }, []);

  // Error boundary functionality
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Progressive Enhancement Error:', event.error);
      setHasError(true);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled Promise Rejection:', event.reason);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Connection status indicator
  const ConnectionStatus = () => (
    <div className="fixed top-4 right-4 z-50">
      {!isOnline && enableOfflineSupport && (
        <div className="bg-yellow-600 text-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm">Offline Mode</span>
        </div>
      )}
      
      {isOnline && connectionQuality === 'slow' && (
        <div className="bg-orange-600 text-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">Slow Connection</span>
        </div>
      )}
    </div>
  );

  // Error fallback
  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-4">
            We're experiencing technical difficulties. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
          {fallbackContent && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Basic Version:</h3>
              {fallbackContent}
            </div>
          )}
        </div>
      </div>
    );
  }

  // No JavaScript fallback
  if (!jsEnabled) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <noscript>
          <div className="p-4 bg-yellow-600 text-black text-center">
            <strong>JavaScript is disabled.</strong> Some features may not work properly.
            {fallbackContent && (
              <div className="mt-4">
                {fallbackContent}
              </div>
            )}
          </div>
        </noscript>
        {children}
      </div>
    );
  }

  // Offline fallback
  if (!isOnline && enableOfflineSupport) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <ConnectionStatus />
        <div className="p-4 bg-yellow-600 text-black text-center">
          <WifiOff className="h-5 w-5 inline mr-2" />
          <strong>You're offline.</strong> Some features may be limited.
        </div>
        {fallbackContent || children}
      </div>
    );
  }

  // Enhanced version with full functionality
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ConnectionStatus />
      {children}
    </div>
  );
};

// Hook for progressive enhancement features
export const useProgressiveEnhancement = () => {
  const [capabilities, setCapabilities] = useState({
    javascript: false,
    localStorage: false,
    serviceWorker: false,
    webGL: false,
    touch: false,
    reducedMotion: false,
    highContrast: false
  });

  useEffect(() => {
    const detectCapabilities = () => {
      setCapabilities({
        javascript: true,
        localStorage: typeof Storage !== 'undefined',
        serviceWorker: 'serviceWorker' in navigator,
        webGL: !!document.createElement('canvas').getContext('webgl'),
        touch: 'ontouchstart' in window,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        highContrast: window.matchMedia('(prefers-contrast: high)').matches
      });
    };

    detectCapabilities();

    // Listen for preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');

    const handleMotionChange = () => detectCapabilities();
    const handleContrastChange = () => detectCapabilities();

    motionQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  return capabilities;
};

export default ProgressiveEnhancement;