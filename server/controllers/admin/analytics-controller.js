const Order = require("../../models/Order");
const Product = require("../../models/Product");

// Get sales analytics data
const getSalesAnalytics = async (req, res) => {
  try {
    const { period = 12 } = req.query; // Default to 12 months
    
    // Calculate date range
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - period, 1);
    
    // Get all orders in the date range
    const orders = await Order.find({
      orderDate: { $gte: startDate },
      orderStatus: { $in: ['delivered', 'confirmed'] }
    }).populate('cartItems.productId');

    // Get all products for category analysis
    const products = await Product.find({});

    // Initialize monthly data structure
    const monthlyData = {};
    for (let i = period - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      monthlyData[monthKey] = {
        month: monthName,
        revenue: 0,
        orders: 0,
        customers: new Set() // Use Set to track unique customers
      };
    }

    // Aggregate data
    let totalRevenue = 0;
    let totalOrders = 0;
    const categoryRevenue = {};
    const productSales = {};
    const allCustomers = new Set();

    orders.forEach(order => {
      const orderDate = new Date(order.orderDate);
      const monthKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
      
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].revenue += order.totalAmount;
        monthlyData[monthKey].orders += 1;
        monthlyData[monthKey].customers.add(order.userId.toString());
      }

      totalRevenue += order.totalAmount;
      totalOrders += 1;
      allCustomers.add(order.userId.toString());

      // Process cart items for detailed analysis
      order.cartItems?.forEach(item => {
        const product = products.find(p => p._id.toString() === item.productId.toString());
        if (product) {
          // Category breakdown
          if (!categoryRevenue[product.category]) {
            categoryRevenue[product.category] = 0;
          }
          categoryRevenue[product.category] += item.price * item.quantity;

          // Product sales tracking
          if (!productSales[product._id]) {
            productSales[product._id] = {
              product: product,
              totalSold: 0,
              revenue: 0
            };
          }
          productSales[product._id].totalSold += item.quantity;
          productSales[product._id].revenue += item.price * item.quantity;
        }
      });
    });

    // Convert monthly data (replace Set with count for JSON serialization)
    const monthlySales = Object.values(monthlyData).map(month => ({
      ...month,
      customers: month.customers.size
    }));

    // Category breakdown
    const categoryBreakdown = Object.entries(categoryRevenue).map(([category, revenue]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      revenue,
      percentage: totalRevenue > 0 ? ((revenue / totalRevenue) * 100).toFixed(1) : '0'
    })).sort((a, b) => b.revenue - a.revenue);

    // Top products
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)
      .map(item => ({
        name: item.product.title,
        revenue: item.revenue,
        unitsSold: item.totalSold,
        category: item.product.category
      }));

    // Calculate growth metrics
    const currentMonth = monthlySales[monthlySales.length - 1];
    const lastMonth = monthlySales[monthlySales.length - 2];
    const revenueGrowth = lastMonth && lastMonth.revenue > 0 
      ? ((currentMonth.revenue - lastMonth.revenue) / lastMonth.revenue * 100).toFixed(1)
      : 0;

    const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;

    res.status(200).json({
      success: true,
      data: {
        monthlySales,
        categoryBreakdown,
        topProducts,
        revenueMetrics: {
          totalRevenue,
          totalOrders,
          totalCustomers: allCustomers.size,
          averageOrderValue: parseFloat(averageOrderValue.toFixed(2)),
          revenueGrowth: parseFloat(revenueGrowth),
          currentMonthRevenue: currentMonth?.revenue || 0,
          lastMonthRevenue: lastMonth?.revenue || 0
        }
      }
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching analytics data",
      error: error.message
    });
  }
};

// Get dashboard summary stats
const getDashboardStats = async (req, res) => {
  try {
    // Get counts for quick stats
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'delivered' });
    
    // Get revenue for current month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthOrders = await Order.find({
      orderDate: { $gte: startOfMonth },
      orderStatus: { $in: ['delivered', 'confirmed'] }
    });
    
    const currentMonthRevenue = currentMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Low stock products (stock < 10)
    const lowStockProducts = await Product.find({
      $or: [
        { totalStock: { $lt: 10 } },
        { 'variants.sizes.stock': { $lt: 10 } }
      ]
    }).limit(5);

    // Recent orders
    const recentOrders = await Order.find({})
      .sort({ orderDate: -1 })
      .limit(5)
      .populate('userId', 'userName email');

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalProducts,
          totalOrders,
          pendingOrders,
          deliveredOrders,
          currentMonthRevenue
        },
        lowStockProducts,
        recentOrders
      }
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard stats",
      error: error.message
    });
  }
};

module.exports = {
  getSalesAnalytics,
  getDashboardStats
};
