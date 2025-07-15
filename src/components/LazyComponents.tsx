import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load heavy components
export const LazyJobForm = lazy(() => import('./ConversationalForm'));
export const LazySmartPricingCalculator = lazy(() => import('./UnifiedQuoteWidget'));
export const LazyTestimonials = lazy(() => import('./Testimonials'));
export const LazyFAQ = lazy(() => import('./FAQ'));
export const LazyBrokePeopleMenu = lazy(() => import('./BrokePeopleMenu'));
export const LazyCourierProfile = lazy(() => import('./CourierProfile'));

// Loading skeleton components
const FormSkeleton = () => (
  <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 animate-pulse">
    <div className="space-y-6">
      <div className="h-8 bg-gray-700 rounded w-1/3"></div>
      <div className="space-y-4">
        <div className="h-12 bg-gray-700 rounded"></div>
        <div className="h-12 bg-gray-700 rounded"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 bg-gray-700 rounded"></div>
          <div className="h-12 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="h-12 bg-blue-600 rounded opacity-50"></div>
    </div>
  </div>
);

const SectionSkeleton = () => (
  <div className="py-20 bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="text-center mb-16">
        <div className="h-10 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-700 rounded w-1/3 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <div className="h-6 bg-gray-700 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CalculatorSkeleton = () => (
  <div className="py-16 bg-gray-800">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="text-center mb-8">
        <div className="h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg w-80 mx-auto"></div>
      </div>
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
          </div>
          <div className="h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

// Loading component with spinner
const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="h-8 w-8 animate-spin text-blue-500 mr-3" />
    <span className="text-gray-400">{text}</span>
  </div>
);

// Suspense wrappers with appropriate skeletons
export const SuspenseJobForm = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<FormSkeleton />}>
    {children}
  </Suspense>
);

export const SuspenseCalculator = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<CalculatorSkeleton />}>
    {children}
  </Suspense>
);

export const SuspenseSection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionSkeleton />}>
    {children}
  </Suspense>
);

export const SuspenseGeneric = ({ children, text }: { children: React.ReactNode; text?: string }) => (
  <Suspense fallback={<LoadingSpinner text={text} />}>
    {children}
  </Suspense>
);