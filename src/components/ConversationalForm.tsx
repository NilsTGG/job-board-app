import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, MessageCircle, Package, MapPin, Diamond } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { useDeliveryStore } from '../store/deliveryStore';

// Validation helpers
const validateDiscordUsername = (value: string) => {
  // Discord new username: 2-32 chars, lowercase, alphanumeric, underscore, period, no consecutive periods, no #, case-insensitive
  if (!value.trim()) return 'Discord Username is required';
  if (!/^(?!.*\.\.)[a-z0-9._]{2,32}$/i.test(value.trim()))
    return '2-32 chars, a-z, 0-9, _, . (no #, no consecutive dots)';
  return '';
};

const validateMinecraftUsername = (value: string) => {
  if (!value.trim()) return 'Minecraft Username is required';
  if (!/^[a-zA-Z0-9_]{3,16}$/.test(value.trim()))
    return '3-16 alphanumeric characters';
  return '';
};

const validateItemDescription = (value: string) => {
  if (!value.trim()) return 'Item Description is required';
  return '';
};

const validateCoords = (value: string, label: string) => {
  if (!value.trim()) return `${label} is required`;
  // Accepts "x, z" or "x, y, z" (numbers, optional spaces)
  if (!/^(-?\d+(\.\d+)?\s*,\s*){1,2}-?\d+(\.\d+)?$/.test(value.trim()))
    return `${label} must be two or three comma-separated numbers (e.g., 123, 456 or 123, 64, -456)`;
  return '';
};

const validatePaymentOffer = (value: string) => {
  if (!value.trim()) return 'Payment Offer is required';
  if (/^\d+(\.\d+)?$/.test(value.trim())) {
    if (parseFloat(value.trim()) <= 0) return 'Offer must be positive';
    return '';
  }
  if (!/^\d+\s*diamonds?$/i.test(value.trim()) && !/^diamonds?$/i.test(value.trim()))
    return 'Enter a positive number or "diamonds" (e.g., 10 diamonds)';
  return '';
};

interface FormStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const ConversationalForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, handleSubmit] = useForm('xqabvypp');
  const {
    formData,
    updateFormData,
    resetForm,
    trackJobSubmission,
    setSubmitting
  } = useDeliveryStore();

  // Show slow submission message if submitting > 3s
  const [showSlowMessage, setShowSlowMessage] = useState(false);
  useEffect(() => {
    let timer: number | undefined;
    if (state.submitting) {
      setShowSlowMessage(false);
      timer = window.setTimeout(() => setShowSlowMessage(true), 3000);
    } else {
      setShowSlowMessage(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state.submitting]);

  // Error state for each field
  const [errors, setErrors] = useState({
    discordUsername: '',
    ign: '',
    itemDescription: '',
    pickupCoords: '',
    dropoffCoords: '',
    paymentOffer: '',
  });

  // Refs for focus management
  const discordRef = useRef<HTMLInputElement>(null);
  const ignRef = useRef<HTMLInputElement>(null);
  const itemDescRef = useRef<HTMLTextAreaElement>(null);
  const pickupRef = useRef<HTMLInputElement>(null);
  const dropoffRef = useRef<HTMLInputElement>(null);
  const paymentRef = useRef<HTMLInputElement>(null);

  // Focus first invalid field after validation fails
  const focusFirstInvalid = (errs: typeof errors) => {
    if (currentStep === 0) {
      if (errs.discordUsername && discordRef.current) {
        discordRef.current.focus();
        return;
      }
      if (errs.ign && ignRef.current) {
        ignRef.current.focus();
        return;
      }
    } else if (currentStep === 1) {
      if (errs.itemDescription && itemDescRef.current) {
        itemDescRef.current.focus();
        return;
      }
    } else if (currentStep === 2) {
      if (errs.pickupCoords && pickupRef.current) {
        pickupRef.current.focus();
        return;
      }
      if (errs.dropoffCoords && dropoffRef.current) {
        dropoffRef.current.focus();
        return;
      }
    } else if (currentStep === 3) {
      if (errs.paymentOffer && paymentRef.current) {
        paymentRef.current.focus();
        return;
      }
    }
  };

  // Validate current step fields
  const validateStep = (shouldFocus = false) => {
    let newErrors = { ...errors };
    switch (currentStep) {
      case 0:
        newErrors.discordUsername = validateDiscordUsername(formData.discordUsername);
        newErrors.ign = validateMinecraftUsername(formData.ign);
        break;
      case 1:
        newErrors.itemDescription = validateItemDescription(formData.itemDescription);
        break;
      case 2:
        newErrors.pickupCoords = validateCoords(formData.pickupCoords, 'Pickup Location');
        newErrors.dropoffCoords = validateCoords(formData.dropoffCoords, 'Delivery Location');
        break;
      case 3:
        newErrors.paymentOffer = validatePaymentOffer(formData.paymentOffer);
        break;
      default:
        break;
    }
    setErrors(newErrors);
    if (shouldFocus) focusFirstInvalid(newErrors);
    // Return true if all errors for this step are empty
    switch (currentStep) {
      case 0:
        return !newErrors.discordUsername && !newErrors.ign;
      case 1:
        return !newErrors.itemDescription;
      case 2:
        return !newErrors.pickupCoords && !newErrors.dropoffCoords;
      case 3:
        return !newErrors.paymentOffer;
      default:
        return false;
    }
  };

  // Validate on field change
  useEffect(() => {
    validateStep();
    // eslint-disable-next-line
  }, [formData, currentStep]);

  // Handle Enter key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      
      if (currentStep === steps.length - 1) {
        // Last step - submit form if valid
        if (canProceed()) {
          const form = e.currentTarget.closest('form');
          if (form) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            form.dispatchEvent(submitEvent);
          }
        } else {
          validateStep(true);
        }
      } else {
        // Other steps - go to next step if valid
        if (canProceed()) {
          nextStep();
        } else {
          validateStep(true);
        }
      }
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = validateStep(true);
    if (!valid) return;
    setSubmitting(true);
    trackJobSubmission();
    handleSubmit(e as React.FormEvent<HTMLFormElement>);
  };

  const steps: FormStep[] = [
    {
      id: 'contact',
      title: "Let's get acquainted",
      subtitle: "How should I contact you when your stuff is ready?",
      icon: <MessageCircle className="h-6 w-6 text-blue-400" />,
      component: (
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-3">Discord Username</label>
            <input
              type="text"
              value={formData.discordUsername}
              onChange={(e) => updateFormData('discordUsername', e.target.value.toLowerCase())}
              onKeyDown={handleKeyDown}
              placeholder="e.g. nilstg"
              autoComplete="username"
              pattern="(?!.*\.\.)[a-z0-9._]{2,32}"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              disabled={state.submitting}
            />
            <p className="text-gray-400 text-sm mt-2">This is how I'll contact you about your delivery</p>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-3">Minecraft Username</label>
            <input
              type="text"
              value={formData.ign}
              onChange={(e) => updateFormData('ign', e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="YourMinecraftName"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              disabled={state.submitting}
            />
            <p className="text-gray-400 text-sm mt-2">So I know who to meet in-game</p>
          </div>
        </div>
      )
    },
    {
      id: 'items',
      title: "What needs moving?",
      subtitle: "Tell me what you need delivered (or bought for you)",
      icon: <Package className="h-6 w-6 text-green-400" />,
      component: (
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-3">What do you need?</label>
            <textarea
              value={formData.itemDescription}
              onChange={(e) => updateFormData('itemDescription', e.target.value)}
              onKeyDown={(e) => {
                // Allow Shift+Enter for new lines in textarea
                if (e.key === 'Enter' && !e.shiftKey) {
                  handleKeyDown(e);
                }
              }}
              placeholder="e.g., '64 oak logs from my tree farm' or 'buy me a diamond pickaxe from spawn shops'"
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg resize-none"
              disabled={state.submitting}
            />
            <p className="text-gray-400 text-sm mt-2">Be specific - it helps me give you accurate pricing</p>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-medium mb-2">💡 Pro Tips:</h4>
            <ul className="text-blue-200 text-sm space-y-1">
              <li>• <strong>Delivery:</strong> "Move 5 shulkers from X to Y"</li>
              <li>• <strong>Shopping:</strong> "Buy me 64 diamonds from PlayerShop"</li>
              <li>• <strong>Bulk:</strong> "Clear out my entire storage room"</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'locations',
      title: "Where's this happening?",
      subtitle: "I need coordinates so I can calculate distance and pricing",
      icon: <MapPin className="h-6 w-6 text-purple-400" />,
      component: (
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-3">Pickup Location</label>
            <input
              type="text"
              value={formData.pickupCoords}
              onChange={(e) => updateFormData('pickupCoords', e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="100, 64, -200"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              disabled={state.submitting}
            />
            <p className="text-gray-400 text-sm mt-2">Where should I pick up the items?</p>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-3">Delivery Location</label>
            <input
              type="text"
              value={formData.dropoffCoords}
              onChange={(e) => updateFormData('dropoffCoords', e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="300, 64, 150"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              disabled={state.submitting}
            />
            <p className="text-gray-400 text-sm mt-2">Where should I deliver them?</p>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">📍 How to get coordinates:</h4>
            <div className="text-gray-300 text-sm space-y-1">
              <p><strong>Java:</strong> Press F3, look for XYZ values</p>
              <p><strong>Bedrock:</strong> Enable "Show Coordinates" in settings</p>
              <p><strong>Format:</strong> Just copy/paste - I handle the formatting</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'payment',
      title: "Let's talk payment",
      subtitle: "How much are you offering? (Diamonds only, obviously)",
      icon: <Diamond className="h-6 w-6 text-yellow-400" />,
      component: (
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-3">Your Offer</label>
            <input
              type="text"
              value={formData.paymentOffer}
              onChange={(e) => updateFormData('paymentOffer', e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 10 diamonds, 15 diamonds"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
              disabled={state.submitting}
            />
            <p className="text-gray-400 text-sm mt-2">Be realistic - my time isn't free</p>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-3">How urgent is this?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { value: 'whenever', label: 'Whenever', desc: '20% discount' },
                { value: 'soon', label: 'Soon-ish', desc: 'Standard rate' },
                { value: 'urgent', label: 'ASAP', desc: '+50% surcharge' },
                { value: 'emergency', label: 'Emergency', desc: '+100% surcharge' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFormData('urgency', option.value)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    formData.urgency === option.value
                      ? 'border-yellow-500 bg-yellow-900/30 text-white'
                      : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                  }`}
                  disabled={state.submitting}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm opacity-75">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-3">Anything else I should know?</label>
            <textarea
              value={formData.notes}
              onChange={(e) => updateFormData('notes', e.target.value)}
              onKeyDown={(e) => {
                // Allow Shift+Enter for new lines in textarea
                if (e.key === 'Enter' && !e.shiftKey) {
                  handleKeyDown(e);
                }
              }}
              placeholder="Special instructions, dangers, or just vent about your day..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
              disabled={state.submitting}
            />
            <p className="text-gray-400 text-sm mt-2">Optional, but helpful</p>
          </div>
        </div>
      )
    }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.discordUsername.trim() && formData.ign.trim();
      case 1:
        return formData.itemDescription.trim();
      case 2:
        return formData.pickupCoords.trim() && formData.dropoffCoords.trim();
      case 3:
        return formData.paymentOffer.trim();
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (state.succeeded) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Job Submitted!</h3>
          <p className="text-gray-400 mb-6">
            I'll review your request and get back to you on Discord within 30 minutes. 
            Payment is due when I arrive at the pickup location.
          </p>
          <button
            onClick={() => {
              resetForm();
              setCurrentStep(0);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Another Job
          </button>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400 text-sm">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-gray-400 text-sm">{Math.round(((currentStep + 1) / steps.length) * 100)}% complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-6">
        <div className="flex items-center space-x-3 mb-6">
          {currentStepData.icon}
          <div>
            <h2 className="text-2xl font-bold text-white">{currentStepData.title}</h2>
            <p className="text-gray-400">{currentStepData.subtitle}</p>
          </div>
        </div>

        {/* Submission error message */}
        {Array.isArray(state.errors) && state.errors.length > 0 && !state.submitting && (
          <div className="mb-6 p-4 bg-red-800/70 border border-red-600 text-red-200 rounded-lg text-center font-semibold">
            Sorry, something went wrong submitting your request. Please check your connection and try again.
          </div>
        )}
        <form onSubmit={onSubmit} role="form" aria-labelledby="form-title">
          {/* Hidden fields for form submission */}
          <input type="hidden" name="discordUsername" value={formData.discordUsername} />
          <input type="hidden" name="ign" value={formData.ign} />
          <input type="hidden" name="itemDescription" value={formData.itemDescription} />
          <input type="hidden" name="pickupCoords" value={formData.pickupCoords} />
          <input type="hidden" name="dropoffCoords" value={formData.dropoffCoords} />
          <input type="hidden" name="paymentOffer" value={formData.paymentOffer} />
          <input type="hidden" name="urgency" value={formData.urgency} />
          <input type="hidden" name="notes" value={formData.notes} />
        
          {/* Step Fields */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-3" htmlFor="discordUsername">Discord Username</label>
                <input
                  id="discordUsername"
                  type="text"
                  value={formData.discordUsername}
                  onChange={(e) => updateFormData('discordUsername', e.target.value.toLowerCase())}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. nilstg"
                  autoComplete="username"
                  pattern="(?!.*\.\.)[a-z0-9._]{2,32}"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  disabled={state.submitting}
                  aria-required="true"
                  aria-invalid={!!errors.discordUsername}
                  aria-describedby={errors.discordUsername ? "discordUsername-error" : undefined}
                />
                <p className="text-gray-400 text-sm mt-2">This is how I'll contact you about your delivery</p>
                {errors.discordUsername && (
                  <span
                    id="discordUsername-error"
                    className="text-red-400 text-sm mt-1 block"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errors.discordUsername}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-white font-medium mb-3" htmlFor="ign">Minecraft Username</label>
                <input
                  id="ign"
                  type="text"
                  value={formData.ign}
                  onChange={(e) => updateFormData('ign', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="YourMinecraftName"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  disabled={state.submitting}
                  aria-required="true"
                  aria-invalid={!!errors.ign}
                  aria-describedby={errors.ign ? "ign-error" : undefined}
                />
                <p className="text-gray-400 text-sm mt-2">So I know who to meet in-game</p>
                {errors.ign && (
                  <span
                    id="ign-error"
                    className="text-red-400 text-sm mt-1 block"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errors.ign}
                  </span>
                )}
              </div>
            </div>
          )}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-3" htmlFor="itemDescription">What do you need?</label>
                <textarea
                  id="itemDescription"
                  value={formData.itemDescription}
                  onChange={(e) => updateFormData('itemDescription', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      handleKeyDown(e);
                    }
                  }}
                  placeholder="e.g., '64 oak logs from my tree farm' or 'buy me a diamond pickaxe from spawn shops'"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg resize-none"
                  disabled={state.submitting}
                  aria-required="true"
                  aria-invalid={!!errors.itemDescription}
                  aria-describedby={errors.itemDescription ? "itemDescription-error" : undefined}
                />
                <p className="text-gray-400 text-sm mt-2">Be specific - it helps me give you accurate pricing</p>
                {errors.itemDescription && (
                  <span
                    id="itemDescription-error"
                    className="text-red-400 text-sm mt-1 block"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errors.itemDescription}
                  </span>
                )}
              </div>
              {/* Pro Tips section unchanged */}
              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">💡 Pro Tips:</h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• <strong>Delivery:</strong> "Move 5 shulkers from X to Y"</li>
                  <li>• <strong>Shopping:</strong> "Buy me 64 diamonds from PlayerShop"</li>
                  <li>• <strong>Bulk:</strong> "Clear out my entire storage room"</li>
                </ul>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-3" htmlFor="pickupCoords">Pickup Location</label>
                <input
                  id="pickupCoords"
                  type="text"
                  value={formData.pickupCoords}
                  onChange={(e) => updateFormData('pickupCoords', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="100, 64, -200"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                  disabled={state.submitting}
                  aria-required="true"
                  aria-invalid={!!errors.pickupCoords}
                  aria-describedby={errors.pickupCoords ? "pickupCoords-error" : undefined}
                />
                <p className="text-gray-400 text-sm mt-2">Where should I pick up the items?</p>
                {errors.pickupCoords && (
                  <span
                    id="pickupCoords-error"
                    className="text-red-400 text-sm mt-1 block"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errors.pickupCoords}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-white font-medium mb-3" htmlFor="dropoffCoords">Delivery Location</label>
                <input
                  id="dropoffCoords"
                  type="text"
                  value={formData.dropoffCoords}
                  onChange={(e) => updateFormData('dropoffCoords', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="300, 64, 150"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                  disabled={state.submitting}
                  aria-required="true"
                  aria-invalid={!!errors.dropoffCoords}
                  aria-describedby={errors.dropoffCoords ? "dropoffCoords-error" : undefined}
                />
                <p className="text-gray-400 text-sm mt-2">Where should I deliver them?</p>
                {errors.dropoffCoords && (
                  <span
                    id="dropoffCoords-error"
                    className="text-red-400 text-sm mt-1 block"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errors.dropoffCoords}
                  </span>
                )}
              </div>
              {/* How to get coordinates section unchanged */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">📍 How to get coordinates:</h4>
                <div className="text-gray-300 text-sm space-y-1">
                  <p><strong>Java:</strong> Press F3, look for XYZ values</p>
                  <p><strong>Bedrock:</strong> Enable "Show Coordinates" in settings</p>
                  <p><strong>Format:</strong> Just copy/paste - I handle the formatting</p>
                </div>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-3" htmlFor="paymentOffer">Your Offer</label>
                <input
                  id="paymentOffer"
                  type="text"
                  value={formData.paymentOffer}
                  onChange={(e) => updateFormData('paymentOffer', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., 10 diamonds, 15 diamonds"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                  disabled={state.submitting}
                  aria-required="true"
                  aria-invalid={!!errors.paymentOffer}
                  aria-describedby={errors.paymentOffer ? "paymentOffer-error" : undefined}
                />
                <p className="text-gray-400 text-sm mt-2">Be realistic - my time isn't free</p>
                {errors.paymentOffer && (
                  <span
                    id="paymentOffer-error"
                    className="text-red-400 text-sm mt-1 block"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errors.paymentOffer}
                  </span>
                )}
              </div>
              {/* Urgency and notes fields unchanged */}
              <div>
                <label className="block text-white font-medium mb-3">How urgent is this?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'whenever', label: 'Whenever', desc: '20% discount' },
                    { value: 'soon', label: 'Soon-ish', desc: 'Standard rate' },
                    { value: 'urgent', label: 'ASAP', desc: '+50% surcharge' },
                    { value: 'emergency', label: 'Emergency', desc: '+100% surcharge' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFormData('urgency', option.value)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        formData.urgency === option.value
                          ? 'border-yellow-500 bg-yellow-900/30 text-white'
                          : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                      }`}
                      disabled={state.submitting}
                      type="button"
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm opacity-75">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-white font-medium mb-3" htmlFor="notes">Anything else I should know?</label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => updateFormData('notes', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      handleKeyDown(e);
                    }
                  }}
                  placeholder="Special instructions, dangers, or just vent about your day..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                  disabled={state.submitting}
                />
                <p className="text-gray-400 text-sm mt-2">Optional, but helpful</p>
              </div>
            </div>
          )}
        
          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0 || state.submitting}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                currentStep === 0 || state.submitting
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                type="submit"
                disabled={!canProceed() || state.submitting}
                className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all ${
                  canProceed() && !state.submitting
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {state.submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Submitting...</span>
                    {showSlowMessage && (
                      <span className="block text-yellow-300 text-sm mt-2" role="status" aria-live="polite">
                        Still processing, please wait...
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span>Submit Job</span>
                    <CheckCircle className="h-4 w-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                disabled={!canProceed() || state.submitting}
                className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all ${
                  canProceed() && !state.submitting
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </div>

      <ValidationError prefix="Job" field="discordUsername" errors={state.errors} />
      <ValidationError prefix="Job" field="ign" errors={state.errors} />
      <ValidationError prefix="Job" field="itemDescription" errors={state.errors} />
      <ValidationError prefix="Job" field="pickupCoords" errors={state.errors} />
      <ValidationError prefix="Job" field="dropoffCoords" errors={state.errors} />
      <ValidationError prefix="Job" field="paymentOffer" errors={state.errors} />
    </div>
  );
};

export default ConversationalForm;