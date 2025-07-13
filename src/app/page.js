'use client';

import { useState } from 'react';

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🛒 E-commerce Price Tracker
            </h1>
            <p className="text-lg text-gray-600">
              Track product prices and get notified when they drop
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Track New Product */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Track New Product</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* URL Input */}
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Supports Flipkart, Amazon, and other major e-commerce sites
                  </p>
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    We&apos;ll notify you when the price changes
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
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
                <div className={`mt-6 p-4 rounded-lg ${
                  message.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
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
            </div>

            {/* View Tracked Items */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">View Your Tracked Items</h2>
              <form onSubmit={handleViewTrackedItems} className="space-y-6">
                <div>
                  <label htmlFor="viewEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="viewEmail"
                    value={viewEmail}
                    onChange={(e) => setViewEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={viewLoading}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
                    viewLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
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
                <div className={`mt-6 p-4 rounded-lg ${
                  viewMessage.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : viewMessage.type === 'info'
                    ? 'bg-blue-50 border border-blue-200 text-blue-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Tracked Products</h3>
                  <div className="space-y-4">
                    {trackedItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="text-sm font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">
                                {getDomainFromUrl(item.url)}
                              </span>
                              <span className={`ml-2 text-xs px-2 py-1 rounded ${
                                item.alertSent 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {item.alertSent ? 'Alert Sent' : 'Monitoring'}
                              </span>
                            </div>
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm break-all"
                            >
                              {item.url}
                            </a>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-lg font-bold text-gray-900">
                                ₹{item.price}
                              </span>
                              <span className="text-xs text-gray-500">
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
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl mb-3">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Price Detection</h3>
              <p className="text-gray-600 text-sm">
                Automatically extracts prices from product pages using advanced web scraping
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl mb-3">📧</div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Notifications</h3>
              <p className="text-gray-600 text-sm">
                Get instant email alerts when prices drop on your tracked products
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl mb-3">🛡️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-gray-600 text-sm">
                Your data is secure and we never share your email with third parties
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


