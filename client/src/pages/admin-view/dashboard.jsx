import ProductImageUpload from "@/components/admin-view/image-upload";
import SalesAnalyticsDashboard from "@/components/admin-view/sales-analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XIcon, BarChart3, Image, ShoppingCart, Package } from "lucide-react";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  function handleDeleteFeatureImage(imageId) {
    // Add confirmation for safety
    if (window.confirm("Are you sure you want to delete this image?")) {
      dispatch(deleteFeatureImage(imageId)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getFeatureImages());
        } else {
          console.error("Failed to delete image:", data?.payload?.message);
          // Still refresh the list in case the database record was deleted
          dispatch(getFeatureImages());
        }
      }).catch((error) => {
        console.error("Delete error:", error);
        // Refresh the list anyway to sync with server state
        dispatch(getFeatureImages());
      });
    }
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-1">Manage orders, view analytics, products, and banners</p>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="banners" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Banners
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order Management
              </CardTitle>
              <p className="text-sm text-gray-600">
                View and manage all customer orders, track shipments, and update order status
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <ShoppingCart className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Pending Orders</p>
                      <p className="text-2xl font-bold text-blue-900">24</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600 font-medium">Shipped Orders</p>
                      <p className="text-2xl font-bold text-green-900">142</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Total Revenue</p>
                      <p className="text-2xl font-bold text-purple-900">₹2.4L</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center py-8">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Order Management System</h4>
                <p className="text-gray-500 mb-4">View, track, and manage all customer orders from here</p>
                <Button variant="outline">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View All Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard/Analytics Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <SalesAnalyticsDashboard />
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Management
              </CardTitle>
              <p className="text-sm text-gray-600">
                Manage your product catalog, inventory, and pricing
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <Package className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-orange-600 font-medium">Total Products</p>
                      <p className="text-2xl font-bold text-orange-900">456</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <XIcon className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-red-600 font-medium">Out of Stock</p>
                      <p className="text-2xl font-bold text-red-900">12</p>
                    </div>
                  </div>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-teal-100 p-2 rounded-full">
                      <BarChart3 className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-teal-600 font-medium">Categories</p>
                      <p className="text-2xl font-bold text-teal-900">8</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center py-8">
                <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Product Catalog Management</h4>
                <p className="text-gray-500 mb-4">Add, edit, and manage your product inventory</p>
                <Button variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Manage Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feature Banners Tab */}
        <TabsContent value="banners" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Homepage Feature Banners Management
              </CardTitle>
              <p className="text-sm text-gray-600">
                Upload and manage promotional banners displayed on your homepage
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Section */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-4">Upload New Banner</h4>
                <ProductImageUpload
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  uploadedImageUrl={uploadedImageUrl}
                  setUploadedImageUrl={setUploadedImageUrl}
                  setImageLoadingState={setImageLoadingState}
                  imageLoadingState={imageLoadingState}
                  isCustomStyling={true}
                />
                <Button 
                  onClick={handleUploadFeatureImage} 
                  className="w-full mt-4"
                  disabled={!uploadedImageUrl}
                >
                  Upload Banner
                </Button>
              </div>
              
              {/* Existing Banners */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Current Feature Banners</h3>
                  <span className="text-sm text-gray-500">
                    {featureImageList?.length || 0} banner(s)
                  </span>
                </div>
                {featureImageList && featureImageList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featureImageList.map((featureImgItem) => (
                      <div key={featureImgItem._id} className="relative group border rounded-lg overflow-hidden">
                        <img
                          src={featureImgItem.image}
                          className="w-full h-[180px] object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        {/* Fallback for broken images */}
                        <div 
                          className="w-full h-[180px] bg-gray-200 flex items-center justify-center text-gray-500"
                          style={{ display: 'none' }}
                        >
                          <div className="text-center p-4">
                            <Image className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Image not available</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                          >
                            <XIcon className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <Image className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No banners uploaded</h4>
                    <p className="text-gray-500 mb-4">Get started by uploading your first promotional banner</p>
                    <p className="text-sm text-gray-400">Banners will be displayed on your homepage carousel</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;
