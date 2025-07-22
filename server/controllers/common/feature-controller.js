const Feature = require("../../models/Feature");
const cloudinary = require("cloudinary").v2;

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the feature image
    const featureImage = await Feature.findById(id);
    if (!featureImage) {
      return res.status(404).json({
        success: false,
        message: "Feature image not found",
      });
    }

    // Extract public_id from Cloudinary URL with improved logic
    const imageUrl = featureImage.image;
    let publicId;
    
    if (imageUrl && imageUrl.includes('cloudinary.com')) {
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

      console.log("Attempting to delete feature image with public_id:", publicId);
      console.log("Original URL:", imageUrl);
      
      // Delete from Cloudinary if public_id exists
      if (publicId) {
        const cloudinaryResult = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary delete result:", cloudinaryResult);
      }
    }

    // Always delete from database, even if Cloudinary deletion fails
    await Feature.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Feature image deleted successfully",
    });
  } catch (e) {
    console.log("Delete feature image error:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = { addFeatureImage, getFeatureImages, deleteFeatureImage };
