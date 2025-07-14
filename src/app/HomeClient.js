'use client';

import { useState } from 'react';
import { BackgroundGradientAnimation } from '../components/ui/background-gradient-animation';

export default function HomeClient() {
  const [formData, setFormData] = useState({ url: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // New state for viewing tracked items
  const [viewEmail, setViewEmail] = useState('');
  const [trackedItems, setTrackedItems] = useState([]);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewMessage, setViewMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formDataObj = new FormData();
      formDataObj.append('url', formData.url);
      formDataObj.append('email', formData.email);

      const response = await fetch('/api/track', {
        method: 'POST',
        body: formDataObj,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: result.message });
        setFormData({ url: '', email: '' });
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleViewTrackedItems = async (e) => {
    e.preventDefault();
    if (!viewEmail.trim()) {
      setViewMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    setViewLoading(true);
    setViewMessage({ type: '', text: '' });
    setTrackedItems([]);

    try {
      const response = await fetch(`/api/track?email=${encodeURIComponent(viewEmail)}`);
      const result = await response.json();

      if (response.ok) {
        setTrackedItems(result.tracks || []);
        if (result.tracks.length === 0) {
          setViewMessage({ type: 'info', text: 'No tracked items found for this email address.' });
        } else {
          setViewMessage({ type: 'success', text: `Found ${result.tracks.length} tracked item(s)` });
        }
      } else {
        setViewMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setViewMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setViewLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDomainFromUrl = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return 'Unknown';
    }
  };

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(108, 0, 162)"
      gradientBackgroundEnd="rgb(0, 17, 82)"
      firstColor="18, 113, 255"
      secondColor="221, 74, 255"
      thirdColor="100, 220, 255"
      fourthColor="200, 50, 50"
      fifthColor="180, 180, 50"
      pointerColor="140, 100, 255"
      size="80%"
      blendingValue="hard-light"
      interactive={true}
      containerClassName="relative"
    >
      <main className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                🛒 E-commerce Price Tracker
              </h1>
              <p className="text-lg text-white/90 drop-shadow-md">
                Track product prices and get notified when they drop
              </p>
            </header>

            <section className="grid lg:grid-cols-2 gap-8" aria-label="Track and View Products">
              {/* Track New Product */}
              <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20" aria-label="Track New Product">
                <h2 className="text-2xl font-bold text-white mb-6">Track New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* URL Input */}
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-white/90 mb-2">
                      Product URL
                    </label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      placeholder="https://www.flipkart.com/product-url"
                      required
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors bg-white/10 text-white placeholder-white/50 backdrop-blur-sm"
                    />
                    <p className="mt-1 text-sm text-white/70">
                      Supports Flipkart, Amazon, and other major e-commerce sites
                    </p>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors bg-white/10 text-white placeholder-white/50 backdrop-blur-sm"
                    />
                    <p className="mt-1 text-sm text-white/70">
                      We&apos;ll notify you when the price changes
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
                      loading
                        ? 'bg-gray-400/50 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Start Tracking Price'
                    )}
                  </button>
                </form>

                {/* Message Display */}
                {message.text && (
                  <div className={`mt-6 p-4 rounded-lg backdrop-blur-sm ${
                    message.type === 'success' 
                      ? 'bg-green-500/20 border border-green-400/30 text-green-100' 
                      : 'bg-red-500/20 border border-red-400/30 text-red-100'
                  }`}>
                    <div className="flex items-center">
                      {message.type === 'success' ? (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                      {message.text}
                    </div>
                  </div>
                )}
              </section>

              {/* View Tracked Items */}
              <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20" aria-label="View Tracked Items">
                <h2 className="text-2xl font-bold text-white mb-6">View Your Tracked Items</h2>
                <form onSubmit={handleViewTrackedItems} className="space-y-6">
                  <div>
                    <label htmlFor="viewEmail" className="block text-sm font-medium text-white/90 mb-2">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      id="viewEmail"
                      value={viewEmail}
                      onChange={(e) => setViewEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors bg-white/10 text-white placeholder-white/50 backdrop-blur-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={viewLoading}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
                      viewLoading
                        ? 'bg-gray-400/50 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 active:bg-green-800 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {viewLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      'View Tracked Items'
                    )}
                  </button>
                </form>

                {/* View Message Display */}
                {viewMessage.text && (
                  <div className={`mt-6 p-4 rounded-lg backdrop-blur-sm ${
                    viewMessage.type === 'success' 
                      ? 'bg-green-500/20 border border-green-400/30 text-green-100'
                      : viewMessage.type === 'info'
                      ? 'bg-blue-500/20 border border-blue-400/30 text-blue-100'
                      : 'bg-red-500/20 border border-red-400/30 text-red-100'
                  }`}>
                    <div className="flex items-center">
                      {viewMessage.type === 'success' ? (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : viewMessage.type === 'info' ? (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                      {viewMessage.text}
                    </div>
                  </div>
                )}

                {/* Tracked Items List */}
                {trackedItems.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Your Tracked Products</h3>
                    <div className="space-y-4">
                      {trackedItems.map((item) => (
                        <div key={item.id} className="border border-white/20 rounded-lg p-4 bg-white/5 backdrop-blur-sm">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <span className="text-sm font-medium text-white/70 bg-white/10 px-2 py-1 rounded">
                                  {getDomainFromUrl(item.url)}
                                </span>
                                <span className={`ml-2 text-xs px-2 py-1 rounded ${
                                  item.alertSent 
                                    ? 'bg-green-500/20 text-green-200' 
                                    : 'bg-yellow-500/20 text-yellow-200'
                                }`}>
                                  {item.alertSent ? 'Alert Sent' : 'Monitoring'}
                                </span>
                              </div>
                              <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-300 hover:text-blue-200 text-sm break-all"
                              >
                                {item.url}
                              </a>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-lg font-bold text-white">
                                  ₹{item.price}
                                </span>
                                <span className="text-xs text-white/60">
                                  Last checked: {formatDate(item.lastChecked)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </section>

            {/* Features Section */}
            <section className="mt-12 grid md:grid-cols-3 gap-6" aria-label="Features">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-md border border-white/20">
                <div className="text-2xl mb-3">🔍</div>
                <h3 className="font-semibold text-white mb-2">Smart Price Detection</h3>
                <p className="text-white/80 text-sm">
                  Automatically extracts prices from product pages using advanced web scraping
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-md border border-white/20">
                <div className="text-2xl mb-3">📧</div>
                <h3 className="font-semibold text-white mb-2">Email Notifications</h3>
                <p className="text-white/80 text-sm">
                  Get instant email alerts when prices drop on your tracked products
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-md border border-white/20">
                <div className="text-2xl mb-3">🛡️</div>
                <h3 className="font-semibold text-white mb-2">Privacy First</h3>
                <p className="text-white/80 text-sm">
                  Your data is secure and we never share your email with third parties
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </BackgroundGradientAnimation>
  );
} 