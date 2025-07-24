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
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes[sizeIndex].stock = parseInt(newStock) || 0;
    onVariantsChange(updatedVariants);
  };

  const handleBulkStockUpdate = (variantIndex, stockValue) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes.forEach(size => {
      size.stock = parseInt(stockValue) || 0;
    });
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
              <div className="grid grid-cols-6 gap-2">
                {sizeOptions.map((size) => (
                  <Button
                    key={size.id}
                    type="button"
                    variant={selectedSizes.includes(size.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSizeToggle(size.id)}
                    className="h-10 text-sm"
                  >
                    {size.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stock Input Grid */}
            {selectedColor && selectedSizes.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Set Stock Quantities</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  {selectedSizes.map((size) => {
                    const stockKey = `${selectedColor}-${size}`;
                    const colorOption = colorOptions.find(c => c.id === selectedColor);
                    return (
                      <div key={size} className="flex items-center gap-3 p-3 bg-white rounded-md border">
                        <div className="flex items-center gap-2 flex-1">
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: colorOption?.code }}
                          ></div>
                          <span className="font-medium text-sm">{size}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            value={stockValues[stockKey] || ""}
                            onChange={(e) => handleStockChange(stockKey, e.target.value)}
                            className="w-20 h-8 text-sm text-center"
                          />
                          <span className="text-xs text-gray-500">pcs</span>
                        </div>
                      </div>
                    );
                  })}
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
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Current Variants ({variants.length})
          </h4>
          
          <div className="grid gap-4">
            {variants.map((variant, variantIndex) => (
              <Card key={variantIndex} className="overflow-hidden">
                <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: variant.colorCode }}
                      ></div>
                      <div>
                        <CardTitle className="text-lg capitalize">{variant.color}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {variant.sizes.length} sizes • {variant.sizes.reduce((sum, s) => sum + s.stock, 0)} total stock
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {variant.sizes.map((sizeItem, sizeIndex) => (
                      <div key={sizeIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="font-medium text-sm min-w-8">{sizeItem.size}</span>
                          <Badge 
                            variant={sizeItem.stock === 0 ? "destructive" : sizeItem.stock < 5 ? "outline" : "secondary"}
                            className="text-xs"
                          >
                            {sizeItem.stock === 0 ? "Out" : sizeItem.stock < 5 ? "Low" : "Good"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            value={sizeItem.stock}
                            onChange={(e) => handleVariantStockUpdate(variantIndex, sizeIndex, e.target.value)}
                            className="w-20 h-8 text-sm text-center"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSize(variantIndex, sizeIndex)}
                            className="p-1 h-8 w-8 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Variant Action Buttons - Moved to end */}
                  <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Bulk Update:</label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Set all"
                        className="w-24 h-8 text-xs"
                        onBlur={(e) => {
                          if (e.target.value) {
                            handleBulkStockUpdate(variantIndex, e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                      <span className="text-xs text-gray-500">units</span>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveVariant(variantIndex)}
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
