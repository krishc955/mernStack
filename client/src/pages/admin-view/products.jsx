import MultipleImageUpload from "@/components/admin-view/multiple-image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import ProductVariants from "@/components/admin-view/product-variants";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  images: [], // Only multiple images field
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  averageReview: 0,
  variants: [], // New field for color/size variants
  availableSizes: [],
  availableColors: []
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // Multiple images state
  const [imageFiles, setImageFiles] = useState([]); // Multiple files state
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [sortBy, setSortBy] = useState("name-asc"); // New sort state
  const [variants, setVariants] = useState([]); // New state for variants

  const { productList, isLoading } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    console.log("📤 Submitting form with variants:", variants);
    console.log("📤 Current edit mode:", currentEditedId !== null ? 'EDIT' : 'ADD');

    // Calculate total stock from variants
    const totalStockFromVariants = variants.reduce((total, variant) => {
      return total + variant.sizes.reduce((variantTotal, size) => variantTotal + size.stock, 0);
    }, 0);

    // Extract available colors and sizes from variants
    const availableColors = [...new Set(variants.map(v => v.color))];
    const availableSizes = [...new Set(variants.flatMap(v => v.sizes.map(s => s.size)))];

    console.log("📤 Calculated total stock:", totalStockFromVariants);
    console.log("📤 Available colors:", availableColors);
    console.log("📤 Available sizes:", availableSizes);
    const submitData = {
      ...formData,
      image: uploadedImageUrls[0] || "", // First image as primary image for backward compatibility
      images: uploadedImageUrls,
      variants: variants,
      availableColors: availableColors,
      availableSizes: availableSizes,
      totalStock: totalStockFromVariants // Use calculated stock from variants
    };

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData: submitData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            resetImageStates();
            toast({
              title: "Product updated successfully",
            });
          }
        })
      : dispatch(
          addNewProduct(submitData)
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setFormData(initialFormData);
            resetImageStates();
            toast({
              title: "Product added successfully",
            });
          }
        });
  }

  function resetImageStates() {
    setUploadedImageUrls([]);
    setImageFiles([]);
    setVariants([]); // Reset variants too
  }

  function populateEditData(product) {
    console.log("🔧 Populating edit data for product:", product._id);
    console.log("🔧 Product variants found:", product.variants);
    
    setFormData(product);
    setCurrentEditedId(product._id);
    
    // Handle existing images - prioritize images array, fallback to single image
    if (product.images && product.images.length > 0) {
      setUploadedImageUrls(product.images);
    } else if (product.image) {
      setUploadedImageUrls([product.image]);
    }
    
    // Handle existing variants
    if (product.variants && product.variants.length > 0) {
      console.log("🔧 Setting variants to:", product.variants);
      setVariants(product.variants);
    } else {
      console.log("🔧 No variants found, setting empty array");
      setVariants([]);
    }
    
    setOpenCreateProductsDialog(true);
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    const hasImages = uploadedImageUrls.length > 0;
      
    const hasValidFields = Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview" && currentKey !== "images")
      .map((key) => formData[key] !== "")
      .every((item) => item);
      
    return hasValidFields && hasImages;
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Sorting function
  const getSortedProducts = () => {
    if (!productList || productList.length === 0) return [];
    
    const sorted = [...productList].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "name-desc":
          return (b.title || "").localeCompare(a.title || "");
        case "price-low":
          return (a.salePrice || a.price || 0) - (b.salePrice || b.price || 0);
        case "price-high":
          return (b.salePrice || b.price || 0) - (a.salePrice || a.price || 0);
        case "stock-low":
          return (a.totalStock || 0) - (b.totalStock || 0);
        case "stock-high":
          return (b.totalStock || 0) - (a.totalStock || 0);
        case "recent":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        default:
          return 0;
      }
    });
    
    return sorted;
  };

  const sortedProducts = getSortedProducts();

  console.log("Products state:", { productList, isLoading });
  console.log("Individual products:", productList);

  return (
    <Fragment>
      {/* Enhanced Header Section */}
      <div className="mb-6 sm:mb-8 w-full">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Product Management</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage your product catalog with ease</p>
          </div>
          <Button 
            onClick={() => setOpenCreateProductsDialog(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
          >
            <span className="mr-2">+</span>
            Add New Product
          </Button>
        </div>

        {/* Stats Overview */}
        {productList && productList.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="ml-2 sm:ml-3 min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Products</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{productList.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-2 sm:ml-3 min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">In Stock</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {productList.filter(p => (p.totalStock || 0) > 0).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-2 sm:ml-3 min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Low Stock</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {productList.filter(p => (p.totalStock || 0) <= 10 && (p.totalStock || 0) > 0).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="ml-2 sm:ml-3 min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Out of Stock</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {productList.filter(p => (p.totalStock || 0) === 0).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Products Grid Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Products ({productList?.length || 0})</h2>
          
          {/* Sort Options */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hidden sm:inline">Sort by:</span>
            <select 
              className="border border-gray-300 rounded px-2 sm:px-3 py-1 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-low">Price Low-High</option>
              <option value="price-high">Price High-Low</option>
              <option value="stock-low">Stock Low-High</option>
              <option value="stock-high">Stock High-Low</option>
              <option value="recent">Recently Added</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
        
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-12 sm:py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500 text-base sm:text-lg">Loading products...</p>
              </div>
            </div>
          ) : sortedProducts && sortedProducts.length > 0 ? (
            sortedProducts.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
                populateEditData={populateEditData}
              />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-12 sm:py-20">
              <div className="text-center max-w-md px-4">
                <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-sm sm:text-base text-gray-500 mb-6">Get started by adding your first product to the catalog</p>
                <Button 
                  onClick={() => setOpenCreateProductsDialog(true)}
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                >
                  Add Your First Product
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add/Edit Product Dialog */}
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            setFormData(initialFormData);
            resetImageStates();
          }
        }}
      >
        <SheetContent side="right" className="w-full max-w-full h-screen overflow-auto p-0 sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw]">
          <div className="p-3 sm:p-4 md:p-6 h-full">
            <SheetHeader className="mb-4 sm:mb-6 sticky top-0 bg-white z-10 pb-3 border-b">
              <SheetTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                {currentEditedId !== null ? "Edit Product" : "Add New Product"}
              </SheetTitle>
              <SheetDescription className="text-sm text-gray-600">
                {currentEditedId !== null 
                  ? "Update product details, images, and variants" 
                  : "Add a new product with images and variants to your store"
                }
              </SheetDescription>
            </SheetHeader>
            
            {/* Multiple Image Upload */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Product Images</h3>
              <MultipleImageUpload
                imageFiles={imageFiles}
                setImageFiles={setImageFiles}
                uploadedImageUrls={uploadedImageUrls}
                setUploadedImageUrls={setUploadedImageUrls}
                imageLoadingState={imageLoadingState}
                setImageLoadingState={setImageLoadingState}
                maxImages={5}
              />
            </div>

            {/* Product Form */}
            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Basic Product Information */}
                <div className="lg:col-span-2">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CommonForm
                      formData={formData}
                      setFormData={setFormData}
                      formControls={addProductFormElements}
                      hideButton={true} // Hide the button from CommonForm
                    />
                  </div>
                </div>
                
                {/* Inventory Management - Full width for better visibility */}
                <div className="lg:col-span-2 border-t pt-4 sm:pt-6">
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Inventory Management</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Manage stock levels by adding color and size variants. Total stock is automatically calculated from all variants.
                    </p>
                  </div>
                  
                  {/* Variants section with better spacing */}
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                    <ProductVariants
                      variants={variants}
                      onVariantsChange={setVariants}
                    />
                  </div>
                </div>
                
                {/* Submit Button - Sticky at bottom for mobile */}
                <div className="lg:col-span-2 border-t pt-4 sm:pt-6 sticky bottom-0 bg-white z-10 mt-auto">
                  <Button 
                    type="submit"
                    disabled={!isFormValid()} 
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    {currentEditedId !== null ? "Update Product" : "Add Product"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
