import {
  Airplay,
  ChevronLeftIcon,
  ChevronRightIcon,
  Heater,
  Images,
  Shirt,
  ShoppingBasket,
  WashingMachine,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

function ShopByBrand() {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    const container = document.getElementById('brands-scroll-container');
    if (isLeftSwipe) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
    if (isRightSwipe) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  return (
    <section className="py-12 sm:py-16 bg-beige-200">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-brown-800 tracking-tight">Shop by Brand</h2>
        {/* Mobile: Horizontal scroll with navigation arrows */}
        <div className="block sm:hidden">
          <div className="relative group">
            <div 
              id="brands-scroll-container" 
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {brandsWithIcon.map((brandItem) => (
                <Card
                  key={brandItem.id}
                  onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                  className="cursor-pointer transition-all duration-300 flex-shrink-0 w-36 h-32 bg-white border-beige-300 shadow-md hover:shadow-xl hover:-translate-y-1 hover:bg-beige-50"
                >
                  <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                    <brandItem.icon className="w-12 h-12 mb-3 text-brown-700" />
                    <span className="font-semibold text-base text-center leading-tight text-brown-800">{brandItem.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Navigation Arrows for mobile */}
            {brandsWithIcon.length > 2 && (
              <>
                <button
                  onClick={() => {
                    const container = document.getElementById('brands-scroll-container');
                    container.scrollBy({ left: -200, behavior: 'smooth' });
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 z-10 flex items-center justify-center transition-all duration-300 hover:scale-125 opacity-0 group-hover:opacity-100 bg-amber-100/60 backdrop-blur-sm rounded-full hover:bg-amber-100/80"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-amber-800 hover:text-amber-900 transition-colors duration-200" />
                </button>
                <button
                  onClick={() => {
                    const container = document.getElementById('brands-scroll-container');
                    container.scrollBy({ left: 200, behavior: 'smooth' });
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 z-10 flex items-center justify-center transition-all duration-300 hover:scale-125 opacity-0 group-hover:opacity-100 bg-amber-100/60 backdrop-blur-sm rounded-full hover:bg-amber-100/80"
                >
                  <ChevronRightIcon className="w-5 h-5 text-amber-800 hover:text-amber-900 transition-colors duration-200" />
                </button>
              </>
            )}
          </div>
        </div>
        {/* Desktop: Grid layout */}
        <div className="hidden sm:grid grid-cols-3 lg:grid-cols-6 gap-6">
          {brandsWithIcon.map((brandItem) => (
            <Card
              key={brandItem.id}
              onClick={() => handleNavigateToListingPage(brandItem, "brand")}
              className="cursor-pointer transition-all duration-300 h-36 bg-white border-beige-300 shadow-md hover:shadow-xl hover:-translate-y-1 hover:bg-beige-50"
            >
              <CardContent className="flex flex-col items-center justify-center p-8 h-full">
                <brandItem.icon className="w-20 h-20 mb-4 text-brown-700" />
                <span className="font-semibold text-xl text-brown-800">{brandItem.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopByBrand;