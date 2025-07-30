import ProductFilter from "@/components/shopping-view/filter";
import SEOHead from "@/components/common/seo-head";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDown, Filter } from "../../../components/icons/lightweight-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const { toast } = useToast();

  const categorySearchParam = searchParams.get("category");

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    if (!user?.id) {
      toast({
        title: "Please login to add items to cart",
        action: (
          <Button
            onClick={() => navigate("/auth/login")}
            variant="outline"
            size="sm"
          >
            Login
          </Button>
        ),
      });
      return;
    }

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 p-3 sm:p-4 md:p-6"
      style={{ backgroundColor: '#faf8f2' }} // Match the brown-beige theme
    >
      <SEOHead 
        title={`${filters?.category && Array.isArray(filters.category) && filters.category.length > 0 ? filters.category[0].charAt(0).toUpperCase() + filters.category[0].slice(1) + ' Products - ' : ''}Shop Premium Products at Vinora | Best Online Store India`}
        description={`Discover ${filters?.category && Array.isArray(filters.category) && filters.category.length > 0 ? filters.category[0] + ' ' : ''}premium products at Vinora. Shop quality ${filters?.category && Array.isArray(filters.category) && filters.category.length > 0 ? filters.category[0] : 'items'} with fast delivery, secure payments & authentic brands. Free shipping across India.`}
        keywords={`Vinora ${filters?.category && Array.isArray(filters.category) && filters.category.length > 0 ? filters.category[0] : 'products'}, online shopping India, ${filters?.category && Array.isArray(filters.category) && filters.category.length > 0 ? filters.category[0] : 'premium products'}, buy ${filters?.category && Array.isArray(filters.category) && filters.category.length > 0 ? filters.category[0] : 'products'} online, ecommerce store, quality products, secure shopping`}
        canonicalUrl={`https://vinora.royalappleshimla.com/shop/listing${filters?.category && Array.isArray(filters.category) && filters.category.length > 0 ? '?category=' + filters.category[0] : ''}`}
        ogImage="https://vinora.royalappleshimla.com/vinora-logo.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${filters?.category && Array.isArray(filters.category) && filters.category.length > 0 ? filters.category[0].charAt(0).toUpperCase() + filters.category[0].slice(1) + ' ' : ''}Products - Vinora`,
          "description": `Browse ${filters?.category && Array.isArray(filters.category) && filters.category.length > 0 ? filters.category[0] + ' ' : ''}products at Vinora, India's trusted online store`,
          "url": `https://vinora.royalappleshimla.com/shop/listing${filters?.category && Array.isArray(filters.category) && filters.category.length > 0 ? '?category=' + filters.category[0] : ''}`,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": productList?.length || 0,
            "itemListElement": productList?.slice(0, 10).map((product, index) => ({
              "@type": "Product",
              "position": index + 1,
              "name": product.title,
              "description": product.description,
              "image": product.image,
              "offers": {
                "@type": "Offer",
                "price": product.salePrice > 0 ? product.salePrice : product.price,
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
              },
              "brand": {
                "@type": "Brand",
                "name": "Vinora"
              }
            })) || []
          }
        }}
      />
      <div className="bg-background w-full rounded-lg shadow-sm">
        {/* Mobile-first responsive header */}
        <div className="p-3 sm:p-4 border-b">
          {/* Mobile Layout - Stack vertically */}
          <div className="block sm:hidden space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-gray-900">All Products</h2>
              <span className="text-sm text-muted-foreground">
                {productList?.length} Items
              </span>
            </div>
            
            {/* Filter and Sort buttons row for mobile */}
            <div className="flex items-center gap-2 w-full">
              <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 hover:text-amber-900 py-2"
                  >
                    <Filter className="h-4 w-4" />
                    <span className="text-sm">Filters</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-amber-800">
                      <Filter className="h-5 w-5" />
                      Filter Products
                    </DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[500px] overflow-y-auto">
                    <ProductFilter filters={filters} handleFilter={handleFilter} />
                  </div>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-1 py-2"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span className="text-sm">Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Desktop Layout - Single row */}
          <div className="hidden sm:flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-gray-900">All Products</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">
                {productList?.length} Products
              </span>
              
              {/* Filter Button */}
              <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-amber-800">
                      <Filter className="h-5 w-5" />
                      Filter Products
                    </DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[500px] overflow-y-auto">
                    <ProductFilter filters={filters} handleFilter={handleFilter} />
                  </div>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        {/* Responsive Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
