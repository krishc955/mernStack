import {
  Airplay,
  Heater,
  Images,
  Shirt,
  ShoppingBasket,
  WashingMachine,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  return (
    <section className="py-12 sm:py-16" style={{ backgroundColor: '#f5f2ea' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-amber-900 tracking-tight">Shop by Brand</h2>
        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="block sm:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer transition-all duration-300 flex-shrink-0 w-36 h-32 border-amber-200 shadow-md hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: '#fefbf6' }}
              >
                <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                  <brandItem.icon className="w-12 h-12 mb-3 text-amber-700" />
                  <span className="font-semibold text-base text-center leading-tight text-amber-900">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Desktop: Grid layout */}
        <div className="hidden sm:grid grid-cols-3 lg:grid-cols-6 gap-6">
          {brandsWithIcon.map((brandItem) => (
            <Card
              key={brandItem.id}
              onClick={() => handleNavigateToListingPage(brandItem, "brand")}
              className="cursor-pointer transition-all duration-300 h-36 border-amber-200 shadow-md hover:shadow-xl hover:-translate-y-1"
              style={{ backgroundColor: '#fefbf6' }}
            >
              <CardContent className="flex flex-col items-center justify-center p-8 h-full">
                <brandItem.icon className="w-20 h-20 mb-4 text-amber-700" />
                <span className="font-semibold text-xl text-amber-900">{brandItem.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopByBrand;