import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook, MessageCircle } from "lucide-react";
import { useState } from "react";

function ShoppingFooter() {
  const [message, setMessage] = useState("");

  const handleWhatsAppSend = () => {
    if (message.trim()) {
      // WhatsApp Business number (replace with your actual WhatsApp number)
      const phoneNumber = "918219284066"; // Replace with your WhatsApp number
      const encodedMessage = encodeURIComponent(`Hello StyleHub! ${message}`);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      setMessage(""); // Clear the input after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleWhatsAppSend();
    }
  };
  return (
    <footer className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-t border-amber-200/50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 right-4 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-amber-800 via-amber-700 to-orange-800 bg-clip-text text-transparent tracking-tight">
              StyleHub
            </h3>
            <p className="text-amber-700/85 text-sm leading-relaxed font-medium tracking-wide">
              Your premium destination for fashion and lifestyle. Discover curated collections 
              that blend style, quality, and affordability.
            </p>
            <div className="flex space-x-3">
              <div className="p-2 bg-white/60 backdrop-blur-sm rounded-full hover:bg-amber-100/80 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md">
                <Facebook className="h-4 w-4 text-amber-700 group-hover:text-amber-800 transition-colors duration-200" />
              </div>
              <div className="p-2 bg-white/60 backdrop-blur-sm rounded-full hover:bg-amber-100/80 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md">
                <Instagram className="h-4 w-4 text-amber-700 group-hover:text-amber-800 transition-colors duration-200" />
              </div>
              <div className="p-2 bg-white/60 backdrop-blur-sm rounded-full hover:bg-amber-100/80 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md">
                <Twitter className="h-4 w-4 text-amber-700 group-hover:text-amber-800 transition-colors duration-200" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-amber-800 text-lg tracking-tight">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-amber-700/85 hover:text-amber-800 text-sm font-medium transition-all duration-200 hover:underline hover:underline-offset-2 tracking-wide hover:translate-x-1 inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-amber-700/85 hover:text-amber-800 text-sm font-medium transition-all duration-200 hover:underline hover:underline-offset-2 tracking-wide hover:translate-x-1 inline-block">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-amber-700/85 hover:text-amber-800 text-sm font-medium transition-all duration-200 hover:underline hover:underline-offset-2 tracking-wide hover:translate-x-1 inline-block">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-amber-700/85 hover:text-amber-800 text-sm font-medium transition-all duration-200 hover:underline hover:underline-offset-2 tracking-wide hover:translate-x-1 inline-block">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="text-amber-700/85 hover:text-amber-800 text-sm font-medium transition-all duration-200 hover:underline hover:underline-offset-2 tracking-wide hover:translate-x-1 inline-block">
                  Returns
                </a>
              </li>
              <li>
                <a href="/size-guide" className="text-amber-700/85 hover:text-amber-800 text-sm font-medium transition-all duration-200 hover:underline hover:underline-offset-2 tracking-wide hover:translate-x-1 inline-block">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-amber-800 text-lg tracking-tight">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-4 w-4 text-amber-700 mt-1 flex-shrink-0 group-hover:text-amber-800 transition-colors duration-200" />
                <p className="text-amber-700/85 text-sm leading-relaxed font-medium tracking-wide">
                  123 Fashion Street, Mumbai, Maharashtra 400001, India
                </p>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="h-4 w-4 text-amber-700 flex-shrink-0 group-hover:text-amber-800 transition-colors duration-200" />
                <a href="tel:+919876543210" className="text-amber-700/85 hover:text-amber-800 text-sm font-medium transition-all duration-200 tracking-wide hover:underline hover:underline-offset-2">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="h-4 w-4 text-amber-700 flex-shrink-0 group-hover:text-amber-800 transition-colors duration-200" />
                <a href="mailto:info@stylehub.com" className="text-amber-700/85 hover:text-amber-800 text-sm font-medium transition-all duration-200 tracking-wide hover:underline hover:underline-offset-2">
                  info@stylehub.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Contact */}
        <div className="mt-10 pt-6 border-t border-amber-200/50">
          <div className="max-w-lg mx-auto text-center">
            <div className="flex items-center justify-center mb-2">
              <MessageCircle className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="font-bold text-amber-800 text-xl tracking-tight">Stay Updated</h4>
            </div>
            <p className="text-amber-700/85 text-sm mb-4 font-medium tracking-wide leading-relaxed">
              Send us a WhatsApp message to get special offers, updates, and personalized assistance!
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-2 bg-white/70 backdrop-blur-sm border border-amber-200/70 rounded-lg text-sm placeholder-amber-600/70 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 font-medium tracking-wide shadow-sm hover:shadow-md"
              />
              <button 
                onClick={handleWhatsAppSend}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 tracking-wide flex items-center gap-1"
              >
                <MessageCircle className="h-4 w-4" />
                Send WhatsApp
              </button>
            </div>
            <p className="text-amber-600/70 text-xs mt-2 font-medium">
              Click to open WhatsApp and send your message directly to us
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-amber-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2 text-amber-700/85 text-sm font-medium tracking-wide">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
              <span>in India</span>
            </div>
            
            <p className="text-amber-700/85 text-sm text-center md:text-right font-medium tracking-wide">
              © 2024 StyleHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;
