import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Send, MapPin, Package, MessageCircle, Diamond } from 'lucide-react';

const JobForm: React.FC = () => {
  const [state, handleSubmit] = useForm("xqabvypp"); // Replace with your Formspree form ID
  const [formData, setFormData] = useState({
    ign: '',
    pickupCoords: '',
    dropoffCoords: '',
    itemDescription: '',
    paymentOffer: '',
    contactMethod: 'discord'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.ign.trim()) {
      newErrors.ign = "Minecraft IGN is required";
    }

    if (!formData.pickupCoords.trim()) {
      newErrors.pickupCoords = "Pickup coordinates are required";
    }

    if (!formData.dropoffCoords.trim()) {
      newErrors.dropoffCoords = "Drop-off coordinates are required";
    }

    if (!formData.itemDescription.trim()) {
      newErrors.itemDescription = "Item description is required";
    }

    if (!formData.paymentOffer.trim()) {
      newErrors.paymentOffer = "Payment offer is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Create form data for Formspree
    const form = e.target as HTMLFormElement;
    await handleSubmit(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (state.succeeded) {
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
                setFormData({
                  ign: '',
                  pickupCoords: '',
                  dropoffCoords: '',
                  itemDescription: '',
                  paymentOffer: '',
                  contactMethod: 'discord'
                });
                window.location.reload(); // Reset form state
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Another Job (Glutton for punishment?)
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
            Request a delivery by filling out the form below
          </p>
        </div>

        <form onSubmit={onSubmit} className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700">
          <div className="space-y-6">
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
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.ign ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="YourMinecraftUsername"
                  required
                />
                <MessageCircle className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              {errors.ign && <p className="text-red-400 text-sm mt-1">{errors.ign}</p>}
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
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.pickupCoords ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="X: 123, Y: 64, Z: -456"
                  required
                />
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              {errors.pickupCoords && <p className="text-red-400 text-sm mt-1">{errors.pickupCoords}</p>}
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
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.dropoffCoords ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="X: 789, Y: 64, Z: -101"
                  required
                />
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              {errors.dropoffCoords && <p className="text-red-400 text-sm mt-1">{errors.dropoffCoords}</p>}
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
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.itemDescription ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Describe what you need delivered. Be specific or I'll deliver the wrong thing on purpose."
                  required
                />
                <Package className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              {errors.itemDescription && <p className="text-red-400 text-sm mt-1">{errors.itemDescription}</p>}
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
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.paymentOffer ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="15 diamonds, 30 diamonds, or whatever you can afford"
                  required
                />
                <Diamond className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              {errors.paymentOffer && <p className="text-red-400 text-sm mt-1">{errors.paymentOffer}</p>}
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
                required
              >
                <option value="discord">Discord</option>
                <option value="ingame">In-game message</option>
                <option value="email" disabled>Email (Nice try, but no)</option>
              </select>
            </div>

            <ValidationError 
              prefix="Form" 
              field="form"
              errors={state.errors}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={state.submitting}
              className={`w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 ${
                state.submitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {state.submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting (Don't hold your breath)
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Job (Finally!)
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