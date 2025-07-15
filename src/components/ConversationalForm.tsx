import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, MessageCircle, Package, MapPin, Diamond } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

interface FormStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const ConversationalForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    discordUsername: '',
    ign: '',
    itemDescription: '',
    pickupCoords: '',
    dropoffCoords: '',
    paymentOffer: '',
    urgency: 'soon',
    notes: ''
  });
  const [state, handleSubmit] = useForm('xqabvypp');

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
        }
      } else {
        // Other steps - go to next step if valid
        if (canProceed()) {
          nextStep();
        }
      }
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              placeholder="yourname (lowercase, no @)"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
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
            onClick={() => window.location.reload()}
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

        <form onSubmit={onSubmit}>
          {currentStepData.component}
          
          {/* Hidden fields for form submission */}
          <input type="hidden" name="discordUsername" value={formData.discordUsername} />
          <input type="hidden" name="ign" value={formData.ign} />
          <input type="hidden" name="itemDescription" value={formData.itemDescription} />
          <input type="hidden" name="pickupCoords" value={formData.pickupCoords} />
          <input type="hidden" name="dropoffCoords" value={formData.dropoffCoords} />
          <input type="hidden" name="paymentOffer" value={formData.paymentOffer} />
          <input type="hidden" name="urgency" value={formData.urgency} />
          <input type="hidden" name="notes" value={formData.notes} />

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                currentStep === 0
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
                disabled={!canProceed()}
                className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all ${
                  canProceed()
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