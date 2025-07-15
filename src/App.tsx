import React from 'react';
import { Package, Diamond, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

function App() {
  const [state, handleSubmit] = useForm('xqabvypp');

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Job Submitted!</h2>
          <p className="text-gray-400 mb-6">
            I'll contact you on Discord within 30 minutes. Payment due on pickup.
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold">Because You Won't™</h1>
              <p className="text-sm text-gray-400">Minecraft Delivery Service</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-400">
            <div>Payment: Diamonds only</div>
            <div>Contact: Discord</div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-blue-400" />
                Submit Delivery Job
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Discord Username</label>
                    <input
                      type="text"
                      name="discordUsername"
                      placeholder="yourname"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Minecraft Username</label>
                    <input
                      type="text"
                      name="ign"
                      placeholder="YourMinecraftName"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">What needs delivered?</label>
                  <textarea
                    name="itemDescription"
                    placeholder="e.g., 64 oak logs, diamond pickaxe, etc."
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Pickup Location</label>
                    <input
                      type="text"
                      name="pickupCoords"
                      placeholder="100, 64, -200"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Delivery Location</label>
                    <input
                      type="text"
                      name="dropoffCoords"
                      placeholder="300, 64, 150"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Payment Offer</label>
                  <input
                    type="text"
                    name="paymentOffer"
                    placeholder="5 diamonds"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Urgency</label>
                  <select
                    name="urgency"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="whenever">Whenever (20% discount)</option>
                    <option value="soon">Soon-ish (standard rate)</option>
                    <option value="urgent">ASAP (+50% fee)</option>
                    <option value="emergency">Emergency (+100% fee)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Notes (optional)</label>
                  <textarea
                    name="notes"
                    placeholder="Any special instructions..."
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? 'Submitting...' : 'Submit Job'}
                </button>

                <ValidationError prefix="Job" field="discordUsername" errors={state.errors} />
                <ValidationError prefix="Job" field="ign" errors={state.errors} />
                <ValidationError prefix="Job" field="itemDescription" errors={state.errors} />
                <ValidationError prefix="Job" field="pickupCoords" errors={state.errors} />
                <ValidationError prefix="Job" field="dropoffCoords" errors={state.errors} />
                <ValidationError prefix="Job" field="paymentOffer" errors={state.errors} />
              </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Diamond className="h-5 w-5 text-yellow-400" />
                Pricing
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Base fee:</span>
                  <span className="text-white">3 diamonds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Per 100 blocks:</span>
                  <span className="text-white">+2 diamonds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Nether/End:</span>
                  <span className="text-white">+50%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rush jobs:</span>
                  <span className="text-white">+50-100%</span>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                How It Works
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  <span>Submit your delivery request</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  <span>I'll contact you on Discord</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  <span>Meet at pickup location</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                  <span>Pay diamonds, I deliver</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-400" />
                Contact
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div><strong>Discord:</strong> NilsTG</div>
                <div><strong>Response time:</strong> When I'm online</div>
                <div><strong>Payment:</strong> Diamonds only</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>Because You Won't™ - Professional Minecraft delivery service</p>
          <p className="mt-1">Payment due on pickup • All dimensions covered • Professional service guaranteed</p>
        </div>
      </footer>
    </div>
  );
}

export default App;