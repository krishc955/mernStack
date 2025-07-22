const mongoose = require("mongoose");

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
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
