import React, { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Check, Package, AlertTriangle } from "lucide-react";

function ProductVariantSelector({ variants = [], onVariantChange }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Reset selections when variants change
  useEffect(() => {
    setSelectedColor("");
    setSelectedSize("");
    onVariantChange(null);
  }, [variants]);

  const handleColorSelect = (color, colorCode) => {
    setSelectedColor(color);
    setSelectedSize(""); // Reset size when color changes
    updateVariant(color, "");
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    updateVariant(selectedColor, size);
  };

  const updateVariant = (color, size) => {
    if (color && size) {
      const variant = variants.find(v => v.color === color);
      const sizeData = variant?.sizes.find(s => s.size === size);
      
      onVariantChange({
        color,
        colorCode: variant?.colorCode,
        size,
        stock: sizeData?.stock || 0,
        available: (sizeData?.stock || 0) > 0
      });
    } else {
      onVariantChange(null);
    }
  };

  const getAvailableColors = () => {
    return variants.map(v => ({ 
      color: v.color, 
      colorCode: v.colorCode,
      totalStock: v.sizes.reduce((sum, s) => sum + s.stock, 0),
      hasStock: v.sizes.some(s => s.stock > 0)
    }));
  };

  const getAvailableSizes = () => {
    if (!selectedColor) return [];
    
    const colorVariant = variants.find(v => v.color === selectedColor);
    return colorVariant?.sizes.map(s => ({
      ...s,
      isLowStock: s.stock > 0 && s.stock <= 3
    })).sort((a, b) => {
      // Sort by availability first, then by size
      if (a.stock === 0 && b.stock > 0) return 1;
      if (a.stock > 0 && b.stock === 0) return -1;
      return a.size.localeCompare(b.size);
    }) || [];
  };

  const getStockForSelection = () => {
    if (!selectedColor || !selectedSize) return 0;
    
    const variant = variants.find(v => v.color === selectedColor);
    const sizeData = variant?.sizes.find(s => s.size === selectedSize);
    return sizeData?.stock || 0;
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", variant: "destructive", icon: AlertTriangle };
    if (stock <= 3) return { text: `Only ${stock} left`, variant: "outline", icon: AlertTriangle };
    if (stock <= 10) return { text: `${stock} available`, variant: "secondary", icon: Package };
    return { text: "In Stock", variant: "secondary", icon: Check };
  };

  if (!variants || variants.length === 0) {
    return null;
  }

  const availableColors = getAvailableColors();
  const availableSizes = getAvailableSizes();
  const currentStock = getStockForSelection();
  const stockStatus = getStockStatus(currentStock);

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold text-gray-900">Color</Label>
          {selectedColor && (
            <span className="text-sm text-gray-600 capitalize">
              Selected: {selectedColor}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {availableColors.map(({ color, colorCode, totalStock, hasStock }) => (
            <div key={color} className="relative">
              <button
                onClick={() => hasStock && handleColorSelect(color, colorCode)}
                disabled={!hasStock}
                className={`
                  w-full aspect-square rounded-lg border-2 transition-all duration-200 relative overflow-hidden group
                  ${selectedColor === color 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : hasStock 
                      ? 'border-gray-300 hover:border-gray-400' 
                      : 'border-gray-200 opacity-50 cursor-not-allowed'
                  }
                  ${hasStock ? 'hover:scale-105 hover:shadow-md' : ''}
                `}
                style={{ backgroundColor: colorCode }}
              >
                {/* Selected indicator */}
                {selectedColor === color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full p-1 shadow-lg">
                      <Check className="h-3 w-3 text-blue-600" />
                    </div>
                  </div>
                )}
                
                {/* Out of stock overlay */}
                {!hasStock && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600 transform rotate-45">
                      OUT
                    </span>
                  </div>
                )}
                
                {/* Tooltip on hover */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity capitalize whitespace-nowrap z-10">
                  {color} {hasStock && `(${totalStock})`}
                </div>
              </button>
              
              {/* Color name below */}
              <p className="text-xs text-center mt-1 capitalize font-medium text-gray-700">
                {color}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      {selectedColor && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold text-gray-900">Size</Label>
            {selectedSize && (
              <span className="text-sm text-gray-600">
                Selected: {selectedSize}
              </span>
            )}
          </div>
          
          {availableSizes.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
              {availableSizes.map((sizeData) => (
                <Button
                  key={sizeData.size}
                  variant={selectedSize === sizeData.size ? "default" : "outline"}
                  size="sm"
                  onClick={() => sizeData.stock > 0 && handleSizeSelect(sizeData.size)}
                  disabled={sizeData.stock === 0}
                  className={`
                    h-12 relative overflow-hidden
                    ${sizeData.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                    ${sizeData.isLowStock ? 'border-orange-300 bg-orange-50' : ''}
                    ${selectedSize === sizeData.size ? 'bg-blue-600 text-white' : ''}
                  `}
                >
                  <div className="text-center">
                    <div className="font-semibold">{sizeData.size}</div>
                    {sizeData.stock === 0 && (
                      <div className="text-xs text-red-500">Out</div>
                    )}
                    {sizeData.isLowStock && sizeData.stock > 0 && (
                      <div className="text-xs text-orange-600">{sizeData.stock}</div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-500">No sizes available for this color</p>
            </div>
          )}
        </div>
      )}

      {/* Stock Information */}
      {selectedColor && selectedSize && (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <stockStatus.icon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Availability Status</p>
                <p className="text-sm text-gray-600">
                  {selectedColor} • Size {selectedSize}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <Badge variant={stockStatus.variant} className="text-sm">
                {stockStatus.text}
              </Badge>
              {currentStock > 0 && currentStock <= 3 && (
                <p className="text-xs text-orange-600 mt-1">
                  Hurry! Limited quantity
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Selection Summary */}
      {(!selectedColor || !selectedSize) && (
        <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center text-gray-500">
            <Package className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium">Select Options</p>
            <p className="text-sm">
              {!selectedColor ? "Choose a color to see available sizes" : "Select a size to continue"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductVariantSelector;
