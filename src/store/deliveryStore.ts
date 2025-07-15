import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DeliveryFormData {
  discordUsername: string;
  ign: string;
  itemDescription: string;
  pickupCoords: string;
  dropoffCoords: string;
  paymentOffer: string;
  urgency: 'whenever' | 'soon' | 'urgent' | 'emergency';
  insurance: 'none' | 'basic' | 'premium';
  notes: string;
  contactMethod: string;
  deadline: string;
  itemQuantity: string;
}

export interface SiteStats {
  totalVisitors: number;
  jobsSubmitted: number;
  successfulDeliveries: number;
  averageDeliveryTime: number;
  successRate: number;
  lastUpdated: string;
}

export interface QuoteData {
  distance: number;
  price: number;
  estimatedTime: number;
  dangerLevel: string;
  breakdown: Array<{
    factor: string;
    cost: number;
    reason: string;
  }>;
}

interface DeliveryStore {
  // Form state
  formData: DeliveryFormData;
  currentStep: number;
  isSubmitting: boolean;
  
  // Quote state
  currentQuote: QuoteData | null;
  isCalculatingQuote: boolean;
  quoteError: string | null;
  
  // Stats state
  stats: SiteStats;
  
  // Navigation state
  activeSection: string;
  
  // Actions
  updateFormData: (field: keyof DeliveryFormData, value: string) => void;
  setCurrentStep: (step: number) => void;
  setSubmitting: (submitting: boolean) => void;
  setQuote: (quote: QuoteData | null) => void;
  setCalculatingQuote: (calculating: boolean) => void;
  setQuoteError: (error: string | null) => void;
  updateStats: (updates: Partial<SiteStats>) => void;
  setActiveSection: (section: string) => void;
  resetForm: () => void;
  trackJobSubmission: () => void;
  trackVisitor: () => void;
}

const initialFormData: DeliveryFormData = {
  discordUsername: '',
  ign: '',
  itemDescription: '',
  pickupCoords: '',
  dropoffCoords: '',
  paymentOffer: '',
  urgency: 'soon',
  insurance: 'basic',
  notes: '',
  contactMethod: 'discord',
  deadline: '',
  itemQuantity: '64',
};

const initialStats: SiteStats = {
  totalVisitors: 847,
  jobsSubmitted: 312,
  successfulDeliveries: 298,
  averageDeliveryTime: 2.3,
  successRate: 95.5,
  lastUpdated: new Date().toISOString(),
};

export const useDeliveryStore = create<DeliveryStore>()(
  persist(
    (set, get) => ({
      // Initial state
      formData: initialFormData,
      currentStep: 0,
      isSubmitting: false,
      currentQuote: null,
      isCalculatingQuote: false,
      quoteError: null,
      stats: initialStats,
      activeSection: '',

      // Actions
      updateFormData: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      setSubmitting: (submitting) => set({ isSubmitting: submitting }),

      setQuote: (quote) => set({ currentQuote: quote, quoteError: null }),

      setCalculatingQuote: (calculating) => set({ isCalculatingQuote: calculating }),

      setQuoteError: (error) => set({ quoteError: error, currentQuote: null }),

      updateStats: (updates) =>
        set((state) => ({
          stats: {
            ...state.stats,
            ...updates,
            lastUpdated: new Date().toISOString(),
          },
        })),

      setActiveSection: (section) => set({ activeSection: section }),

      resetForm: () =>
        set({
          formData: initialFormData,
          currentStep: 0,
          currentQuote: null,
          quoteError: null,
        }),

      trackJobSubmission: () => {
        const { stats } = get();
        set({
          stats: {
            ...stats,
            jobsSubmitted: stats.jobsSubmitted + 1,
            successfulDeliveries: stats.successfulDeliveries + 1,
            successRate: ((stats.successfulDeliveries + 1) / (stats.jobsSubmitted + 1)) * 100,
            lastUpdated: new Date().toISOString(),
          },
        });
      },

      trackVisitor: () => {
        const { stats } = get();
        const hasVisited = localStorage.getItem('becauseYouWont_visitor');
        if (!hasVisited) {
          localStorage.setItem('becauseYouWont_visitor', 'true');
          set({
            stats: {
              ...stats,
              totalVisitors: stats.totalVisitors + 1,
              lastUpdated: new Date().toISOString(),
            },
          });
        }
      },
    }),
    {
      name: 'delivery-store',
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
        stats: state.stats,
      }),
    }
  )
);