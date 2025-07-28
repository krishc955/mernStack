import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState, memo } from "react";
import LazyImage from "../common/LazyImage";

const ShoppingProductTile = memo(function ShoppingProductTile({
  product,
  handleGetProductDetails,
}) {
  // Get all images for this product
  const productImages = product?.images && product.images.length > 0 
    ? product.images 
    : product?.image 
      ? [product.image] 
      : [];
      
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  return (
    <Card 
      className="w-full max-w-sm mx-auto border border-beige-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden group bg-white"
    >
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative overflow-hidden">
          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-brown-600 hover:text-red-500'}`} 
            />
          </button>

          {productImages.length > 0 ? (
            <div className="relative h-[160px] sm:h-[200px] md:h-[250px] lg:h-[300px] overflow-hidden">
              <LazyImage
                src={productImages[currentImageIndex]}
                alt={`${product?.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className="w-full h-[160px] sm:h-[200px] md:h-[250px] lg:h-[300px] flex items-center justify-center bg-gradient-to-br from-beige-200 to-beige-100">
              <span className="text-brown-600 text-sm sm:text-base lg:text-lg font-medium">No Image</span>
            </div>
          )}

          {/* Navigation Arrows - Brown with translucent background */}
          {productImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-125 z-10 bg-white/25 backdrop-blur-sm rounded-full hover:bg-white/40"
              >
                <ChevronLeft className="h-4 w-4 text-brown-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-125 z-10 bg-white/25 backdrop-blur-sm rounded-full hover:bg-white/40"
              >
                <ChevronRight className="h-4 w-4 text-brown-700" />
              </button>
            </>
          )}

          {/* Image Counter - Enhanced */}
          {productImages.length > 1 && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
              {currentImageIndex + 1}/{productImages.length}
            </div>
          )}

          {/* Stock and Sale Badges */}
          <div className="absolute bottom-3 left-3">
            {product?.totalStock === 0 ? (
              <Badge className="bg-brown-600 text-white px-3 py-1 rounded-full shadow-lg">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="bg-brown-500 text-white px-3 py-1 rounded-full shadow-lg">
                Only {product?.totalStock} left
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="bg-brown-700 text-white px-3 py-1 rounded-full shadow-lg font-semibold">
                Sale
              </Badge>
            ) : null}
          </div>

          {/* Image Dots - Enhanced */}
          {productImages.length > 1 && (
            <div className="absolute bottom-3 right-3 flex space-x-1">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <CardContent className="p-3 sm:p-4 md:p-6 bg-white">
          <div className="space-y-2 md:space-y-3">
            {/* Product Title - More responsive sizing */}
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-brown-800 line-clamp-2 leading-tight group-hover:text-brown-900 transition-colors">
              {product?.title}
            </h2>
            
            {/* Category and Brand badges - Better mobile layout */}
            <div className="flex items-center justify-between text-xs sm:text-xs md:text-sm gap-1">
              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1 rounded-full bg-brown-100 text-brown-700 font-medium text-xs truncate flex-1 text-center">
                {categoryOptionsMap[product?.category]}
              </span>
              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1 rounded-full bg-beige-100 text-beige-700 font-medium text-xs truncate flex-1 text-center">
                {brandOptionsMap[product?.brand]}
              </span>
            </div>

            {/* Variant Colors - Mobile optimized */}
            {product?.variants && product.variants.length > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 text-xs">Colors:</span>
                <div className="flex items-center space-x-1">
                  {product.variants.slice(0, 3).map((variant, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: variant.colorCode }}
                      title={variant.color}
                    />
                  ))}
                  {product.variants.length > 3 && (
                    <span className="text-xs text-gray-500 ml-1">
                      +{product.variants.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Available Sizes - Mobile optimized */}
            {product?.variants && product.variants.length > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Sizes:</span>
                <div className="flex items-center space-x-1">
                  {[...new Set(product.variants.flatMap(v => v.sizes.map(s => s.size)))]
                    .sort()
                    .slice(0, 3)
                    .map((size, index) => (
                      <span
                        key={index}
                        className="text-xs px-1 py-0.5 bg-gray-100 text-gray-700 rounded"
                      >
                        {size}
                      </span>
                    ))}
                  {[...new Set(product.variants.flatMap(v => v.sizes.map(s => s.size)))].length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{[...new Set(product.variants.flatMap(v => v.sizes.map(s => s.size)))].length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* Pricing - Mobile optimized */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 sm:space-x-2">
                {product?.salePrice > 0 ? (
                  <>
                    <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-brown-800">
                      ₹{product?.salePrice?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base text-brown-500 line-through">
                      ₹{product?.price?.toLocaleString('en-IN')}
                    </span>
                  </>
                ) : (
                  <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-brown-800">
                    ₹{product?.price?.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              
              {/* Discount Badge */}
              {product?.salePrice > 0 && (
                <span className="px-1 py-0.5 sm:px-1.5 sm:py-0.5 md:px-2 md:py-1 rounded-full bg-brown-100 text-brown-700 text-[9px] sm:text-[10px] md:text-xs font-semibold">
                  {Math.round(((product?.price - product?.salePrice) / product?.price) * 100)}% OFF
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </div>
      
      {/* Card Footer - Mobile optimized */}
      <CardFooter className="p-2 sm:p-3 md:p-4 pt-0 md:pt-0 bg-beige-50/50">
        {product?.totalStock === 0 ? (
          <Button className="w-full bg-neutral-400 hover:bg-neutral-500 text-white font-semibold py-1.5 sm:py-2 md:py-3 rounded-lg cursor-not-allowed transition-all duration-200 text-xs sm:text-sm">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleGetProductDetails(product?._id);
            }}
            className="w-full bg-gradient-to-r from-brown-600 to-brown-700 hover:from-brown-700 hover:to-brown-800 text-white font-semibold py-1.5 sm:py-2 md:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-xs sm:text-sm"
          >
            Buy Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
});

export default ShoppingProductTile;
