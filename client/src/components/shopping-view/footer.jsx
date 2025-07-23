import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook, MessageCircle } from "lucide-react";
import { useState } from "react";
import VinoraLogo from "../../assets/img.png";

function ShoppingFooter() {
  const [message, setMessage] = useState("");

  const handleWhatsAppSend = () => {
    if (message.trim()) {
      // WhatsApp Business number (replace with your actual WhatsApp number)
      const phoneNumber = "918219284066"; // Replace with your WhatsApp number
      const encodedMessage = encodeURIComponent(`Hello Vinora! ${message}`);
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
    <footer className="relative bg-gradient-to-br from-beige-100 via-beige-50 to-beige-200 border-t border-beige-300 no-horizontal-scroll container-safe">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-brown-200/30 to-beige-300/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 right-4 w-32 h-32 bg-gradient-to-br from-beige-300/20 to-brown-200/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 no-horizontal-scroll container-safe">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Quick Links - Left side on desktop */}
          <div className="order-2 md:order-1 space-y-4">
            <h4 className="font-bold text-brown-800 text-xl tracking-tight font-serif">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-brown-700 hover:text-brown-800 text-base font-medium transition-all duration-200 hover:underline hover:underline-offset-2 tracking-wide hover:translate-x-1 inline-block font-serif">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-brown-700 hover:text-brown-800 text-base font-medium transition-all duration-200 hover:underline hover:underline-offset-2 tracking-wide hover:translate-x-1 inline-block font-serif">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-brown-700 hover:text-brown-800 text-base font-medium transition-all duration-200 hover:underline hover:underline-offset-2 tracking-wide hover:translate-x-1 inline-block font-serif">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-brown-700 hover:text-brown-800 text-base font-medium transition-all duration-200 hover:underline hover:underline-offset-2 tracking-wide hover:translate-x-1 inline-block font-serif">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="text-brown-700 hover:text-brown-800 text-base font-medium transition-all duration-200 hover:underline hover:underline-offset-2 tracking-wide hover:translate-x-1 inline-block font-serif">
                  Returns
                </a>
              </li>
              <li>
                <a href="/size-guide" className="text-brown-700 hover:text-brown-800 text-base font-medium transition-all duration-200 hover:underline hover:underline-offset-2 tracking-wide hover:translate-x-1 inline-block font-serif">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Company Info - Right side on desktop, very big logo */}
          <div className="order-1 md:order-2 flex flex-col items-center md:items-end space-y-4">
            <div className="flex items-center">
              <img 
                src={VinoraLogo} 
                alt="Vinora" 
                className="h-32 md:h-52 w-auto max-w-none transition-transform duration-200 hover:scale-105"
              />
            </div>
            <div className="flex justify-center space-x-4">
              <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-beige-100 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md border border-beige-300">
                <Facebook className="h-5 w-5 text-brown-700 group-hover:text-brown-800 transition-colors duration-200" />
              </div>
              <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-beige-100 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md border border-beige-300">
                <Instagram className="h-5 w-5 text-brown-700 group-hover:text-brown-800 transition-colors duration-200" />
              </div>
              <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-beige-100 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md border border-beige-300">
                <Twitter className="h-5 w-5 text-brown-700 group-hover:text-brown-800 transition-colors duration-200" />
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Contact */}
        <div className="mt-10 pt-6 border-t border-beige-300">
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-brown-800 to-brown-900 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-center mb-3">
                <MessageCircle className="h-5 w-5 text-beige-200 mr-2" />
                <h4 className="font-semibold text-beige-100 text-lg">Stay Updated</h4>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message us..."
                  className="flex-1 px-3 py-2 bg-brown-700/50 border border-brown-600 rounded-lg text-sm placeholder-beige-300 text-beige-100 focus:outline-none focus:ring-2 focus:ring-beige-400 focus:border-transparent transition-all duration-300"
                />
                <button 
                  onClick={handleWhatsAppSend}
                  className="px-3 py-2 bg-beige-200 text-brown-800 text-sm font-semibold rounded-lg hover:bg-beige-100 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-beige-300">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2 text-brown-700 text-sm font-medium tracking-wide">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-error-500 fill-current animate-pulse" />
              <span>in India</span>
            </div>
            
            <p className="text-brown-700 text-sm text-center md:text-right font-medium tracking-wide">
              © 2024 Vinora. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;
