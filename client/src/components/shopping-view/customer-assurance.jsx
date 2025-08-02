import { Shield, Truck, RotateCcw, Award, CheckCircle, Star, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CustomerAssurance() {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/shop/listing');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const assuranceItems = [
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy. Your satisfaction is our priority.",
      color: "text-brown-700",
      bgColor: "bg-brown-100",
      hoverBg: "hover:bg-brown-200"
    },
    {
      icon: Shield,
      title: "Safe Delivery",
      description: "Secure packaging and insured shipping for complete peace of mind.",
      color: "text-brown-700",
      bgColor: "bg-beige-100",
      hoverBg: "hover:bg-beige-200"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Carefully curated products that meet our high standards of elegance.",
      color: "text-brown-700",
      bgColor: "bg-brown-100",
      hoverBg: "hover:bg-brown-200"
    }
  ];

  return (
    <section className="py-8 lg:py-16 bg-gradient-to-r from-beige-700 via-beige-600 to-beige-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile Optimized */}
        <div className="text-center mb-6 lg:mb-12">
          <h2 className="text-xl lg:text-3xl xl:text-4xl font-extrabold text-beige-100 mb-2 lg:mb-4 tracking-tight">
            Why Choose Vinora?
          </h2>
          <p className="text-beige-200/90 text-xs lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide px-2">
            We're committed to providing you with an exceptional shopping experience, from selection to delivery.
          </p>
        </div>

        {/* Assurance Cards - Mobile: Horizontal Scroll, Desktop: Grid */}
        <div className="block md:hidden">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
            {assuranceItems.map((item, index) => (
              <div 
                key={index}
                className={`relative bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-beige-300/50 group ${item.hoverBg} flex-shrink-0 w-52`}
              >
                {/* Icon Container */}
                <div className={`w-8 h-8 ${item.bgColor} rounded-full flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-sm font-bold text-brown-800 mb-1 tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-brown-700/85 text-xs leading-relaxed font-medium tracking-wide">
                    {item.description}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-1 right-1 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <CheckCircle className="h-3 w-3 text-brown-600" />
                </div>
              </div>
            ))}
          </div>
          {/* Scroll indicator for mobile */}
          <div className="text-center mt-2">
            <p className="text-xs text-beige-200/80 font-medium">← Swipe to see more →</p>
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {assuranceItems.map((item, index) => (
            <div 
              key={index}
              className={`relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-beige-300/50 group ${item.hoverBg}`}
            >
              {/* Icon Container */}
              <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-brown-800 mb-2 tracking-tight leading-tight">
                  {item.title}
                </h3>
                <p className="text-brown-700/85 text-sm leading-relaxed font-medium tracking-wide">
                  {item.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <CheckCircle className="h-5 w-5 text-brown-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="mt-6 lg:mt-12 text-center">
          <button
            onClick={handleShopNowClick}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-2 px-6 lg:py-4 lg:px-10 rounded-lg lg:rounded-xl text-sm lg:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            <ShoppingBag className="h-4 w-4 lg:h-6 lg:w-6" />
            Shop All Products
          </button>
        </div>
      </div>
    </section>
  );
}

export default CustomerAssurance;
