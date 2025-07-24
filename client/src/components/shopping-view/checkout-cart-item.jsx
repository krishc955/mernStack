import { Badge } from "../ui/badge";

function CheckoutCartItemContent({ cartItem }) {
  const finalPrice = cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price;
  const hasDiscount = cartItem?.salePrice > 0 && cartItem?.price > cartItem?.salePrice;
  const discountPercentage = hasDiscount ? Math.round(((cartItem.price - cartItem.salePrice) / cartItem.price) * 100) : 0;

  // Debug logging
  console.log("Checkout cart item data:", cartItem);
  console.log("Checkout cart item variant:", cartItem?.variant);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-white transition-colors">
      <div className="flex items-start space-x-3">
        <div className="relative flex-shrink-0">
          <img
            src={cartItem?.image || '/placeholder-image.jpg'}
            alt={cartItem?.title || 'Product'}
            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
          />
          {hasDiscount && (
            <div className="absolute -top-2 -right-2">
              <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                {discountPercentage}%
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 pr-2">
              {cartItem?.title || 'Product Name'}
            </h3>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-sm text-gray-900">
                ₹{(finalPrice * cartItem?.quantity).toLocaleString('en-IN')}
              </p>
              {hasDiscount && (
                <p className="text-xs text-gray-500 line-through">
                  ₹{(cartItem.price * cartItem.quantity).toLocaleString('en-IN')}
                </p>
              )}
            </div>
          </div>

          {/* Variant Information - Compact */}
          {cartItem?.variant && (
            <div className="flex items-center gap-3 mb-2 text-xs">
              <div className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: cartItem.variant.colorCode || '#000' }}
                ></div>
                <span className="text-gray-600 capitalize">{cartItem.variant.color}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium text-gray-900 bg-white border px-1.5 py-0.5 rounded text-xs">
                  {cartItem.variant.size}
                </span>
              </div>
            </div>
          )}

          {/* Quantity and Unit Price - Compact */}
          <div className="flex justify-between items-center text-xs text-gray-600">
            <span>Qty: <span className="font-medium text-gray-900">{cartItem?.quantity || 1}</span></span>
            <div className="flex items-center gap-1">
              <span>₹{finalPrice?.toLocaleString('en-IN')} each</span>
              {hasDiscount && (
                <span className="line-through text-gray-400">
                  ₹{cartItem.price?.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCartItemContent;
