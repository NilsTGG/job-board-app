import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PerformanceMonitor } from './utils/performance';

// Start performance monitoring
PerformanceMonitor.mark('app-init');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Measure app initialization time
setTimeout(() => {
  const initTime = PerformanceMonitor.measure('app-init');
  if (initTime > 0) {
    console.log(`App initialization took ${initTime.toFixed(2)}ms`);
  }
}, 100);
