import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Suspense, lazy } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import CheckAuth from "./components/common/check-auth";
import SafariAuthHandler from "./components/auth/SafariAuthHandler";

// Lazy load components for better performance
const AuthLayout = lazy(() => import("./components/auth/layout"));
const AuthLogin = lazy(() => import("./pages/auth/login"));
const AuthRegister = lazy(() => import("./pages/auth/register"));
const AdminLayout = lazy(() => import("./components/admin-view/layout"));
const AdminDashboard = lazy(() => import("./pages/admin-view/dashboard"));
const AdminProducts = lazy(() => import("./pages/admin-view/products"));
const AdminOrders = lazy(() => import("./pages/admin-view/orders"));
const AdminFeatures = lazy(() => import("./pages/admin-view/features"));
const AdminVideos = lazy(() => import("./pages/admin-view/videos"));
const ShoppingLayout = lazy(() => import("./components/shopping-view/layout"));
const ShoppingHome = lazy(() => import("./pages/shopping-view/home"));
const ShoppingListing = lazy(() => import("./pages/shopping-view/listing"));
const ShoppingCheckout = lazy(() => import("./pages/shopping-view/checkout"));
const ShoppingAccount = lazy(() => import("./pages/shopping-view/account"));
const PaypalReturnPage = lazy(() => import("./pages/shopping-view/paypal-return"));
const PaymentSuccessPage = lazy(() => import("./pages/shopping-view/payment-success"));
const SearchProducts = lazy(() => import("./pages/shopping-view/search"));
const AboutUs = lazy(() => import("./pages/about/index.jsx"));
const Contact = lazy(() => import("./pages/contact/index.jsx"));
const FAQ = lazy(() => import("./pages/faq/index.jsx"));
const ShippingInfo = lazy(() => import("./pages/shipping-info/index.jsx"));
const Returns = lazy(() => import("./pages/returns/index.jsx"));
const SizeGuide = lazy(() => import("./pages/size-guide/index.jsx"));
const SocialMedia = lazy(() => import("./pages/social-media/index.jsx"));
const NotFound = lazy(() => import("./pages/not-found"));
const UnauthPage = lazy(() => import("./pages/unauth-page"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-beige-50 to-beige-100">
    <div className="text-center space-y-4">
      <Skeleton className="w-20 h-20 rounded-full mx-auto bg-beige-200" />
      <Skeleton className="w-32 h-4 mx-auto bg-beige-200" />
      <p className="text-brown-600 text-sm">Loading...</p>
    </div>
  </div>
);

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <PageLoader />;

  console.log(isLoading, user);

  return (
    <HelmetProvider>
      <SafariAuthHandler />
      <div className="flex flex-col overflow-hidden bg-white no-horizontal-scroll container-safe">
      <Suspense fallback={<PageLoader />}>
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
          <Route path="videos" element={<AdminVideos />} />
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
        <Route path="/social-media" element={<ShoppingLayout />}>
          <Route index element={<SocialMedia />} />
        </Route>
        
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      </div>
    </HelmetProvider>
  );
}

export default App;
