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
    <section className="py-12 lg:py-16 bg-beige-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile Optimized */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-brown-800 mb-3 lg:mb-4 tracking-tight">
            Why Choose Vinora?
          </h2>
          <p className="text-brown-700/80 text-sm lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide px-2">
            We're committed to providing you with an exceptional shopping experience, from selection to delivery.
          </p>
        </div>

        {/* Assurance Cards Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
          {assuranceItems.map((item, index) => (
            <div 
              key={index}
              className={`relative bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 lg:hover:-translate-y-2 border border-beige-300/50 group ${item.hoverBg}`}
            >
              {/* Icon Container - Smaller on Mobile */}
              <div className={`w-10 h-10 lg:w-16 lg:h-16 ${item.bgColor} rounded-full flex items-center justify-center mb-3 lg:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`h-5 w-5 lg:h-8 lg:w-8 ${item.color}`} />
              </div>
              
              {/* Content - Optimized Typography */}
              <div className="text-center">
                <h3 className="text-sm lg:text-xl font-bold text-brown-800 mb-2 lg:mb-3 tracking-tight leading-tight">
                  {item.title}
                </h3>
                <p className="text-brown-700/85 text-xs lg:text-sm leading-relaxed font-medium tracking-wide hidden sm:block">
                  {item.description}
                </p>
                {/* Simplified mobile description */}
                <p className="text-brown-700/85 text-xs leading-relaxed font-medium tracking-wide sm:hidden">
                  {item.title === "Easy Returns" && "30-day return policy"}
                  {item.title === "Safe Delivery" && "Secure & insured shipping"}
                  {item.title === "Premium Quality" && "Curated elegant products"}
                </p>
              </div>

              {/* Decorative Element - Hidden on small screens */}
              <div className="absolute top-2 right-2 lg:top-4 lg:right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300 hidden sm:block">
                <CheckCircle className="h-4 w-4 lg:h-6 lg:w-6 text-brown-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="mt-8 lg:mt-12 text-center">
          <button
            onClick={handleShopNowClick}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 px-8 lg:py-4 lg:px-10 rounded-xl text-base lg:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            <ShoppingBag className="h-5 w-5 lg:h-6 lg:w-6" />
            Shop All Products
          </button>
        </div>
      </div>
    </section>
  );
}

export default CustomerAssurance;
