const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
const cloudinary = require("cloudinary").v2;

const handleImageUpload = async (req, res) => {
  try {
    console.log("Image upload attempt:", {
      hasFile: !!req.file,
      userAgent: req.headers['user-agent']?.includes('Mobile') ? 'Mobile' : 'Desktop',
      contentType: req.headers['content-type']
    });
    
    if (!req.file) {
      return res.json({
        success: false,
        message: "No file uploaded. Please make sure to select an image file.",
      });
    }

    // Validate file type
    if (!req.file.mimetype.startsWith('image/')) {
      return res.json({
        success: false,
        message: "Invalid file type. Please upload an image file (JPG, PNG, WebP).",
      });
    }

    // Validate file size (additional check)
    if (req.file.size > 10 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "File too large. Please upload an image smaller than 10MB.",
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    
    console.log("Attempting Cloudinary upload...", {
      fileSize: req.file.size,
      mimeType: req.file.mimetype
    });
    
    const result = await imageUploadUtil(url);
    
    console.log("Cloudinary upload success:", result.secure_url);
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log("Image upload error:", {
      message: error.message,
      stack: error.stack,
      userAgent: req.headers['user-agent']
    });
    
    let errorMessage = "Error occurred during image upload.";
    
    if (error.message.includes('File too large')) {
      errorMessage = "File is too large. Please upload an image smaller than 10MB.";
    } else if (error.message.includes('Only image files')) {
      errorMessage = "Only image files are allowed. Please select a JPG, PNG, or WebP file.";
    } else if (error.message.includes('Invalid image file')) {
      errorMessage = "Invalid image file. Please try a different image.";
    }
    
    res.json({
      success: false,
      message: errorMessage,
    });
  }
};

// Delete image from Cloudinary
const handleImageDelete = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.json({
        success: false,
        message: "Image URL is required",
      });
    }

    // Extract public_id from Cloudinary URL with improved logic
    let publicId;
    
    if (imageUrl.includes('cloudinary.com')) {
      // Standard Cloudinary URL format
      const urlParts = imageUrl.split('/');
      const uploadIndex = urlParts.findIndex(part => part === 'upload');
      
      if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
        // Get everything after /upload/v{version}/
        const pathParts = urlParts.slice(uploadIndex + 2);
        const fullPath = pathParts.join('/');
        // Remove file extension
        publicId = fullPath.replace(/\.[^/.]+$/, "");
      } else {
        // Fallback: get filename without extension
        const fileName = urlParts[urlParts.length - 1];
        publicId = fileName.split('.')[0];
      }
    } else {
      return res.json({
        success: false,
        message: "Invalid Cloudinary URL format",
      });
    }

    console.log("Attempting to delete image with public_id:", publicId);
    console.log("Original URL:", imageUrl);
    
    if (!publicId) {
      return res.json({
        success: false,
        message: "Could not extract public_id from URL",
      });
    }
    
    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    
    console.log("Cloudinary delete result:", result);
    
    if (result.result === 'ok' || result.result === 'not found') {
      res.json({
        success: true,
        message: "Image deleted successfully",
        result,
      });
    } else {
      res.json({
        success: false,
        message: "Failed to delete image from Cloudinary",
        result,
      });
    }
    
  } catch (error) {
    console.log("Image delete error:", error);
    res.json({
      success: false,
      message: "Error occurred during image deletion: " + error.message,
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      images, // New field for multiple images
      title,
      description,
      category,
      brand, // Now represents fabric
      fabric, // Additional fabric field
      stitchType, // New field for stitch type
      occasion, // New field for occasion
      price,
      salePrice,
      averageReview,
      variants, // New field for variants
      availableSizes, // New field for available sizes
      availableColors, // New field for available colors
    } = req.body;

    console.log(averageReview, "averageReview");

    // Calculate total stock from variants
    const calculatedTotalStock = variants && variants.length > 0
      ? variants.reduce((total, variant) => {
          return total + variant.sizes.reduce((variantTotal, size) => variantTotal + (size.stock || 0), 0);
        }, 0)
      : 0;

    const newlyCreatedProduct = new Product({
      image: image || (images && images[0]) || "", // Backward compatibility
      images: images || (image ? [image] : []), // Support both single and multiple
      title,
      description,
      category,
      brand, // Now represents fabric
      fabric: fabric || brand, // Additional fabric field
      stitchType: stitchType || "stitched", // Default to stitched
      occasion: occasion || "casual", // Default to casual
      price,
      salePrice,
      totalStock: calculatedTotalStock, // Use calculated stock from variants
      averageReview,
      variants: variants || [], // Support variants
      availableSizes: availableSizes || [],
      availableColors: availableColors || [],
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      images, // New field for multiple images
      title,
      description,
      category,
      brand, // Now represents fabric
      fabric, // Additional fabric field
      stitchType, // New field for stitch type
      occasion, // New field for occasion
      price,
      salePrice,
      averageReview,
      variants, // New field for variants
      availableSizes, // New field for available sizes
      availableColors, // New field for available colors
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.fabric = fabric || brand || findProduct.fabric;
    findProduct.stitchType = stitchType || findProduct.stitchType;
    findProduct.occasion = occasion || findProduct.occasion;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    
    // Handle both single and multiple images
    if (images && Array.isArray(images)) {
      findProduct.images = images;
      findProduct.image = images[0] || ""; // Keep first image for backward compatibility
    } else if (image) {
      findProduct.image = image;
      findProduct.images = [image]; // Convert single image to array
    }
    
    findProduct.averageReview = averageReview || findProduct.averageReview;
    
    // Handle variants and calculate total stock
    if (variants !== undefined) {
      findProduct.variants = variants;
      // Calculate total stock from variants
      findProduct.totalStock = variants.reduce((total, variant) => {
        return total + variant.sizes.reduce((variantTotal, size) => variantTotal + (size.stock || 0), 0);
      }, 0);
    }
    if (availableSizes !== undefined) {
      findProduct.availableSizes = availableSizes;
    }
    if (availableColors !== undefined) {
      findProduct.availableColors = availableColors;
    }

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  handleImageDelete,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
