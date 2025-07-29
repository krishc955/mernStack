import { Button } from "@/components/ui/button";
import SEOHead from "@/components/common/seo-head";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Images,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [imageColors, setImageColors] = useState({});
  
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to extract dominant color from image edges
  // Optimized color extraction with memoization
  const extractImageEdgeColor = useCallback(async (imageUrl, index) => {
    try {
      // Return cached color if available
      if (imageColors[index]) return imageColors[index];
      
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      return new Promise((resolve) => {
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 50; // Reduce canvas size for performance
            canvas.height = 50;
            
            ctx.drawImage(img, 0, 0, 50, 50);
            const imageData = ctx.getImageData(0, 0, 50, 50).data;
            
            let r = 0, g = 0, b = 0, count = 0;
            
            // Sample fewer pixels for better performance
            for (let i = 0; i < imageData.length; i += 16) { // Skip more pixels
              r += imageData[i];
              g += imageData[i + 1];
              b += imageData[i + 2];
              count++;
            }
            
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);
            
            const gradient = `linear-gradient(135deg, rgba(${r},${g},${b},0.1) 0%, rgba(${r},${g},${b},0.05) 100%)`;
            resolve(gradient);
          } catch (error) {
            resolve('linear-gradient(135deg, #c0ae8c 0%, #a68b5b 50%, #8b7355 100%)');
          }
        };
        
        img.onerror = () => {
          resolve('linear-gradient(135deg, #c0ae8c 0%, #a68b5b 50%, #8b7355 100%)');
        };
        
        img.src = imageUrl;
      });
    } catch (error) {
      return 'linear-gradient(135deg, #c0ae8c 0%, #a68b5b 50%, #8b7355 100%)';
    }
  }, [imageColors]);  // Optimized color extraction with debouncing
  useEffect(() => {
    if (featureImageList && featureImageList.length > 0) {
      const extractColors = async () => {
        for (let i = 0; i < Math.min(featureImageList.length, 3); i++) { // Limit to first 3 images
          const slide = featureImageList[i];
          if (slide?.image && !imageColors[i]) {
            const color = await extractImageEdgeColor(slide.image, i);
            setImageColors(prev => ({
              ...prev,
              [i]: color
            }));
          }
        }
      };
      
      // Debounce the color extraction
      const timeoutId = setTimeout(extractColors, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [featureImageList, extractImageEdgeColor]);

  // Memoize background getter - Pure beige background
  const getCurrentBackground = useCallback((index) => {
    // Always return beige gradient to match navbar
    return 'linear-gradient(135deg, #c0ae8c 0%, #a68b5b 50%, #8b7355 100%)';
  }, []);

  // Touch handlers for mobile swipe
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

    if (isLeftSwipe) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }
    if (isRightSwipe) {
      setCurrentSlide(
        (prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length
      );
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

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    if (!user?.id) {
      toast({
        title: "Please login to add items to cart",
        action: (
          <Button
            onClick={() => navigate("/auth/login")}
            variant="outline"
            size="sm"
          >
            Login
          </Button>
        ),
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  // Optimize product fetching - only fetch featured products initially
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
        limit: 8, // Limit initial load
      })
    );
  }, [dispatch]);

  // Optimize feature images fetching
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // Memoize filtered product lists for better performance
  const featuredProducts = useMemo(() => {
    return productList?.slice(0, 8) || [];
  }, [productList]);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#faf8f2' }}>
      <SEOHead 
        title="Vinora - Premium Online Shopping Store in India | Best Deals & Quality Products"
        description="Shop at Vinora, India's trusted online ecommerce store. Discover premium fashion, electronics, home decor & accessories with fast delivery, secure payments & quality guarantee."
        keywords="Vinora, online shopping India, ecommerce store, premium products, fashion, electronics, home decor, fast delivery, secure shopping, quality products"
        canonicalUrl="https://vinora.royalappleshimla.com"
        ogImage="https://vinora.royalappleshimla.com/vinora-social-share.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Vinora",
          "alternateName": "Vinora Online Store",
          "url": "https://vinora.royalappleshimla.com",
          "description": "India's premium online shopping destination for fashion, electronics, and lifestyle products",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://vinora.royalappleshimla.com/shop/search?query={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Vinora",
            "url": "https://vinora.royalappleshimla.com",
            "logo": "https://vinora.royalappleshimla.com/vinora-logo.png"
          }
        }}
      />
      
      {/* Mobile-Responsive Hero Slider with Touch Support - Larger Size */}
      <div 
        className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] xl:h-[700px] overflow-hidden select-none group bg-gradient-to-r from-beige-700 via-beige-600 to-beige-700"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <div
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full transition-opacity duration-1000 flex items-center justify-center`}
                style={{
                  background: getCurrentBackground(index)
                }}
              >
                <img
                  src={slide?.image}
                  alt={`Slide ${index + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  loading="lazy"
                  style={{
                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.3))',
                    maxWidth: '98%',
                    maxHeight: '98%',
                    minWidth: '70%',
                    minHeight: '70%'
                  }}
                />
              </div>
            ))
          : (
            /* Fallback when no images */
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <Images className="w-8 h-8" />
                </div>
                <p className="text-lg font-medium">Welcome to Our Store</p>
                <p className="text-sm">Discover amazing products</p>
              </div>
            </div>
          )}
        
        {/* Navigation Arrows - Brown with translucent background */}
        {featureImageList && featureImageList.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentSlide(
                  (prevSlide) =>
                    (prevSlide - 1 + featureImageList.length) %
                    featureImageList.length
                )
              }
              className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 w-10 h-10 z-10 flex items-center justify-center transition-all duration-300 hover:scale-125 opacity-0 group-hover:opacity-100 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
            >
              <ChevronLeftIcon className="w-6 h-6 text-amber-800 drop-shadow-lg hover:text-amber-900 transition-colors duration-200" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide(
                  (prevSlide) => (prevSlide + 1) % featureImageList.length
                )
              }
              className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 w-10 h-10 z-10 flex items-center justify-center transition-all duration-300 hover:scale-125 opacity-0 group-hover:opacity-100 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
            >
              <ChevronRightIcon className="w-6 h-6 text-amber-800 drop-shadow-lg hover:text-amber-900 transition-colors duration-200" />
            </button>
          </>
        )}
        
        {/* Slide Indicators - Only show if there are multiple images */}
        {featureImageList && featureImageList.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
            {featureImageList && featureImageList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Swipe indicators for mobile */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none sm:hidden" />
      </div>
      {/* Categories Section - Elegant Brown-Beige Theme */}
      <section className="py-12 sm:py-16 bg-beige-200">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-brown-800 tracking-tight">
            Shop by Category
          </h2>
          {/* Mobile: Horizontal scroll, Desktop: Grid */}
          <div className="block sm:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {categoriesWithIcon.map((categoryItem) => (
                <Card
                  key={categoryItem.id}
                  onClick={() =>
                    handleNavigateToListingPage(categoryItem, "category")
                  }
                  className="cursor-pointer transition-all duration-300 flex-shrink-0 w-36 h-32 bg-white border-beige-300 shadow-md hover:shadow-xl hover:-translate-y-1 hover:bg-beige-50"
                >
                  <CardContent className="flex flex-col items-center justify-center p-4 h-full">
                    <categoryItem.icon className="w-10 h-10 mb-3 text-brown-700" />
                    <span className="font-semibold text-sm text-center leading-tight text-brown-800">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* Desktop: Grid layout */}
          <div className="hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer transition-all duration-300 h-36 bg-white border-beige-300 shadow-md hover:shadow-xl hover:-translate-y-1 hover:bg-beige-50"
              >
                <CardContent className="flex flex-col items-center justify-center p-8 h-full">
                  <categoryItem.icon className="w-16 h-16 mb-4 text-brown-700" />
                  <span className="font-semibold text-lg text-brown-800">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Brown-Beige Theme */}
      <section className="py-12 sm:py-16 bg-beige-100">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-brown-800 tracking-tight">
            Featured Products
          </h2>
          {/* Always horizontal scroll on all screen sizes with navigation arrows */}
          <div className="relative group">
            <div 
              id="featured-products-scroll" 
              className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              {featuredProducts && featuredProducts.length > 0
                ? featuredProducts.map((productItem) => (
                    <div key={productItem._id} className="flex-shrink-0 w-72 sm:w-80">
                      <ShoppingProductTile
                        handleGetProductDetails={handleGetProductDetails}
                        product={productItem}
                      />
                    </div>
                  ))
                : null}
            </div>
            
            {/* Navigation Arrows - Brown with translucent background */}
            {featuredProducts && featuredProducts.length > 1 && (
              <>
                <button
                  onClick={() => {
                    const container = document.getElementById('featured-products-scroll');
                    const scrollAmount = container.querySelector('div').offsetWidth + 24; // card width + gap
                    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 z-10 flex items-center justify-center transition-all duration-300 hover:scale-125 opacity-0 group-hover:opacity-100 bg-amber-100/60 backdrop-blur-sm rounded-full hover:bg-amber-100/80"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-amber-800 hover:text-amber-900 transition-colors duration-200" />
                </button>
                <button
                  onClick={() => {
                    const container = document.getElementById('featured-products-scroll');
                    const scrollAmount = container.querySelector('div').offsetWidth + 24; // card width + gap
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 z-10 flex items-center justify-center transition-all duration-300 hover:scale-125 opacity-0 group-hover:opacity-100 bg-amber-100/60 backdrop-blur-sm rounded-full hover:bg-amber-100/80"
                >
                  <ChevronRightIcon className="w-5 h-5 text-amber-800 hover:text-amber-900 transition-colors duration-200" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
