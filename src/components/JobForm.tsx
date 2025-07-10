import React, { useState, useEffect } from 'react';
import { Send, MapPin, Package, MessageCircle, Diamond, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Calculator, Clock, Shield } from 'lucide-react';
import AccessibleSelect from './AccessibleSelect';

const JobForm: React.FC = () => {
  const [formData, setFormData] = useState({
    // Essential fields (always visible)
    ign: '',
    itemDescription: '',
    pickupCoords: '',
    dropoffCoords: '',
    paymentOffer: '',
    
    // Smart defaults
    contactMethod: 'discord',
    urgency: 'soon',
    insurance: 'basic',
    itemQuantity: '64',
    
    // Optional fields (progressive disclosure)
    contactName: '',
    deadline: '',
    notes: '',
    itemType: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Options for accessible selects
  const urgencyOptions = [
    { value: 'not-urgent', label: 'Whenever', description: '20% discount - I\'ll get to it eventually' },
    { value: 'soon', label: 'Soon-ish', description: 'Standard pricing - reasonable timeframe' },
    { value: 'urgent', label: 'ASAP', description: '+50% surcharge - priority queue' },
    { value: 'life-or-death', label: 'Emergency', description: '+100% surcharge - drop everything mode' }
  ];

  const insuranceOptions = [
    { value: 'none', label: 'None (YOLO)', description: 'No protection - live dangerously' },
    { value: 'basic', label: 'Basic Protection', description: '+2 diamonds - standard coverage' },
    { value: 'premium', label: 'Premium Coverage', description: '+5 diamonds - full protection guarantee' }
  ];

  const contactOptions = [
    { value: 'discord', label: 'Discord', description: 'Fastest response time' },
    { value: 'minecraft', label: 'In-game chat', description: 'When I\'m online' },
    { value: 'reddit', label: 'Reddit DM', description: 'Slower but reliable' }
  ];

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('jobForm_draft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.warn('Failed to load saved form data');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jobForm_draft', JSON.stringify(formData));
  }, [formData]);

  // Smart validation with contextual messages
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // IGN validation with helpful suggestions
    if (!formData.ign.trim()) {
      newErrors.ign = "Your Minecraft username is required";
    } else if (!/^[a-zA-Z0-9_]{3,16}$/.test(formData.ign.trim())) {
      newErrors.ign = "Minecraft usernames are 3-16 characters (letters, numbers, underscores only)";
    }

    // Item description with smart suggestions
    if (!formData.itemDescription.trim()) {
      newErrors.itemDescription = "What should I deliver?";
    } else if (formData.itemDescription.trim().length < 3) {
      newErrors.itemDescription = "Please be more specific (at least 3 characters)";
    }

    // Coordinate validation with format help
    const coordPattern = /^-?\d+\s*,?\s*-?\d+\s*,?\s*-?\d+$/;
    if (!formData.pickupCoords.trim()) {
      newErrors.pickupCoords = "Where should I pick up the items?";
    } else if (!coordPattern.test(formData.pickupCoords.replace(/[XYZxyz:\s]/g, ''))) {
      newErrors.pickupCoords = "Format: X Y Z or X,Y,Z (e.g., 100 64 -200)";
    }

    if (!formData.dropoffCoords.trim()) {
      newErrors.dropoffCoords = "Where should I deliver the items?";
    } else if (!coordPattern.test(formData.dropoffCoords.replace(/[XYZxyz:\s]/g, ''))) {
      newErrors.dropoffCoords = "Format: X Y Z or X,Y,Z (e.g., 100 64 -200)";
    }

    // Payment validation with suggestions
    if (!formData.paymentOffer.trim()) {
      newErrors.paymentOffer = "How much are you offering?";
    } else if (!/\d+/.test(formData.paymentOffer)) {
      newErrors.paymentOffer = "Please include a number (e.g., '5 diamonds')";
    }

    // Quantity validation
    if (formData.itemQuantity && (isNaN(Number(formData.itemQuantity)) || Number(formData.itemQuantity) <= 0)) {
      newErrors.itemQuantity = "Quantity must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Smart price calculator
  const calculateEstimatedCost = () => {
    const quantity = parseInt(formData.itemQuantity) || 64;
    const urgency = formData.urgency;
    const insurance = formData.insurance;
    
    // Base cost: 3 diamonds minimum, +1 per stack
    let baseCost = Math.max(3, Math.ceil(quantity / 64) + 2);
    
    // Urgency multipliers
    const urgencyMultipliers = {
      'not-urgent': 0.8,
      'soon': 1,
      'urgent': 1.5,
      'life-or-death': 2
    };
    
    baseCost *= urgencyMultipliers[urgency as keyof typeof urgencyMultipliers] || 1;
    
    // Insurance costs
    if (insurance === 'premium') baseCost += 5;
    if (insurance === 'basic') baseCost += 2;
    
    return Math.ceil(baseCost);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      const element = document.getElementById(firstError);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      localStorage.removeItem('jobForm_draft'); // Clear saved data
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Auto-format coordinates
  const handleCoordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Auto-format common coordinate patterns
    let formatted = value;
    if (value.match(/^\d+\s+\d+\s+\d+$/)) {
      formatted = value.replace(/\s+/g, ', ');
    }
    setFormData(prev => ({ ...prev, [name]: formatted }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="submit-job" className="py-20 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Job Submitted Successfully!</h3>
            <p className="text-gray-400 mb-6">
              Your delivery request has been received. I'll get to it when I get to it. 
              Check Discord for updates!
            </p>
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <h4 className="text-white font-medium mb-2">What happens next:</h4>
              <ul className="text-gray-300 text-sm space-y-1 text-left">
                <li>• I'll review your request within 30 minutes</li>
                <li>• You'll get a Discord message with pickup details</li>
                <li>• Payment is due when I arrive at pickup location</li>
                <li>• Delivery confirmation sent when complete</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  ign: '',
                  itemDescription: '',
                  pickupCoords: '',
                  dropoffCoords: '',
                  paymentOffer: '',
                  contactMethod: 'discord',
                  urgency: 'soon',
                  insurance: 'basic',
                  itemQuantity: '64',
                  contactName: '',
                  deadline: '',
                  notes: '',
                  itemType: ''
                });
                setCurrentStep(1);
                setShowAdvanced(false);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Another Job
            </button>
          </div>
        </div>
      </section>
    );
  }

  const completedFields = Object.entries(formData).filter(([key, value]) => {
    if (['contactMethod', 'urgency', 'insurance'].includes(key)) return true; // Smart defaults
    return value.trim() !== '';
  }).length;

  const totalFields = Object.keys(formData).length;
  const progress = (completedFields / totalFields) * 100;

  return (
    <section id="submit-job" className="py-20 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Submit Your Job
          </h2>
          <p className="text-xl text-gray-400">
            Quick form - only the essentials required
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Step 1: Essential Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Essential Information
              </h3>

              {/* IGN Field */}
              <div>
                <label htmlFor="ign" className="block text-sm font-medium text-gray-300 mb-2">
                  Minecraft Username *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="ign"
                    name="ign"
                    value={formData.ign}
                    onChange={handleChange}
                    aria-invalid={!!errors.ign}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.ign ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="YourMinecraftUsername"
                  />
                  <MessageCircle className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                {errors.ign && (
                  <p className="text-red-400 text-sm mt-1">{errors.ign}</p>
                )}
              </div>

              {/* Item Description */}
              <div>
                <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-300 mb-2">
                  What do you need? (Delivery or Shopping Service) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="itemDescription"
                    name="itemDescription"
                    value={formData.itemDescription}
                    onChange={handleChange}
                    aria-invalid={!!errors.itemDescription}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.itemDescription ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="e.g., 'Deliver: 64 oak logs' or 'Buy me: diamond pickaxe from spawn shops'"
                  />
                  <Package className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                {errors.itemDescription && (
                  <p className="text-red-400 text-sm mt-1">{errors.itemDescription}</p>
                )}
              </div>

              {/* Coordinates Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickupCoords" className="block text-sm font-medium text-gray-300 mb-2">
                    Pickup Location *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="pickupCoords"
                      name="pickupCoords"
                      value={formData.pickupCoords}
                      onChange={handleCoordChange}
                      aria-invalid={!!errors.pickupCoords}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.pickupCoords ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="100, 64, -200"
                    />
                    <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.pickupCoords && (
                    <p className="text-red-400 text-sm mt-1">{errors.pickupCoords}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="dropoffCoords" className="block text-sm font-medium text-gray-300 mb-2">
                    Delivery Location *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="dropoffCoords"
                      name="dropoffCoords"
                      value={formData.dropoffCoords}
                      onChange={handleCoordChange}
                      aria-invalid={!!errors.dropoffCoords}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.dropoffCoords ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="300, 64, 150"
                    />
                    <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.dropoffCoords && (
                    <p className="text-red-400 text-sm mt-1">{errors.dropoffCoords}</p>
                  )}
                </div>
              </div>

              {/* Payment Offer */}
              <div>
                <label htmlFor="paymentOffer" className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Offer *
                  <button
                    type="button"
                    onClick={() => setShowPriceCalculator(!showPriceCalculator)}
                    className="ml-2 text-blue-400 hover:text-blue-300 text-xs"
                  >
                    <Calculator className="h-4 w-4 inline" /> Price Calculator
                  </button>
                </label>
                
                {showPriceCalculator && (
                  <div className="mb-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                    <div className="text-sm text-blue-400 mb-2">Estimated Cost: {calculateEstimatedCost()} diamonds</div>
                    <div className="text-xs text-gray-400">
                      Based on: {Math.ceil(parseInt(formData.itemQuantity || '64') / 64)} stack(s), {formData.urgency} urgency, {formData.insurance} insurance
                    </div>
                  </div>
                )}
                
                <div className="relative">
                  <input
                    type="text"
                    id="paymentOffer"
                    name="paymentOffer"
                    value={formData.paymentOffer}
                    onChange={handleChange}
                    aria-invalid={!!errors.paymentOffer}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.paymentOffer ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="e.g., 5 diamonds, 10 diamonds"
                  />
                  <Diamond className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                {errors.paymentOffer && (
                  <p className="text-red-400 text-sm mt-1">{errors.paymentOffer}</p>
                )}
              </div>
            </div>

            {/* Smart Defaults Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Service Options
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AccessibleSelect
                  id="urgency"
                  label="Urgency"
                  options={urgencyOptions}
                  value={formData.urgency}
                  onChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
                  searchable={false}
                />

                <AccessibleSelect
                  id="insurance"
                  label="Insurance"
                  options={insuranceOptions}
                  value={formData.insurance}
                  onChange={(value) => setFormData(prev => ({ ...prev, insurance: value }))}
                  searchable={false}
                />

                <div>
                  <label htmlFor="itemQuantity" className="block text-sm font-medium text-gray-300 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="itemQuantity"
                    name="itemQuantity"
                    value={formData.itemQuantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="64"
                    min="1"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {formData.itemQuantity && `~${Math.ceil(parseInt(formData.itemQuantity) / 64)} stack(s)`}
                  </div>
                </div>
              </div>
            </div>

            {/* Progressive Disclosure - Advanced Options */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                Advanced Options (Optional)
              </button>

              {showAdvanced && (
                <div className="mt-4 space-y-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AccessibleSelect
                      id="contactMethod"
                      label="Preferred Contact Method"
                      options={contactOptions}
                      value={formData.contactMethod}
                      onChange={(value) => setFormData(prev => ({ ...prev, contactMethod: value }))}
                      searchable={false}
                    />

                    <div>
                      <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-2">
                        Deadline
                      </label>
                      <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      placeholder="Any special instructions, dangers, or notes..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {(formData.itemDescription || formData.paymentOffer) && (
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-4 w-4 text-blue-400" />
                  <span className="text-white font-medium">Order Summary</span>
                </div>
                <div className="space-y-2 text-sm">
                  {formData.itemDescription && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Items:</span>
                      <span className="text-white">{formData.itemDescription}</span>
                    </div>
                  )}
                  {formData.itemQuantity && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Quantity:</span>
                      <span className="text-white">
                        {formData.itemQuantity} items 
                        <span className="text-gray-400 text-xs ml-1">
                          (~{Math.ceil(parseInt(formData.itemQuantity) / 64)} stacks)
                        </span>
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-300">Service:</span>
                    <span className="text-white capitalize">{formData.urgency.replace('-', ' ')} • {formData.insurance} insurance</span>
                  </div>
                  {formData.paymentOffer && (
                    <div className="flex justify-between border-t border-gray-600 pt-2">
                      <span className="text-gray-300">Payment:</span>
                      <span className="text-blue-400 font-medium">{formData.paymentOffer}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105 shadow-lg'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing Your Request...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Job Request
                </>
              )}
            </button>

            {/* Help Tips */}
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">Quick Tips:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong>Delivery:</strong> You have items, I move them. Payment due at pickup.</li>
                    <li>• <strong>Shopping:</strong> I buy items for you. You pay me back + service fee.</li>
                    <li>• <strong>Coordinates:</strong> Use F3 for exact location (X Y Z format)</li>
                    <li>• <strong>Dangerous areas:</strong> Nether/End/PvP zones cost extra (danger tax)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JobForm;