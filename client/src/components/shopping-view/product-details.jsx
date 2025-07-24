import { StarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import ProductVariantSelector from "./product-variant-selector";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useNavigate } from "react-router-dom";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  // Get all images for this product
  const productImages = productDetails?.images && productDetails.images.length > 0 
    ? productDetails.images 
    : productDetails?.image 
      ? [productDetails.image] 
      : [];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [productDetails]);

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock, variantInfo = null) {
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

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    
    const cartData = {
      userId: user?.id,
      productId: getCurrentProductId,
      quantity: 1,
    };
    
    // Add variant information if provided
    if (variantInfo) {
      cartData.variant = {
        color: variantInfo.color,
        colorCode: variantInfo.colorCode,
        size: variantInfo.size
      };
    }
    
    console.log("Adding to cart with data:", cartData);
    
    dispatch(addToCart(cartData)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  console.log(reviews, "reviews");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:p-8 max-w-[95vw] sm:max-w-[85vw] lg:max-w-[80vw] max-h-[90vh] overflow-y-auto">
        {/* Image Section - Larger on top for mobile, left side for desktop */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-lg group">
          {productImages.length > 0 ? (
            <img
              src={productImages[currentImageIndex]}
              alt={`${productDetails?.title} - Image ${currentImageIndex + 1}`}
              width={800}
              height={600}
              className="aspect-[4/3] lg:aspect-square w-full object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="aspect-[4/3] lg:aspect-square w-full bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500 text-lg">No Image</span>
            </div>
          )}

          {/* Navigation Arrows - Brown with translucent background */}
          {productImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 bg-amber-900/20 backdrop-blur-sm rounded-full hover:bg-amber-900/40"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 bg-amber-900/20 backdrop-blur-sm rounded-full hover:bg-amber-900/40"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {productImages.length > 1 && (
            <div className="absolute top-4 right-4 bg-amber-900/70 text-white text-sm px-3 py-1.5 rounded-lg font-medium">
              {currentImageIndex + 1}/{productImages.length}
            </div>
          )}

          {/* Thumbnail Navigation */}
          {productImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-amber-900/60 p-3 rounded-lg">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-12 h-12 rounded border-2 overflow-hidden ${
                    index === currentImageIndex 
                      ? 'border-white' 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Content Section - Smaller column on desktop, below image on mobile */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">{productDetails?.title}</h1>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
              {productDetails?.description}
            </p>
          </div>
          
          {/* Enhanced Price Section */}
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              {productDetails?.salePrice > 0 ? (
                <div className="flex items-center space-x-3">
                  <p className="text-2xl lg:text-3xl font-bold text-green-600">
                    ₹{productDetails?.salePrice?.toLocaleString('en-IN')}
                  </p>
                  <p className="text-lg lg:text-xl font-semibold text-gray-500 line-through">
                    ₹{productDetails?.price?.toLocaleString('en-IN')}
                  </p>
                </div>
              ) : (
                <p className="text-2xl lg:text-3xl font-bold text-amber-800">
                  ₹{productDetails?.price?.toLocaleString('en-IN')}
                </p>
              )}
              
              {/* Discount Badge */}
              {productDetails?.salePrice > 0 && (
                <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                  {Math.round(((productDetails?.price - productDetails?.salePrice) / productDetails?.price) * 100)}% OFF
                </span>
              )}
            </div>
            
            {productDetails?.salePrice > 0 && (
              <p className="text-sm text-green-600 font-medium">
                You save ₹{(productDetails?.price - productDetails?.salePrice)?.toLocaleString('en-IN')}
              </p>
            )}
          </div>
          
          {/* Rating Section */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-gray-600 font-medium">
              ({averageReview.toFixed(1)}) • {reviews?.length || 0} reviews
            </span>
          </div>
          
          {/* Product Variants */}
          {productDetails?.variants && productDetails.variants.length > 0 && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">Select Options</h3>
              <ProductVariantSelector
                variants={productDetails.variants}
                onVariantChange={setSelectedVariant}
              />
            </div>
          )}
          
          {/* Stock and Add to Cart */}
          <div className="space-y-4">
            {/* Show variant stock if variant is selected, otherwise show total stock */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">Availability:</span>
              <span className={`font-semibold ${
                (selectedVariant ? selectedVariant.stock === 0 : productDetails?.totalStock === 0) 
                  ? 'text-red-600' 
                  : 'text-green-600'
              }`}>
                {selectedVariant 
                  ? (selectedVariant.stock === 0 ? 'Out of Stock' : `${selectedVariant.stock} in stock`)
                  : (productDetails?.totalStock === 0 ? 'Out of Stock' : `${productDetails?.totalStock} in stock`)
                }
              </span>
            </div>
            
            {/* Add to Cart Button */}
            {(() => {
              const hasVariants = productDetails?.variants && productDetails.variants.length > 0;
              const isOutOfStock = hasVariants 
                ? (selectedVariant ? selectedVariant.stock === 0 : true)
                : productDetails?.totalStock === 0;
              const needsVariantSelection = hasVariants && !selectedVariant;
              
              if (isOutOfStock) {
                return (
                  <Button className="w-full bg-gray-400 cursor-not-allowed text-white py-3" disabled>
                    Out of Stock
                  </Button>
                );
              }
              
              if (needsVariantSelection) {
                return (
                  <Button className="w-full bg-gray-400 cursor-not-allowed text-white py-3" disabled>
                    Select Color & Size
                  </Button>
                );
              }
              
              return (
                <Button
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      selectedVariant ? selectedVariant.stock : productDetails?.totalStock,
                      selectedVariant
                    )
                  }
                >
                  Add to Cart
                </Button>
              );
            })()}
          </div>
          
          <Separator className="my-6" />
          
          {/* Reviews Section */}
          <div className="max-h-[400px] overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Customer Reviews</h2>
            <div className="space-y-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={reviewItem._id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                    <Avatar className="w-10 h-10 border border-amber-200">
                      <AvatarFallback className="bg-amber-100 text-amber-800 font-semibold">
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{reviewItem?.userName}</h3>
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{reviewItem?.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
