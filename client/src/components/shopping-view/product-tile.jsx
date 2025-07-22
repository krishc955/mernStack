import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState, useEffect } from "react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  // Get all images for this product
  const productImages = product?.images && product.images.length > 0 
    ? product.images 
    : product?.image 
      ? [product.image] 
      : [];
      
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dominantColor, setDominantColor] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  // Function to extract dominant color from image
  const extractDominantColor = (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set canvas size
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw image to canvas
          ctx.drawImage(img, 0, 0);
          
          // Sample pixels from the image (every 10th pixel for performance)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;
          const pixelArray = [];
          
          for (let i = 0; i < pixels.length; i += 40) { // Sample every 10th pixel
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const alpha = pixels[i + 3];
            
            // Skip transparent pixels
            if (alpha > 128) {
              pixelArray.push([r, g, b]);
            }
          }
          
          if (pixelArray.length > 0) {
            // Calculate average color
            const avgColor = pixelArray.reduce(
              (acc, pixel) => [
                acc[0] + pixel[0],
                acc[1] + pixel[1],
                acc[2] + pixel[2]
              ],
              [0, 0, 0]
            );
            
            const finalColor = [
              Math.floor(avgColor[0] / pixelArray.length),
              Math.floor(avgColor[1] / pixelArray.length),
              Math.floor(avgColor[2] / pixelArray.length)
            ];
            
            // Create subtle background variations
            const lightColor = `rgba(${Math.min(255, finalColor[0] + 40)}, ${Math.min(255, finalColor[1] + 40)}, ${Math.min(255, finalColor[2] + 40)}, 0.1)`;
            const mediumColor = `rgba(${finalColor[0]}, ${finalColor[1]}, ${finalColor[2]}, 0.05)`;
            
            const gradient = `linear-gradient(135deg, ${lightColor} 0%, ${mediumColor} 100%)`;
            resolve(gradient);
          } else {
            resolve('linear-gradient(135deg, rgba(250, 248, 242, 0.8) 0%, rgba(247, 244, 237, 0.9) 100%)');
          }
        } catch (error) {
          resolve('linear-gradient(135deg, rgba(250, 248, 242, 0.8) 0%, rgba(247, 244, 237, 0.9) 100%)');
        }
      };
      
      img.onerror = () => {
        resolve('linear-gradient(135deg, rgba(250, 248, 242, 0.8) 0%, rgba(247, 244, 237, 0.9) 100%)');
      };
      
      img.src = imageUrl;
    });
  };

  // Extract color when image changes
  useEffect(() => {
    if (productImages.length > 0) {
      extractDominantColor(productImages[currentImageIndex])
        .then(color => setDominantColor(color));
    }
  }, [currentImageIndex, productImages]);

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
      className="w-full max-w-sm mx-auto border-2 border-gray-800/30 shadow-lg hover:shadow-2xl hover:border-gray-700/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden group bg-white relative"
      style={{
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.2)'
      }}
    >
      {/* Decorative Corner Elements */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-gray-700/60 rounded-tl-lg opacity-70"></div>
      <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-gray-700/60 rounded-tr-lg opacity-70"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-gray-700/60 rounded-bl-lg opacity-70"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-gray-700/60 rounded-br-lg opacity-70"></div>
      
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative overflow-hidden">
          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} 
            />
          </button>

          {productImages.length > 0 ? (
            <div className="relative h-[200px] md:h-[300px] overflow-hidden">
              <img
                src={productImages[currentImageIndex]}
                alt={`${product?.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className="w-full h-[200px] md:h-[300px] flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-50">
              <span className="text-amber-600 text-lg font-medium">No Image</span>
            </div>
          )}

          {/* Navigation Arrows - Brown with translucent background */}
          {productImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-125 z-10 bg-white/25 backdrop-blur-sm rounded-full hover:bg-white/40"
              >
                <ChevronLeft className="h-4 w-4 text-amber-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-125 z-10 bg-white/25 backdrop-blur-sm rounded-full hover:bg-white/40"
              >
                <ChevronRight className="h-4 w-4 text-amber-800" />
              </button>
            </>
          )}

          {/* Image Counter - Enhanced */}
          {productImages.length > 1 && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
              {currentImageIndex + 1}/{productImages.length}
            </div>
          )}

          {/* Enhanced Stock and Sale Badges */}
          <div className="absolute bottom-3 left-3">
            {product?.totalStock === 0 ? (
              <Badge className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow-lg">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full shadow-lg">
                Only {product?.totalStock} left
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full shadow-lg font-semibold">
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
        
        {/* Enhanced Card Content */}
        <CardContent className="p-4 md:p-6 bg-gradient-to-b from-white to-gray-100/40 backdrop-blur-sm border-t border-gray-200/40">
          <div className="space-y-2 md:space-y-3">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-gray-900 transition-colors">
              {product?.title}
            </h2>
            
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="px-2 py-1 md:px-3 md:py-1 rounded-full bg-amber-100 text-amber-800 font-medium">
                {categoryOptionsMap[product?.category]}
              </span>
              <span className="px-2 py-1 md:px-3 md:py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                {brandOptionsMap[product?.brand]}
              </span>
            </div>
            
            {/* Enhanced Pricing */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 md:space-x-2">
                {product?.salePrice > 0 ? (
                  <>
                    <span className="text-lg md:text-2xl font-bold text-green-600">
                      ₹{product?.salePrice?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm md:text-lg text-gray-500 line-through">
                      ₹{product?.price?.toLocaleString('en-IN')}
                    </span>
                  </>
                ) : (
                  <span className="text-lg md:text-2xl font-bold text-gray-800">
                    ₹{product?.price?.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              
              {/* Discount Badge */}
              {product?.salePrice > 0 && (
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 rounded-full bg-red-100 text-red-600 text-[10px] md:text-xs font-semibold">
                  {Math.round(((product?.price - product?.salePrice) / product?.price) * 100)}% OFF
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </div>
      
      {/* Enhanced Card Footer */}
      <CardFooter className="p-4 pt-0 md:p-6 md:pt-0 bg-gradient-to-t from-gray-100/50 to-white backdrop-blur-sm border-t border-gray-200/30">
        {product?.totalStock === 0 ? (
          <Button className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 md:py-3 rounded-full cursor-not-allowed transition-all duration-200 text-sm">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddtoCart(product?._id, product?.totalStock);
            }}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-2 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-sm"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
