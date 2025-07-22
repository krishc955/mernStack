function ShippingInfo() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf8f2' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-amber-900 mb-4 tracking-tight">
            Shipping Information
          </h1>
          <p className="text-lg text-amber-700/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about delivery options, timelines, and tracking.
          </p>
        </div>

        {/* Delivery Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100/50">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-900 tracking-tight">Standard Delivery</h3>
            </div>
            <ul className="space-y-3 text-amber-700/85 font-medium">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Delivery time: 3-7 business days
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                FREE shipping on orders above ₹999
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                ₹99 shipping fee for orders below ₹999
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Available across all serviceable PIN codes
              </li>
            </ul>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100/50">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-900 tracking-tight">Express Delivery</h3>
            </div>
            <ul className="space-y-3 text-amber-700/85 font-medium">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Delivery time: 1-2 business days
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                ₹199 express delivery charges
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Available in major cities only
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Perfect for urgent orders
              </li>
            </ul>
          </div>
        </div>

        {/* Shipping Process */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100/50 mb-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-8 text-center tracking-tight">
            Our Shipping Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-bold text-amber-900 mb-2">Order Placed</h4>
              <p className="text-amber-700/80 text-sm font-medium">You place your order and make payment</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-bold text-amber-900 mb-2">Order Processed</h4>
              <p className="text-amber-700/80 text-sm font-medium">We verify and prepare your order</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-bold text-amber-900 mb-2">Order Shipped</h4>
              <p className="text-amber-700/80 text-sm font-medium">Your order is dispatched with tracking</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h4 className="font-bold text-amber-900 mb-2">Order Delivered</h4>
              <p className="text-amber-700/80 text-sm font-medium">Package arrives at your doorstep</p>
            </div>
          </div>
        </div>

        {/* Tracking & Coverage */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Order Tracking */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100/50">
            <h3 className="text-xl font-bold text-amber-900 mb-4 tracking-tight">Order Tracking</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-amber-500 w-3 h-3 rounded-full mr-3 mt-2"></div>
                <div>
                  <h4 className="font-bold text-amber-900">Real-time Updates</h4>
                  <p className="text-amber-700/80 text-sm font-medium">Get SMS and email notifications at every step</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-500 w-3 h-3 rounded-full mr-3 mt-2"></div>
                <div>
                  <h4 className="font-bold text-amber-900">Tracking Number</h4>
                  <p className="text-amber-700/80 text-sm font-medium">Unique tracking ID shared via email & SMS</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-500 w-3 h-3 rounded-full mr-3 mt-2"></div>
                <div>
                  <h4 className="font-bold text-amber-900">Live Location</h4>
                  <p className="text-amber-700/80 text-sm font-medium">Track your package in real-time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Coverage */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100/50">
            <h3 className="text-xl font-bold text-amber-900 mb-4 tracking-tight">Delivery Coverage</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-500 w-3 h-3 rounded-full mr-3 mt-2"></div>
                <div>
                  <h4 className="font-bold text-amber-900">Pan-India Delivery</h4>
                  <p className="text-amber-700/80 text-sm font-medium">We deliver to 25,000+ PIN codes across India</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-500 w-3 h-3 rounded-full mr-3 mt-2"></div>
                <div>
                  <h4 className="font-bold text-amber-900">Rural Areas</h4>
                  <p className="text-amber-700/80 text-sm font-medium">Extended delivery to remote locations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-500 w-3 h-3 rounded-full mr-3 mt-2"></div>
                <div>
                  <h4 className="font-bold text-amber-900">Safe Packaging</h4>
                  <p className="text-amber-700/80 text-sm font-medium">Secure packaging to prevent damage</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50">
          <h3 className="text-xl font-bold text-amber-900 mb-6 text-center tracking-tight">Important Shipping Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-amber-900 mb-3">⏰ Processing Time</h4>
              <ul className="space-y-2 text-amber-700/85 font-medium">
                <li>• Orders placed before 2 PM are processed same day</li>
                <li>• Weekend orders processed on next business day</li>
                <li>• Custom/personalized items take 2-3 additional days</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-amber-900 mb-3">📦 Packaging</h4>
              <ul className="space-y-2 text-amber-700/85 font-medium">
                <li>• Eco-friendly packaging materials used</li>
                <li>• Fragile items packed with extra protection</li>
                <li>• Tamper-proof seals on all packages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingInfo;
