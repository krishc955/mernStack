import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import AboutUs from "./pages/about/index.jsx";
import Contact from "./pages/contact/index.jsx";
import FAQ from "./pages/faq/index.jsx";
import ShippingInfo from "./pages/shipping-info/index.jsx";
import Returns from "./pages/returns/index.jsx";
import SizeGuide from "./pages/size-guide/index.jsx";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  console.log(isLoading, user);

  return (
    <HelmetProvider>
      <div className="flex flex-col overflow-hidden bg-white no-horizontal-scroll container-safe">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        
        {/* Public Pages - With Shopping Layout (Header & Footer) */}
        <Route path="/about" element={<ShoppingLayout />}>
          <Route index element={<AboutUs />} />
        </Route>
        <Route path="/contact" element={<ShoppingLayout />}>
          <Route index element={<Contact />} />
        </Route>
        <Route path="/faq" element={<ShoppingLayout />}>
          <Route index element={<FAQ />} />
        </Route>
        <Route path="/shipping" element={<ShoppingLayout />}>
          <Route index element={<ShippingInfo />} />
        </Route>
        <Route path="/returns" element={<ShoppingLayout />}>
          <Route index element={<Returns />} />
        </Route>
        <Route path="/size-guide" element={<ShoppingLayout />}>
          <Route index element={<SizeGuide />} />
        </Route>
        
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </HelmetProvider>
  );
}

export default App;
