import React from 'react';
import { CloudLightning, ShirtIcon, Images } from "lucide-react";

function AboutUs() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf8f2' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-amber-900 mb-4 tracking-tight">
            About Vinora
          </h1>
          <p className="text-lg text-amber-700/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Your trusted partner in fashion and lifestyle since our founding.
          </p>
        </div>

        {/* Welcome to Vinora Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-lg border border-amber-100/50 mb-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-amber-900">
              Welcome to Vinora - Your Premium Shopping Destination
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-amber-700/85 leading-relaxed">
              <p>
                <strong>Vinora</strong> is India's premier online ecommerce store, offering an exclusive collection of high-quality products across multiple categories. When you shop at <strong>Vinora</strong>, you're not just buying products – you're investing in quality, style, and exceptional customer service.
              </p>
              <p>
                Our <strong>Vinora</strong> team carefully curates each product to ensure you receive only the finest items. From fashion to electronics, home decor to accessories, <strong>Vinora</strong> brings you the best brands and products at competitive prices with fast, secure delivery across India.
              </p>
            </div>
          </div>

          {/* Why Choose Vinora Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6 bg-amber-50/50 rounded-lg border border-amber-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <CloudLightning className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-amber-900">Fast Delivery</h3>
              <p className="text-amber-700/85 font-medium">
                Experience <strong>Vinora's</strong> lightning-fast delivery service. Order today and receive your premium products at your doorstep within 2-3 business days.
              </p>
            </div>
            
            <div className="text-center p-6 bg-amber-50/50 rounded-lg border border-amber-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <ShirtIcon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-amber-900">Premium Quality</h3>
              <p className="text-amber-700/85 font-medium">
                Every product at <strong>Vinora</strong> undergoes strict quality checks. We partner with trusted brands to bring you authentic, high-quality merchandise.
              </p>
            </div>
            
            <div className="text-center p-6 bg-amber-50/50 rounded-lg border border-amber-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <Images className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-amber-900">Secure Shopping</h3>
              <p className="text-amber-700/85 font-medium">
                Shop with confidence at <strong>Vinora</strong>. Our secure payment gateway and data protection ensure your personal information is always safe.
              </p>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8 text-amber-900">Shop by Category at Vinora</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {["Men's Fashion", "Women's Clothing", "Kids Wear", "Electronics", "Home & Decor", "Accessories"].map((category, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
                  <p className="font-medium text-amber-900">{category}</p>
                  <p className="text-sm text-amber-700/80 mt-1">Shop at Vinora</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-lg border border-amber-100/50">
          <div className="space-y-8">
            {/* Our Story */}
            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4 tracking-tight">Our Story</h2>
              <p className="text-amber-700/85 leading-relaxed font-medium mb-4">
                Vinora was born from a simple belief: everyone deserves access to premium fashion and lifestyle products 
                that blend style, quality, and affordability. Founded with a vision to revolutionize the online shopping 
                experience in India, we've grown from a small startup to a trusted name in e-commerce.
              </p>
              <p className="text-amber-700/85 leading-relaxed font-medium">
                Our journey began with the understanding that modern consumers want more than just products – they want 
                an experience that reflects their values, aspirations, and lifestyle choices.
              </p>
            </section>

            {/* Our Mission */}
            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4 tracking-tight">Our Mission</h2>
              <p className="text-amber-700/85 leading-relaxed font-medium">
                To provide our customers with carefully curated collections of premium fashion and lifestyle products, 
                ensuring exceptional quality, competitive prices, and an unparalleled shopping experience that exceeds 
                expectations at every touchpoint.
              </p>
            </section>

            {/* Our Values */}
            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4 tracking-tight">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-amber-50/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-amber-900 mb-3">Quality First</h3>
                  <p className="text-amber-700/85 text-sm font-medium">
                    Every product in our collection is carefully vetted for quality, durability, and style.
                  </p>
                </div>
                <div className="bg-amber-50/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-amber-900 mb-3">Customer Satisfaction</h3>
                  <p className="text-amber-700/85 text-sm font-medium">
                    Your happiness is our success. We go above and beyond to ensure every customer is delighted.
                  </p>
                </div>
                <div className="bg-amber-50/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-amber-900 mb-3">Innovation</h3>
                  <p className="text-amber-700/85 text-sm font-medium">
                    We continuously evolve our platform and services to provide the best shopping experience.
                  </p>
                </div>
                <div className="bg-amber-50/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-amber-900 mb-3">Integrity</h3>
                  <p className="text-amber-700/85 text-sm font-medium">
                    Honest pricing, transparent policies, and ethical business practices guide everything we do.
                  </p>
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4 tracking-tight">Why Choose Vinora?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-amber-700/85 font-medium">
                    <strong>Curated Collections:</strong> Hand-picked products from trusted brands and emerging designers.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-amber-700/85 font-medium">
                    <strong>Competitive Pricing:</strong> Best prices guaranteed with regular sales and exclusive offers.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-amber-700/85 font-medium">
                    <strong>Fast & Secure Delivery:</strong> Quick shipping across India with secure packaging and tracking.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-amber-700/85 font-medium">
                    <strong>Hassle-Free Returns:</strong> 30-day return policy with easy refunds and exchanges.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
