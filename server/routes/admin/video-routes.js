const express = require("express");
const {
  getAllVideos,
  getActiveVideos,
  addVideo,
  updateVideo,
  deleteVideo,
  toggleVideoStatus,
  incrementViews,
} = require("../../controllers/admin/video-controller");

const router = express.Router();

// Admin routes (no auth required - same as products)
router.get("/admin/videos", getAllVideos);
router.post("/admin/videos/add", addVideo);
router.put("/admin/videos/update/:id", updateVideo);
router.delete("/admin/videos/delete/:id", deleteVideo);
router.patch("/admin/videos/toggle-status/:id", toggleVideoStatus);

// Public routes (for frontend)
router.get("/videos", getActiveVideos);
router.patch("/videos/views/:id", incrementViews);

module.exports = router;
