// Pricing Configuration
export const PRICING = {
  BASE_FEE: 3,
  DISTANCE_MULTIPLIER: 2,
  CHUNKS_PER_DISTANCE_UNIT: 100,
  
  DANGER_MULTIPLIERS: {
    safe: { multiplier: 1, reason: 'Safe route (how boring)' },
    risky: { multiplier: 1.5, reason: 'Some risk involved (mobs, cliffs, etc.)' },
    dangerous: { multiplier: 2.5, reason: 'Nether/End/PvP zones (I might die)' },
    suicidal: { multiplier: 4, reason: 'Are you trying to get me killed?' }
  },
  
  URGENCY_FEES: {
    whenever: { fee: 0, reason: 'No rush (20% discount actually)' },
    soon: { fee: 0, reason: 'Standard timing' },
    urgent: { fee: 5, reason: 'Priority queue access' },
    emergency: { fee: 15, reason: 'Drop everything mode activated' }
  },
  
  VALUE_FEES: {
    cheap: { fee: 0, reason: 'Basic items (no insurance needed)' },
    valuable: { fee: 2, reason: 'Valuable items (basic insurance)' },
    precious: { fee: 5, reason: 'Precious cargo (premium insurance)' },
    irreplaceable: { fee: 10, reason: 'Irreplaceable items (full coverage + therapy)' }
  },
  
  TIME_FEES: {
    day: { fee: 0, reason: 'Normal hours' },
    night: { fee: 1, reason: 'Night shift (mobs are annoying)' },
    peak: { fee: 3, reason: 'Peak hours (everyone wants stuff)' },
    dead: { fee: -1, reason: 'Dead hours (nothing else to do)' }
  },
  
  WEATHER_FEES: {
    clear: { fee: 0, reason: 'Perfect weather' },
    rain: { fee: 1, reason: 'Rain (visibility issues)' },
    storm: { fee: 3, reason: 'Thunderstorm (lightning risk)' },
    apocalypse: { fee: 10, reason: 'Apocalyptic conditions (why now?)' }
  },
  
  PATIENCE_DISCOUNT_RATE: 0.2,
  MINIMUM_PRICE: 1
};

// Form Validation Configuration
export const FORM_VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 16,
    PATTERN: /^[a-zA-Z0-9_]{3,16}$/,
    ERROR_MESSAGE: 'Minecraft usernames are 3-16 characters (letters, numbers, underscores only)'
  },
  
  DISCORD: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 32,
    PATTERN: /^(?!.*\.\.)([a-z0-9._]{2,32})$/,
    ERROR_MESSAGE: '2-32 chars, lowercase letters, numbers, periods/underscores, no consecutive periods'
  },
  
  COORDINATES: {
    PATTERN: /^-?\d+\s*,?\s*-?\d+\s*,?\s*-?\d+$/,
    ERROR_MESSAGE: 'Format: X Y Z or X,Y,Z (e.g., 100 64 -200)'
  },
  
  ITEM_DESCRIPTION: {
    MIN_LENGTH: 3,
    ERROR_MESSAGE: 'Please be more specific (at least 3 characters)'
  },
  
  PAYMENT_OFFER: {
    PATTERN: /\d+/,
    ERROR_MESSAGE: 'Please include a number (e.g., \'5 diamonds\')'
  }
};

// UI Configuration
export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  AUTO_SAVE_DELAY: 1000,
  ANIMATION_DURATION: 300,
  CAROUSEL_AUTO_PLAY_INTERVAL: 5000,
  
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280
  },
  
  FORM: {
    ITEMS_PER_PAGE: 6,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif']
  }
};

// Service Configuration
export const SERVICES = {
  DELIVERY_TIERS: [
    {
      name: "Basic",
      price: "5 Diamonds",
      description: "Standard delivery service",
      features: [
        "Single item delivery",
        "Standard routes",
        "Professional service",
        "Delivery within 24 hours*"
      ]
    },
    {
      name: "Premium", 
      price: "15 Diamonds",
      description: "Enhanced service tier",
      features: [
        "Up to 5 items",
        "Optimized routes", 
        "Priority support",
        "Priority queue access",
        "Delivery within 12 hours*"
      ],
      popular: true
    },
    {
      name: "Deluxe",
      price: "30 Diamonds", 
      description: "Premium delivery experience",
      features: [
        "Unlimited items",
        "Express delivery",
        "Premium support", 
        "Full insurance coverage",
        "Delivery within 6 hours*",
        "Guaranteed delivery**"
      ]
    }
  ],
  
  URGENCY_OPTIONS: [
    {
      value: "not-urgent",
      label: "Whenever",
      description: "20% discount - I'll get to it eventually"
    },
    {
      value: "soon",
      label: "Soon-ish", 
      description: "Standard pricing - reasonable timeframe"
    },
    {
      value: "urgent",
      label: "ASAP",
      description: "+50% surcharge - priority queue"
    },
    {
      value: "life-or-death",
      label: "Emergency",
      description: "+100% surcharge - drop everything mode"
    }
  ],
  
  INSURANCE_OPTIONS: [
    {
      value: "none",
      label: "None (YOLO)",
      description: "No protection - live dangerously"
    },
    {
      value: "basic", 
      label: "Basic Protection",
      description: "+2 diamonds - standard coverage"
    },
    {
      value: "premium",
      label: "Premium Coverage", 
      description: "+5 diamonds - full protection guarantee"
    }
  ],
  
  CONTACT_OPTIONS: [
    {
      value: "discord",
      label: "Discord",
      description: "Fastest response time"
    },
    {
      value: "minecraft",
      label: "In-game chat",
      description: "When I'm online"
    },
    {
      value: "reddit",
      label: "Reddit DM", 
      description: "Slower but reliable"
    }
  ]
};

// Error Messages
export const ERROR_MESSAGES = {
  FORM: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_FORMAT: 'Invalid format',
    SUBMISSION_FAILED: 'Submission failed. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    VALIDATION_FAILED: 'Please fix the errors above before submitting.'
  },
  
  GENERAL: {
    SOMETHING_WENT_WRONG: 'Something went wrong',
    TRY_AGAIN_LATER: 'Please try again later',
    REFRESH_PAGE: 'Try refreshing the page'
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  FORM_DRAFT: 'jobForm_draft',
  VISITOR_TRACKED: 'becauseYouWont_visitor',
  SITE_STATS: 'becauseYouWont_stats',
  USER_PREFERENCES: 'becauseYouWont_preferences'
};

// API Configuration
export const API_CONFIG = {
  FORMSPREE_ENDPOINT: 'xqabvypp',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};