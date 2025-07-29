import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Trash2, Plus, Palette, Package, AlertCircle, Check } from "lucide-react";
import { sizeOptions, colorOptions } from "@/config";

function ProductVariants({ variants = [], onVariantsChange }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [stockValues, setStockValues] = useState({});
  const [isAddingVariant, setIsAddingVariant] = useState(false);

  // Calculate total stock across all variants
  const getTotalStock = () => {
    return variants.reduce((total, variant) => {
      return total + variant.sizes.reduce((variantTotal, size) => variantTotal + size.stock, 0);
    }, 0);
  };

  // Get low stock variants (stock < 5)
  const getLowStockVariants = () => {
    const lowStock = [];
    variants.forEach(variant => {
      variant.sizes.forEach(size => {
        if (size.stock > 0 && size.stock < 5) {
          lowStock.push(`${variant.color} - ${size.size} (${size.stock} left)`);
        }
      });
    });
    return lowStock;
  };

  const handleAddVariant = () => {
    if (!selectedColor || selectedSizes.length === 0) {
      alert("Please select a color and at least one size");
      return;
    }

    const colorOption = colorOptions.find(c => c.id === selectedColor);
    const newVariant = {
      color: selectedColor,
      colorCode: colorOption?.code || "#000000",
      sizes: selectedSizes.map(size => ({
        size,
        stock: parseInt(stockValues[`${selectedColor}-${size}`] || 0)
      }))
    };

    // Check if color already exists
    const existingVariantIndex = variants.findIndex(v => v.color === selectedColor);
    
    if (existingVariantIndex !== -1) {
      // Update existing variant - merge sizes
      const updatedVariants = [...variants];
      const existingVariant = updatedVariants[existingVariantIndex];
      
      // Add new sizes or update existing ones
      selectedSizes.forEach(newSize => {
        const existingSizeIndex = existingVariant.sizes.findIndex(s => s.size === newSize);
        const stockValue = parseInt(stockValues[`${selectedColor}-${newSize}`] || 0);
        
        if (existingSizeIndex !== -1) {
          existingVariant.sizes[existingSizeIndex].stock = stockValue;
        } else {
          existingVariant.sizes.push({ size: newSize, stock: stockValue });
        }
      });
      
      onVariantsChange(updatedVariants);
    } else {
      // Add new variant
      onVariantsChange([...variants, newVariant]);
    }

    // Reset form
    setSelectedColor("");
    setSelectedSizes([]);
    setStockValues({});
    setIsAddingVariant(false);
  };

  const handleRemoveVariant = (variantIndex) => {
    const updatedVariants = variants.filter((_, i) => i !== variantIndex);
    onVariantsChange(updatedVariants);
  };

  const handleRemoveSize = (variantIndex, sizeIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes.splice(sizeIndex, 1);
    
    // Remove variant if no sizes left
    if (updatedVariants[variantIndex].sizes.length === 0) {
      updatedVariants.splice(variantIndex, 1);
    }
    
    onVariantsChange(updatedVariants);
  };

  const handleSizeToggle = (sizeId) => {
    setSelectedSizes(prev => 
      prev.includes(sizeId) 
        ? prev.filter(s => s !== sizeId)
        : [...prev, sizeId]
    );
  };

  const handleStockChange = (colorSize, value) => {
    setStockValues(prev => ({
      ...prev,
      [colorSize]: value
    }));
  };

  const handleVariantStockUpdate = (variantIndex, sizeIndex, newStock) => {
    console.log('🔄 Stock Update:', { variantIndex, sizeIndex, newStock });
    const stockValue = newStock === '' ? 0 : parseInt(newStock) || 0;
    
    // Create a deep copy of variants to avoid mutation issues
    const updatedVariants = variants.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        return {
          ...variant,
          sizes: variant.sizes.map((size, sIndex) => {
            if (sIndex === sizeIndex) {
              return {
                ...size,
                stock: stockValue
              };
            }
            return { ...size };
          })
        };
      }
      return {
        ...variant,
        sizes: variant.sizes.map(size => ({ ...size }))
      };
    });
    
    console.log('✅ Updated variants:', updatedVariants);
    onVariantsChange(updatedVariants);
  };

  const handleBulkStockUpdate = (variantIndex, stockValue) => {
    const stockNum = stockValue === '' ? 0 : parseInt(stockValue) || 0;
    
    // Create a deep copy of variants to avoid mutation issues
    const updatedVariants = variants.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        return {
          ...variant,
          sizes: variant.sizes.map(size => ({
            ...size,
            stock: stockNum
          }))
        };
      }
      return {
        ...variant,
        sizes: variant.sizes.map(size => ({ ...size }))
      };
    });
    
    console.log('✅ Bulk updated variant:', updatedVariants[variantIndex]);
    onVariantsChange(updatedVariants);
  };

  const lowStockItems = getLowStockVariants();

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Inventory Management</h3>
            <p className="text-sm text-gray-600">Manage colors, sizes, and stock levels</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{getTotalStock()}</div>
            <div className="text-xs text-gray-500">Total Stock</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{variants.length}</div>
            <div className="text-xs text-gray-500">Variants</div>
          </div>
          {lowStockItems.length > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{lowStockItems.length}</div>
              <div className="text-xs text-gray-500">Low Stock</div>
            </div>
          )}
        </div>
      </div>

      {/* Low Stock Warning */}
      {lowStockItems.length > 0 && (
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-800">Low Stock Alert</h4>
              <p className="text-sm text-orange-700 mt-1">The following items have less than 5 units in stock:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {lowStockItems.map((item, index) => (
                  <Badge key={index} variant="outline" className="text-orange-700 border-orange-300">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Variant Section */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product Variant
            </CardTitle>
            {!isAddingVariant && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddingVariant(true)}
              >
                Add Variant
              </Button>
            )}
          </div>
        </CardHeader>
        
        {isAddingVariant && (
          <CardContent className="space-y-6">
            {/* Color Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Color</Label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.id} value={color.id}>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-5 h-5 rounded-full border-2 border-gray-300 shadow-sm"
                          style={{ backgroundColor: color.code }}
                        ></div>
                        <span className="font-medium">{color.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Sizes</Label>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {sizeOptions.map((size) => (
                  <Button
                    key={size.id}
                    type="button"
                    variant={selectedSizes.includes(size.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSizeToggle(size.id)}
                    className="h-10 text-xs sm:text-sm"
                  >
                    {size.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stock Input Grid - Improved Mobile Layout */}
            {selectedColor && selectedSizes.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Set Stock Quantities for Each Size</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border">
                  {selectedSizes.map((size) => {
                    const stockKey = `${selectedColor}-${size}`;
                    const colorOption = colorOptions.find(c => c.id === selectedColor);
                    return (
                      <div key={size} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-5 h-5 rounded-full border-2 border-gray-300 shadow-sm"
                              style={{ backgroundColor: colorOption?.code }}
                            ></div>
                            <span className="font-semibold text-sm text-gray-800">Size {size}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {colorOption?.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={stockKey} className="text-xs text-gray-600 font-medium min-w-0">
                            Stock:
                          </Label>
                          <Input
                            id={stockKey}
                            type="number"
                            min="0"
                            max="9999"
                            placeholder="0"
                            value={stockValues[stockKey] || ""}
                            onChange={(e) => handleStockChange(stockKey, e.target.value)}
                            className="flex-1 h-9 text-sm text-center font-medium border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                          <span className="text-xs text-gray-500 font-medium">pcs</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Quick Stock Total Preview */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">Total Stock for this Variant:</span>
                    <Badge className="bg-blue-600 text-white text-sm px-3 py-1">
                      {selectedSizes.reduce((total, size) => {
                        const stockKey = `${selectedColor}-${size}`;
                        return total + (parseInt(stockValues[stockKey]) || 0);
                      }, 0)} pieces
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleAddVariant} className="flex-1">
                <Check className="h-4 w-4 mr-2" />
                Save Variant
              </Button>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => {
                  setIsAddingVariant(false);
                  setSelectedColor("");
                  setSelectedSizes([]);
                  setStockValues({});
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Existing Variants */}
      {variants.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-base sm:text-lg">
            <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
            Current Variants ({variants.length})
          </h4>
          
          <div className="grid gap-4">
            {variants.map((variant, variantIndex) => (
              <Card key={variantIndex} className="overflow-hidden border-2 hover:border-blue-200 transition-colors">
                <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: variant.colorCode }}
                      ></div>
                      <div>
                        <CardTitle className="text-base sm:text-lg capitalize font-bold text-gray-800">{variant.color}</CardTitle>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <p className="text-xs sm:text-sm text-gray-600">
                            {variant.sizes.length} sizes available
                          </p>
                          <Badge className="bg-blue-600 text-white text-xs w-fit">
                            {variant.sizes.reduce((sum, s) => sum + s.stock, 0)} total stock
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {variant.sizes.map((sizeItem, sizeIndex) => (
                      <div key={sizeIndex} className="bg-white border-2 border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm sm:text-base text-gray-800">Size {sizeItem.size}</span>
                            <Badge 
                              variant={sizeItem.stock === 0 ? "destructive" : sizeItem.stock < 5 ? "secondary" : "default"}
                              className="text-xs"
                            >
                              {sizeItem.stock === 0 ? "Out of Stock" : sizeItem.stock < 5 ? "Low Stock" : "In Stock"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <Label className="text-xs text-gray-600 font-medium">Stock Quantity:</Label>
                            <Input
                              type="number"
                              min="0"
                              max="9999"
                              value={sizeItem.stock || 0}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                handleVariantStockUpdate(variantIndex, sizeIndex, newValue);
                              }}
                              onBlur={(e) => {
                                // Ensure we have a valid number on blur
                                const value = e.target.value;
                                if (value === '' || isNaN(value)) {
                                  handleVariantStockUpdate(variantIndex, sizeIndex, '0');
                                }
                              }}
                              className="w-full h-9 text-sm text-center font-semibold border-gray-300 focus:border-blue-500 focus:ring-blue-500 mt-1"
                              placeholder="0"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSize(variantIndex, sizeIndex)}
                            className="p-2 h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50 mt-auto"
                            title="Remove this size"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Variant Action Buttons - Improved Mobile Layout */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 mt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Bulk Update All Sizes:</label>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Input
                          type="number"
                          min="0"
                          max="9999"
                          placeholder="Enter quantity"
                          className="w-full sm:w-32 h-8 text-sm"
                          onBlur={(e) => {
                            if (e.target.value) {
                              handleBulkStockUpdate(variantIndex, e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <span className="text-sm text-gray-500 whitespace-nowrap">pieces each</span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveVariant(variantIndex)}
                      className="w-full sm:w-auto mt-2 sm:mt-0"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Variant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductVariants;
