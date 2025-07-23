import React from 'react';

function Returns() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf8f2' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-amber-900 mb-4 tracking-tight">
            Returns & Refunds
          </h1>
          <p className="text-lg text-amber-700/80 font-medium max-w-2xl mx-auto leading-relaxed">
            We want you to be completely satisfied with your purchase. If you're not happy with your order, 
            we're here to help with easy returns and quick refunds.
          </p>
        </div>

        {/* Return Policy Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-amber-100/50">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-amber-900 mb-2">30-Day Returns</h3>
            <p className="text-amber-700/80 text-sm font-medium">Easy returns within 30 days of delivery</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-amber-100/50">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-bold text-amber-900 mb-2">Free Pickup</h3>
            <p className="text-amber-700/80 text-sm font-medium">Complimentary pickup from your doorstep</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-amber-100/50">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="font-bold text-amber-900 mb-2">Quick Refund</h3>
            <p className="text-amber-700/80 text-sm font-medium">Refund processed within 5-7 business days</p>
          </div>
        </div>

        {/* Contact for Returns */}
        <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200/50 text-center">
          <h3 className="text-xl font-bold text-amber-900 mb-4 tracking-tight">Need Help with Returns?</h3>
          <p className="text-amber-700/85 mb-6 font-medium">Our customer service team is here to assist you with your return.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-8 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Contact Support
            </a>
            <a
              href="mailto:returns@vinora.com"
              className="bg-white/80 text-amber-800 font-bold py-3 px-8 rounded-xl border-2 border-amber-200 hover:bg-amber-50 transition-all duration-300 hover:scale-105"
            >
              Email Returns Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Returns;
