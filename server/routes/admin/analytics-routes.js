const express = require("express");
const {
  getSalesAnalytics,
  getDashboardStats
} = require("../../controllers/admin/analytics-controller");

const router = express.Router();

// Get sales analytics data
router.get("/sales", getSalesAnalytics);

// Get dashboard summary stats
router.get("/dashboard-stats", getDashboardStats);

module.exports = router;
