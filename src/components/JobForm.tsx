import React, { useState } from 'react';
import { Send, MapPin, Package, MessageCircle, Diamond } from 'lucide-react';

const JobForm: React.FC = () => {
  const [formData, setFormData] = useState({
    ign: '',
    pickupCoords: '',
    dropoffCoords: '',
    itemDescription: '',
    itemQuantity: '',
    itemType: '',
    paymentOffer: '',
    contactMethod: 'discord',
    contactName: '',
    urgency: '',
    insurance: '',
    deadline: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Contact Name validation
    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact name required. Unless you want to be known as 'Mysterious Stranger'.";
    }

    // Urgency validation
    if (!formData.urgency.trim()) {
      newErrors.urgency = "Please specify how urgent this is. 'Yesterday' is not a valid option.";
    }

    // Insurance validation
    if (!formData.insurance.trim()) {
      newErrors.insurance = "Insurance selection required. If you don't care about your stuff, just say so.";
    }

    // Deadline validation
    if (!formData.deadline.trim()) {
      newErrors.deadline = "Deadline required. 'Whenever' is not specific enough.";
    }

    // Item Quantity validation
    if (!formData.itemQuantity.trim()) {
      newErrors.itemQuantity = "How many? 'A bunch' is not a number.";
    } else if (isNaN(Number(formData.itemQuantity)) || Number(formData.itemQuantity) <= 0) {
      newErrors.itemQuantity = "Quantity must be a positive number. No negative potatoes.";
    }

    // Item Type validation
    if (!formData.itemType.trim()) {
      newErrors.itemType = "What type of item? 'Stuff' is not descriptive.";
    }

    // IGN validation
    if (!formData.ign.trim()) {
      newErrors.ign = "IGN is required. Unless you're invisible, which you're not.";
    } else if (!/^[a-zA-Z0-9_]{3,16}$/.test(formData.ign.trim())) {
      newErrors.ign = "Invalid IGN. Minecraft usernames are 3-16 characters: letters, numbers, and underscores only.";
    }

    // Pickup Coords validation
    if (!formData.pickupCoords.trim()) {
      newErrors.pickupCoords = "Where am I supposed to pick this up? Your imagination?";
    } else if (!/^(-?\d+\s*,\s*){2}-?\d+$/.test(formData.pickupCoords.replace(/[XYZxyz:]/g, '').trim())) {
      newErrors.pickupCoords = "Invalid format. Use something like 'X:123, Y:64, Z:456'.";
    }

    // Dropoff Coords validation
    if (!formData.dropoffCoords.trim()) {
      newErrors.dropoffCoords = "Drop-off location required. Try again with brain cells.";
    } else if (!/^(-?\d+\s*,\s*){2}-?\d+$/.test(formData.dropoffCoords.replace(/[XYZxyz:]/g, '').trim())) {
      newErrors.dropoffCoords = "Invalid format. Use something like 'X:123, Y:64, Z:456'.";
    }

    // Item Description validation
    if (!formData.itemDescription.trim()) {
      newErrors.itemDescription = "What am I delivering? Air? Be specific.";
    } else if (formData.itemDescription.trim().length < 5) {
      newErrors.itemDescription = "Description must be at least 5 characters. Try harder.";
    }

    // Payment Offer validation
    if (!formData.paymentOffer.trim()) {
      newErrors.paymentOffer = "Payment offer required. I don't work for exposure.";
    } else if (!/\d+/.test(formData.paymentOffer)) {
      newErrors.paymentOffer = "Payment must include at least one number. '15 diamonds' is good. 'a potato' is not.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate form submission (replace with actual Formspree endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
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

  if (isSubmitted) {
    return (
      <section id="submit-job" className="py-20 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Job Submitted Successfully</h3>
            <p className="text-gray-400 mb-6">
              Your delivery request has been received. I'll get to it when I get to it. 
              Don't hold your breath, but also don't die waiting.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  ign: '',
                  pickupCoords: '',
                  dropoffCoords: '',
                  itemDescription: '',
                  itemQuantity: '',
                  itemType: '',
                  paymentOffer: '',
                  contactMethod: 'discord',
                  contactName: '',
                  urgency: '',
                  insurance: '',
                  deadline: '',
                  notes: ''
                });
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

  return (
    <section id="submit-job" className="py-20 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Submit Your Job
          </h2>
          <p className="text-xl text-gray-400">
            Fill out this form so I can reluctantly help you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <div className="space-y-6">
            {/* Contact Name */}
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-300 mb-2">
                Contact Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  aria-invalid={!!errors.contactName}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.contactName ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Your real or fake name, I won't judge"
                />
              </div>
              {errors.contactName && (
                <p className="text-red-400 text-sm mt-1" aria-live="polite">{errors.contactName}</p>
              )}
            </div>

            {/* Urgency */}
            <div>
              <label htmlFor="urgency" className="block text-sm font-medium text-gray-300 mb-2">
                Urgency *
              </label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                aria-invalid={!!errors.urgency}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.urgency ? 'border-red-500' : 'border-gray-600'
                }`}
              >
                <option value="">Select urgency</option>
                <option value="not-urgent">Whenever, I guess</option>
                <option value="soon">Soon-ish</option>
                <option value="urgent">ASAP (but not literally instant)</option>
                <option value="life-or-death">Life or death (I doubt it)</option>
              </select>
              {errors.urgency && (
                <p className="text-red-400 text-sm mt-1" aria-live="polite">{errors.urgency}</p>
              )}
            </div>

            {/* Insurance */}
            <div>
              <label htmlFor="insurance" className="block text-sm font-medium text-gray-300 mb-2">
                Insurance *
              </label>
              <select
                id="insurance"
                name="insurance"
                value={formData.insurance}
                onChange={handleChange}
                aria-invalid={!!errors.insurance}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.insurance ? 'border-red-500' : 'border-gray-600'
                }`}
              >
                <option value="">Select insurance</option>
                <option value="none">None (YOLO)</option>
                <option value="basic">Basic (I'll try not to drop it)</option>
                <option value="premium">Premium (I'll actually care)</option>
              </select>
              {errors.insurance && (
                <p className="text-red-400 text-sm mt-1" aria-live="polite">{errors.insurance}</p>
              )}
            </div>

            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-2">
                Deadline *
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                aria-invalid={!!errors.deadline}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.deadline ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.deadline && (
                <p className="text-red-400 text-sm mt-1" aria-live="polite">{errors.deadline}</p>
              )}
            </div>

            {/* Item Quantity */}
            <div>
              <label htmlFor="itemQuantity" className="block text-sm font-medium text-gray-300 mb-2">
                Item Quantity *
              </label>
              <input
                type="number"
                id="itemQuantity"
                name="itemQuantity"
                value={formData.itemQuantity}
                onChange={handleChange}
                aria-invalid={!!errors.itemQuantity}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.itemQuantity ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="How many?"
                min="1"
              />
              {errors.itemQuantity && (
                <p className="text-red-400 text-sm mt-1" aria-live="polite">{errors.itemQuantity}</p>
              )}
            </div>

            {/* Item Type */}
            <div>
              <label htmlFor="itemType" className="block text-sm font-medium text-gray-300 mb-2">
                Item Type *
              </label>
              <input
                type="text"
                id="itemType"
                name="itemType"
                value={formData.itemType}
                onChange={handleChange}
                aria-invalid={!!errors.itemType}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.itemType ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Potatoes, diamonds, suspicious stew..."
              />
              {errors.itemType && (
                <p className="text-red-400 text-sm mt-1" aria-live="polite">{errors.itemType}</p>
              )}
            </div>

            {/* IGN Field */}
            <div>
              <label htmlFor="ign" className="block text-sm font-medium text-gray-300 mb-2">
                Minecraft IGN *
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
                <MessageCircle className="absolute right-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" focusable="false" />
              </div>
              {errors.ign && (
                <p className="text-red-400 text-sm mt-1" aria-live="polite">{errors.ign}</p>
              )}
            </div>

            {/* Pickup Coordinates */}
            <div>
              <label htmlFor="pickupCoords" className="block text-sm font-medium text-gray-300 mb-2">
                Pickup Coordinates *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="pickupCoords"
                  name="pickupCoords"
                  value={formData.pickupCoords}
                  onChange={handleChange}
                  aria-invalid={!!errors.pickupCoords}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.pickupCoords ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="X: 123, Y: 64, Z: -456"
                />
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" focusable="false" />
              </div>
              {errors.pickupCoords && (
                <p className="text-red-400 text-sm mt-1" aria-live="polite">{errors.pickupCoords}</p>
              )}
            </div>

            {/* Drop-off Coordinates */}
            <div>
              <label htmlFor="dropoffCoords" className="block text-sm font-medium text-gray-300 mb-2">
                Drop-off Coordinates *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="dropoffCoords"
                  name="dropoffCoords"
                  value={formData.dropoffCoords}
                  onChange={handleChange}
                  aria-invalid={!!errors.dropoffCoords}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.dropoffCoords ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="X: 789, Y: 64, Z: -101"
                />
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" focusable="false" />
              </div>
              {errors.dropoffCoords && (
                <p className="text-red-400 text-sm mt-1" aria-live="polite">{errors.dropoffCoords}</p>
              )}
            </div>

            {/* Item Description */}
            <div>
              <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-300 mb-2">
                Item Description *
              </label>
              <div className="relative">
                <textarea
                  id="itemDescription"
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleChange}
                  rows={4}
                  aria-invalid={!!errors.itemDescription}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.itemDescription ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Describe what you need delivered. Be specific or I'll deliver the wrong thing on purpose."
                />
                <Package className="absolute right-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" focusable="false" />
              </div>
              {errors.itemDescription && (
                <p className="text-red-400 text-sm mt-1" aria-live="polite">{errors.itemDescription}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Anything else I should know? Bribes, threats, secret handshakes..."
              />
            </div>

            {/* Payment Offer */}
            <div>
              <label htmlFor="paymentOffer" className="block text-sm font-medium text-gray-300 mb-2">
                Payment Offer *
              </label>
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
                  placeholder="15 diamonds, 30 diamonds, or whatever you can afford"
                />
                <Diamond className="absolute right-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" focusable="false" />
              </div>
              {errors.paymentOffer && (
                <p className="text-red-400 text-sm mt-1" aria-live="polite">{errors.paymentOffer}</p>
              )}
            </div>

            {/* Contact Method */}
            <div>
              <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-300 mb-2">
                Contact Method *
              </label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="discord">Discord</option>
                <option value="ingame">In-game message</option>
                <option value="email" disabled>Email (You thought this was real? Cute.)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing (This might take a while)
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" aria-hidden="true" focusable="false" />
                  Submit Job (Because You Won't)
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JobForm;