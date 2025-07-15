import React from 'react';
import { Package, Diamond, MapPin, MessageCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

function App() {
  const [state, handleSubmit] = useForm('xqabvypp');
  const [brokeMenuOpen, setBrokeMenuOpen] = React.useState(false);
  const [expandedServices, setExpandedServices] = React.useState<Record<string, boolean>>({});

  const toggleService = (serviceId: string) => {
    setExpandedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Job Submitted!</h2>
          <p className="text-gray-400 mb-6">
            I'll contact you on Discord when I'm online. Payment due on pickup.
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Package className="h-12 w-12 text-blue-400 animate-pulse" />
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
            </div>
            <h1 className="text-3xl font-bold">Because You Won't™</h1>
          </div>
          <p className="text-xl text-gray-400">Minecraft Delivery Service</p>
          <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Check Discord: NilsTG</span>
            </div>
            <div>•</div>
            <div>Payment in diamonds only</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl hover:border-blue-500/50 transition-all duration-300">
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
                      className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Minecraft Username</label>
                    <input
                      type="text"
                      name="ign"
                      placeholder="YourMinecraftName"
                      required
                      className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">What needs delivered?</label>
                  <textarea
                    name="itemDescription"
                    placeholder="e.g., 64 oak logs from spawn shops, diamond pickaxe from PlayerShop, etc."
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-700 resize-none"
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
                      className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Delivery Location</label>
                    <input
                      type="text"
                      name="dropoffCoords"
                      placeholder="300, 64, 150"
                      required
                      className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-700"
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
                    className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Urgency</label>
                  <select
                    name="urgency"
                    className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-700"
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
                    placeholder="Special instructions, remote pickup request, or just vent about your day..."
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-700 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
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
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl hover:border-yellow-500/50 transition-all duration-300">
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
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl hover:border-green-500/50 transition-all duration-300">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                How It Works
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5 shadow-lg">1</span>
                  <span>Submit your delivery request</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5 shadow-lg">2</span>
                  <span>I'll contact you on Discord</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5 shadow-lg">3</span>
                  <span>Meet at pickup location</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5 shadow-lg">4</span>
                  <span>Pay diamonds, I deliver</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-400" />
                Contact
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div><strong>Discord:</strong> NilsTG</div>
                <div><strong>Response time:</strong> When I'm online</div>
                <div><strong>Payment:</strong> Diamonds only</div>
              </div>
              <div><strong>Remote pickup:</strong> Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Broke People Menu */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <button
            onClick={() => setBrokeMenuOpen(!brokeMenuOpen)}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 cursor-pointer"
          >
            <span className="text-2xl">🪙</span>
            <h2 className="text-xl font-bold text-white">Broke People Menu™</h2>
            {brokeMenuOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
          </button>
          <p className="text-gray-400 mt-4 italic">
            "Because even cheapskates deserve service. Just not fast service."
          </p>
        </div>
        
        {brokeMenuOpen && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-300">
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-3">
            <h3 className="text-white font-bold">Budget Services</h3>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <div>
                <div className="text-white font-medium">Basic Delivery (within 300 blocks)</div>
                <div className="text-gray-400 text-sm">Includes sarcasm at no extra cost</div>
              </div>
              <div className="text-yellow-400 font-bold">3 diamonds</div>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <div>
                <div className="text-white font-medium">Multi-Shop Delivery</div>
                <div className="text-gray-400 text-sm">Because you couldn't walk to two places</div>
              </div>
              <div className="text-yellow-400 font-bold">5 diamonds</div>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <div>
                <div className="text-white font-medium">Item Relocation (within your base)</div>
                <div className="text-gray-400 text-sm">Literally carrying something 10 blocks</div>
              </div>
              <div className="text-yellow-400 font-bold">2 diamonds</div>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <div className="text-white font-medium">Low Priority Queue Slot</div>
                <div className="text-gray-400 text-sm">I'll get to it. Eventually. Maybe.</div>
              </div>
              <div className="text-yellow-400 font-bold">1 diamond</div>
            </div>
          </div>
          
          <div className="bg-yellow-900/20 border-t border-yellow-700/30 px-6 py-4">
            <div className="text-yellow-400 text-sm font-medium mb-2">⚠️ Broke People Menu™ Terms:</div>
            <ul className="text-yellow-200 text-xs space-y-1">
              <li>• "Budget" doesn't mean "fast" or "with a smile"</li>
              <li>• Payment due upfront. No credit for broke people.</li>
              <li>• Attitude adjustment not included in any package</li>
              <li>• New players get one free "how to find shops" tutorial</li>
              <li>• All services subject to my mood and diamond reserves</li>
            </ul>
          </div>
        </div>
        )}
        
        {brokeMenuOpen && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 animate-in slide-in-from-top-2 duration-300">
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <span className="text-green-400">💡</span>
            New Player Special
          </h4>
          <p className="text-gray-300 text-sm">
            First-time customers get a free "Server Tour" where I show you important locations. 
            After that, you're on your own like everyone else.
          </p>
        </div>
        )}
      </div>

      {/* Services Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">What I Do</h2>
          <p className="text-gray-400">Simple delivery services for lazy players</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 shadow-xl hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">📦 Item Delivery</h3>
            <p className="text-gray-300 text-sm mb-3">Move your stuff from point A to point B</p>
            <button
              onClick={() => toggleService('item-delivery')}
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors mb-3"
            >
              {expandedServices['item-delivery'] ? 'Hide Details' : 'Show Details'}
            </button>
            {expandedServices['item-delivery'] && (
              <ul className="text-gray-400 text-sm space-y-1 animate-in slide-in-from-top-2 duration-200">
              <li>• Any items, any distance</li>
              <li>• I take the risk, you don't</li>
              <li>• 5-15 diamonds depending on distance</li>
            </ul>
            )}
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 shadow-xl hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">🛒 Shopping Service</h3>
            <p className="text-gray-300 text-sm mb-3">Buy items from shops for you</p>
            <button
              onClick={() => toggleService('shopping-service')}
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors mb-3"
            >
              {expandedServices['shopping-service'] ? 'Hide Details' : 'Show Details'}
            </button>
            {expandedServices['shopping-service'] && (
              <ul className="text-gray-400 text-sm space-y-1 animate-in slide-in-from-top-2 duration-200">
              <li>• Visit multiple shops</li>
              <li>• Compare prices</li>
              <li>• Item cost + 5-7 diamonds</li>
            </ul>
            )}
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 shadow-xl hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">📱 Remote Pickup</h3>
            <p className="text-gray-300 text-sm mb-3">Stay at your base, I'll come to you</p>
            <button
              onClick={() => toggleService('remote-pickup')}
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors mb-3"
            >
              {expandedServices['remote-pickup'] ? 'Hide Details' : 'Show Details'}
            </button>
            {expandedServices['remote-pickup'] && (
              <ul className="text-gray-400 text-sm space-y-1 animate-in slide-in-from-top-2 duration-200">
              <li>• Text me your coords + what you need</li>
              <li>• Keep building while I handle logistics</li>
              <li>• Perfect for active builders</li>
              <li>• I bring stuff, you keep building</li>
            </ul>
            )}
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 shadow-xl hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">🚚 Base Moving</h3>
            <p className="text-gray-300 text-sm mb-3">Move your stuff from old base to new base</p>
            <button
              onClick={() => toggleService('base-moving')}
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors mb-3"
            >
              {expandedServices['base-moving'] ? 'Hide Details' : 'Show Details'}
            </button>
            {expandedServices['base-moving'] && (
              <ul className="text-gray-400 text-sm space-y-1 animate-in slide-in-from-top-2 duration-200">
              <li>• Pack everything into shulkers</li>
              <li>• Transport to new location</li>
              <li>• Dump it all there (you organize)</li>
              <li>• 50-200 diamonds depending on size</li>
            </ul>
            )}
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 shadow-xl hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">🆘 Emergency Rescue</h3>
            <p className="text-gray-300 text-sm mb-3">When you're stuck and need help</p>
            <button
              onClick={() => toggleService('emergency-rescue')}
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors mb-3"
            >
              {expandedServices['emergency-rescue'] ? 'Hide Details' : 'Show Details'}
            </button>
            {expandedServices['emergency-rescue'] && (
              <ul className="text-gray-400 text-sm space-y-1 animate-in slide-in-from-top-2 duration-200">
              <li>• Emergency supply runs</li>
              <li>• Finish abandoned jobs</li>
              <li>• 20-75 diamonds depending on urgency</li>
            </ul>
            )}
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 shadow-xl hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">💰 Debt Collection</h3>
            <p className="text-gray-300 text-sm mb-3">Professional awkward conversation handler</p>
            <button
              onClick={() => toggleService('debt-collection')}
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors mb-3"
            >
              {expandedServices['debt-collection'] ? 'Hide Details' : 'Show Details'}
            </button>
            {expandedServices['debt-collection'] && (
              <ul className="text-gray-400 text-sm space-y-1 animate-in slide-in-from-top-2 duration-200">
              <li>• Collect unpaid trades and IOUs</li>
              <li>• Handle borrowed items never returned</li>
              <li>• 5-15 diamonds + 20% of debt</li>
            </ul>
            )}
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 shadow-xl hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">🛒 Bulk Shopping Runs</h3>
            <p className="text-gray-300 text-sm mb-3">Your personal shopping slave</p>
            <button
              onClick={() => toggleService('bulk-shopping')}
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors mb-3"
            >
              {expandedServices['bulk-shopping'] ? 'Hide Details' : 'Show Details'}
            </button>
            {expandedServices['bulk-shopping'] && (
              <ul className="text-gray-400 text-sm space-y-1 animate-in slide-in-from-top-2 duration-200">
              <li>• Multi-shop coordination</li>
              <li>• Price comparison included</li>
              <li>• Item cost + 10-25 diamonds</li>
            </ul>
            )}
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 shadow-xl hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">🚨 Emergency Supply Drops</h3>
            <p className="text-gray-300 text-sm mb-3">Rescue service for the helpless</p>
            <button
              onClick={() => toggleService('emergency-supply')}
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors mb-3"
            >
              {expandedServices['emergency-supply'] ? 'Hide Details' : 'Show Details'}
            </button>
            {expandedServices['emergency-supply'] && (
              <ul className="text-gray-400 text-sm space-y-1 animate-in slide-in-from-top-2 duration-200">
              <li>• Food delivery to prevent starvation</li>
              <li>• Tools when you're stuck mining</li>
              <li>• 20-75 diamonds + premium surcharge</li>
            </ul>
            )}
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 shadow-xl hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">🤝 Proxy Shopping</h3>
            <p className="text-gray-300 text-sm mb-3">Social anxiety delivery service</p>
            <button
              onClick={() => toggleService('proxy-shopping')}
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors mb-3"
            >
              {expandedServices['proxy-shopping'] ? 'Hide Details' : 'Show Details'}
            </button>
            {expandedServices['proxy-shopping'] && (
              <ul className="text-gray-400 text-sm space-y-1 animate-in slide-in-from-top-2 duration-200">
              <li>• Handle seller negotiations</li>
              <li>• Deal with difficult shop owners</li>
              <li>• Item cost + 5-12 diamonds</li>
            </ul>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>Because You Won't™ - Professional Minecraft delivery service</p>
          <p className="mt-1">Payment due on pickup • All dimensions covered • Professional service guaranteed</p>
        </div>
      </footer>
    </div>
  );
}

export default App;