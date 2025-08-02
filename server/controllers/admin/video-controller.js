const Video = require("../../models/Video");

// Get all videos (admin)
const getAllVideos = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      platform, 
      category, 
      isActive,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    if (platform && platform !== 'all') filter.platform = platform;
    if (category && category !== 'all') filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const videos = await Video.find(filter)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const totalVideos = await Video.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: videos,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVideos / limit),
        totalVideos,
        hasNext: page < Math.ceil(totalVideos / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching videos",
      error: error.message,
    });
  }
};

// Get active videos for frontend
const getActiveVideos = async (req, res) => {
  try {
    const { 
      platform, 
      category, 
      limit = 10,
      featured = false 
    } = req.query;

    const filter = { isActive: true };
    if (platform && platform !== 'all') filter.platform = platform;
    if (category && category !== 'all') filter.category = category;

    const videos = await Video.find(filter)
      .select('-addedBy -__v')
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(parseInt(limit))
      .exec();

    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error("Error fetching active videos:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching videos",
      error: error.message,
    });
  }
};

// Add new video
const addVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      videoUrl,
      embedCode,
      platform,
      thumbnail,
      category,
      tags,
      displayOrder,
      isActive
    } = req.body;

    // Validate that we have embedCode (primary) or videoUrl (optional)
    if (!embedCode && !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "embedCode is required for video display",
      });
    }

    // Basic validation for embedCode if provided
    if (embedCode && typeof embedCode !== 'string') {
      return res.status(400).json({
        success: false,
        message: "embedCode must be a valid string",
      });
    }

    const newVideo = new Video({
      title,
      description,
      videoUrl,
      embedCode,
      platform: platform || 'facebook',
      thumbnail,
      category: category || 'fashion',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true,
      addedBy: null, // Remove user requirement - like products
    });

    const savedVideo = await newVideo.save();
    // No need to populate addedBy since it's null

    res.status(201).json({
      success: true,
      message: "Video added successfully",
      data: savedVideo,
    });
  } catch (error) {
    console.error("Error adding video:", error);
    res.status(500).json({
      success: false,
      message: "Error adding video",
      error: error.message,
    });
  }
};

// Update video
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Process tags if provided
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Video updated successfully",
      data: updatedVideo,
    });
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({
      success: false,
      message: "Error updating video",
      error: error.message,
    });
  }
};

// Delete video
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting video",
      error: error.message,
    });
  }
};

// Toggle video active status
const toggleVideoStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    video.isActive = !video.isActive;
    await video.save();

    res.status(200).json({
      success: true,
      message: `Video ${video.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { isActive: video.isActive },
    });
  } catch (error) {
    console.error("Error toggling video status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating video status",
      error: error.message,
    });
  }
};

// Increment video views
const incrementViews = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      data: { views: video.views },
    });
  } catch (error) {
    console.error("Error incrementing views:", error);
    res.status(500).json({
      success: false,
      message: "Error updating views",
      error: error.message,
    });
  }
};

module.exports = {
  getAllVideos,
  getActiveVideos,
  addVideo,
  updateVideo,
  deleteVideo,
  toggleVideoStatus,
  incrementViews,
};
