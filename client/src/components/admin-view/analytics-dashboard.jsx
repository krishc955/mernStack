import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  CalendarDays,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Eye,
  Download
} from "lucide-react";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import { fetchAllProducts } from "@/store/admin/products-slice";

// Color palette for charts
const CHART_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];

function AnalyticsDashboard() {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.adminOrder);
  const { productList } = useSelector((state) => state.adminProducts);
  const [selectedPeriod, setSelectedPeriod] = useState('12'); // Last 12 months
  const [analyticsData, setAnalyticsData] = useState({
    monthlySales: [],
    categoryBreakdown: [],
    revenueMetrics: {},
    topProducts: [],
    orderTrends: []
  });

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (orderList && orderList.length > 0 && productList && productList.length > 0) {
      generateAnalyticsData();
    }
  }, [orderList, productList, selectedPeriod]);

  const generateAnalyticsData = () => {
    const now = new Date();
    const monthsToShow = parseInt(selectedPeriod);
    
    // Generate monthly sales data
    const monthlySalesMap = {};
    const monthlyOrdersMap = {};
    
    // Initialize months
    for (let i = monthsToShow - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      monthlySalesMap[monthKey] = {
        month: monthName,
        revenue: 0,
        orders: 0,
        monthKey
      };
      monthlyOrdersMap[monthKey] = 0;
    }

    // Process orders
    let totalRevenue = 0;
    let totalOrders = 0;
    const categoryRevenue = {};
    const productSales = {};

    orderList.forEach(order => {
      if (order.orderStatus === 'delivered' || order.orderStatus === 'confirmed') {
        const orderDate = new Date(order.orderDate);
        const monthKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
        
        if (monthlySalesMap[monthKey]) {
          monthlySalesMap[monthKey].revenue += order.totalAmount;
          monthlySalesMap[monthKey].orders += 1;
        }

        totalRevenue += order.totalAmount;
        totalOrders += 1;

        // Process cart items for product and category analysis
        order.cartItems?.forEach(item => {
          // Find product details
          const product = productList.find(p => p._id === item.productId);
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
      }
    });

    // Convert to arrays for charts
    const monthlySales = Object.values(monthlySalesMap);
    
    const categoryBreakdown = Object.entries(categoryRevenue).map(([category, revenue]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      revenue,
      percentage: ((revenue / totalRevenue) * 100).toFixed(1)
    }));

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
    const currentMonthRevenue = monthlySales[monthlySales.length - 1]?.revenue || 0;
    const lastMonthRevenue = monthlySales[monthlySales.length - 2]?.revenue || 0;
    const revenueGrowth = lastMonthRevenue > 0 
      ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1)
      : 0;

    const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

    setAnalyticsData({
      monthlySales,
      categoryBreakdown,
      topProducts,
      revenueMetrics: {
        totalRevenue,
        totalOrders,
        averageOrderValue,
        revenueGrowth,
        currentMonthRevenue,
        lastMonthRevenue
      }
    });
  };

  const downloadReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      period: `Last ${selectedPeriod} months`,
      ...analyticsData
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `vinora-analytics-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' && entry.name.toLowerCase().includes('revenue') 
                ? formatCurrency(entry.value) 
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Sales performance and business insights</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-sm"
          >
            <option value="6">Last 6 months</option>
            <option value="12">Last 12 months</option>
            <option value="24">Last 24 months</option>
          </select>
          
          <Button
            onClick={downloadReport}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(analyticsData.revenueMetrics.totalRevenue || 0)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              {analyticsData.revenueMetrics.revenueGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={analyticsData.revenueMetrics.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'}>
                {analyticsData.revenueMetrics.revenueGrowth}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.revenueMetrics.totalOrders || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Completed orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(analyticsData.revenueMetrics.averageOrderValue || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Per order average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {productList?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active products
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData.monthlySales}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    name="Revenue"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({category, percentage}) => `${category} (${percentage}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="revenue"
                  >
                    {analyticsData.categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Monthly Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Top Performing Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Product</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-right p-2">Units Sold</th>
                  <th className="text-right p-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.topProducts.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="font-medium">{product.name}</div>
                    </td>
                    <td className="p-2">
                      <Badge variant="outline">{product.category}</Badge>
                    </td>
                    <td className="p-2 text-right">{product.unitsSold}</td>
                    <td className="p-2 text-right font-medium">
                      {formatCurrency(product.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalyticsDashboard;
