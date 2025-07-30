import { memo, useState, useCallback, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/common/OptimizedImage";
import { ChevronLeft, ChevronRight, Heart } from "@/components/icons/lightweight-icons";

// Ultra-light product tile for maximum performance
const UltraLightProductTile = memo(({ product, onProductClick, isInView = true }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Memoize product images
  const productImages = useMemo(() => {
    return product?.images?.length > 0 ? product.images : 
           product?.image ? [product.image] : [];
  }, [product?.images, product?.image]);

  // Memoized handlers
  const handleNextImage = useCallback((e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  }, [productImages.length]);

  const handlePrevImage = useCallback((e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  }, [productImages.length]);

  const handleLikeToggle = useCallback((e) => {
    e.stopPropagation();
    setIsLiked(prev => !prev);
  }, []);

  const handleProductClick = useCallback(() => {
    onProductClick?.(product?._id);
  }, [onProductClick, product?._id]);

  // Memoize price display
  const priceDisplay = useMemo(() => {
    if (product?.salePrice > 0) {
      return {
        current: `₹${product.salePrice.toLocaleString('en-IN')}`,
        original: `₹${product.price?.toLocaleString('en-IN')}`,
        discount: Math.round(((product.price - product.salePrice) / product.price) * 100)
      };
    }
    return {
      current: `₹${product?.price?.toLocaleString('en-IN')}`,
      original: null,
      discount: 0
    };
  }, [product?.salePrice, product?.price]);

  // Early return for loading state
  if (!product) {
    return (
      <Card className="w-full animate-pulse">
        <div className="h-48 bg-gray-200 rounded-t"></div>
        <CardContent className="p-4">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="w-full border border-beige-300 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group bg-white cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="relative">
        {/* Wishlist Button */}
        <button
          onClick={handleLikeToggle}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white transition-all duration-200"
        >
          <Heart 
            className={`w-3 h-3 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
            }`} 
          />
        </button>

        {/* Image Section */}
        {productImages.length > 0 ? (
          <div className="relative h-48 overflow-hidden">
            {isInView ? (
              <OptimizedImage
                src={productImages[currentImageIndex]}
                alt={product?.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                width={250}
                height={192}
                quality={80}
                format="webp"
                sizes="(max-width: 640px) 250px, 300px"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Loading...</span>
              </div>
            )}
            
            {/* Navigation Arrows */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/70 rounded-full"
                >
                  <ChevronLeft className="h-3 w-3 text-gray-700" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/70 rounded-full"
                >
                  <ChevronRight className="h-3 w-3 text-gray-700" />
                </button>
              </>
            )}

            {/* Stock Badge */}
            {product?.totalStock === 0 && (
              <div className="absolute bottom-2 left-2">
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <CardContent className="p-3">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
            {product?.title}
          </h3>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-lg font-bold text-green-600">
                {priceDisplay.current}
              </span>
              {priceDisplay.original && (
                <span className="text-sm text-gray-500 line-through">
                  {priceDisplay.original}
                </span>
              )}
            </div>
            {priceDisplay.discount > 0 && (
              <span className="px-1 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                {priceDisplay.discount}% OFF
              </span>
            )}
          </div>
          
          {/* Action Button */}
          <Button
            size="sm"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs"
            onClick={handleProductClick}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

UltraLightProductTile.displayName = 'UltraLightProductTile';

export default UltraLightProductTile;
