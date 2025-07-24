const mongoose = require("mongoose");

const ProductVariantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true
  },
  colorCode: {
    type: String, // Hex color code for display
    required: false
  },
  sizes: [{
    size: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    }
  }]
});

const ProductSchema = new mongoose.Schema(
  {
    image: String, // Keep for backward compatibility
    images: [String], // New field for multiple images
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number, // Keep for backward compatibility
    averageReview: Number,
    // New variant system
    variants: [ProductVariantSchema],
    // Available sizes for this product (master list)
    availableSizes: [{
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40', '42']
    }],
    // Available colors for this product (master list)
    availableColors: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
