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
  Download,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { fetchSalesAnalytics, fetchDashboardStats } from "../../store/admin/analytics-slice";

// Chart color palette
const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

// Sample data for fallback
const sampleData = {
  monthlyRevenue: [
    { month: 'Jan', revenue: 45000, orders: 150 },
    { month: 'Feb', revenue: 52000, orders: 180 },
    { month: 'Mar', revenue: 48000, orders: 165 },
    { month: 'Apr', revenue: 61000, orders: 210 },
    { month: 'May', revenue: 55000, orders: 190 },
    { month: 'Jun', revenue: 67000, orders: 230 },
  ],
  categoryBreakdown: [
    { category: 'Electronics', revenue: 85000, percentage: 35 },
    { category: 'Clothing', revenue: 62000, percentage: 25 },
    { category: 'Home & Garden', revenue: 48000, percentage: 20 },
    { category: 'Sports', revenue: 25000, percentage: 10 },
    { category: 'Books', revenue: 12000, percentage: 5 },
    { category: 'Others', revenue: 8000, percentage: 5 },
  ],
  topProducts: [
    { name: 'Wireless Headphones', sales: 145, revenue: 14500 },
    { name: 'Smart Watch', sales: 98, revenue: 24500 },
    { name: 'Laptop Stand', sales: 87, revenue: 8700 },
    { name: 'USB Cable', sales: 156, revenue: 3120 },
    { name: 'Phone Case', sales: 203, revenue: 6090 },
  ],
  dailySales: [
    { day: 'Mon', sales: 12000 },
    { day: 'Tue', sales: 19000 },
    { day: 'Wed', sales: 15000 },
    { day: 'Thu', sales: 22000 },
    { day: 'Fri', sales: 25000 },
    { day: 'Sat', sales: 18000 },
    { day: 'Sun', sales: 14000 },
  ]
};

function SalesAnalyticsDashboard() {
  const dispatch = useDispatch();
  const { 
    analyticsData, 
    dashboardStats, 
    isLoading, 
    error 
  } = useSelector(state => state.adminAnalytics);
  
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');

  useEffect(() => {
    dispatch(fetchSalesAnalytics());
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchSalesAnalytics());
    dispatch(fetchDashboardStats());
  };

  // Use real data if available, otherwise fallback to sample data
  // Force sample data for testing while debugging
  const displayData = {
    monthlyRevenue: analyticsData?.monthlySales || analyticsData?.monthlyRevenue || sampleData.monthlyRevenue,
    categoryBreakdown: sampleData.categoryBreakdown, // Force sample data for now
    topProducts: (analyticsData?.topProducts && analyticsData.topProducts.length > 0)
      ? analyticsData.topProducts 
      : sampleData.topProducts,
    dailySales: analyticsData?.dailySales || sampleData.dailySales
  };

  // Debug: Log the actual data to see what we're receiving
  console.log('Analytics Data:', analyticsData);
  console.log('Category Breakdown:', displayData.categoryBreakdown);
  console.log('Sample Category Data:', sampleData.categoryBreakdown);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate growth percentage
  const calculateGrowth = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading analytics...</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
          <p className="text-gray-600 mt-1">Track your business performance and insights</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700">Failed to load analytics data. Showing sample data.</span>
        </div>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardStats?.totalRevenue || 328000)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    +{calculateGrowth(328000, 285000)}% from last month
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats?.totalOrders || 1235}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    +{calculateGrowth(1235, 1089)}% from last month
                  </span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats?.totalProducts || 456}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    +{calculateGrowth(456, 423)}% from last month
                  </span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats?.totalUsers || 8765}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    +{calculateGrowth(8765, 8234)}% from last month
                  </span>
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Revenue Trend (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={displayData.monthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value, name) => [formatCurrency(value), name]}
                labelFormatter={(label) => `Month: ${label}`}
              />
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
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Data entries: {displayData.categoryBreakdown ? displayData.categoryBreakdown.length : 0}
              </p>
            </div>
            {displayData.categoryBreakdown && displayData.categoryBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={displayData.categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({category, percentage}) => `${category} (${percentage}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="revenue"
                  >
                    {displayData.categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Category Data</h4>
                <p className="text-gray-500 mb-4">Category breakdown will appear when you have sales data</p>
                <p className="text-sm text-gray-400">Debug: Check console for data structure</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2" />
              Daily Sales (This Week)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={displayData.dailySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Sales']}
                  labelFormatter={(label) => `Day: ${label}`}
                />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Top Performing Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Product Name</th>
                  <th scope="col" className="px-6 py-3">Sales Count</th>
                  <th scope="col" className="px-6 py-3">Revenue</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayData.topProducts.map((product, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4">
                      {product.sales}
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(product.revenue)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={index < 3 ? "default" : "secondary"}>
                        {index < 3 ? "Top Seller" : "Good"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Orders Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Orders vs Revenue Correlation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={displayData.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" tickFormatter={formatCurrency} />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? formatCurrency(value) : value, 
                  name === 'revenue' ? 'Revenue' : 'Orders'
                ]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Revenue"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="orders" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default SalesAnalyticsDashboard;
