import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from '@/components/common/loading-spinner';

// Lazy load heavy components
const AdminLayout = lazy(() => import('@/components/admin-view/layout'));
const AdminDashboard = lazy(() => import('@/pages/admin-view/dashboard'));
const AdminProducts = lazy(() => import('@/pages/admin-view/products'));
const AdminOrders = lazy(() => import('@/pages/admin-view/orders'));
const AdminFeatures = lazy(() => import('@/pages/admin-view/features'));

const ShoppingLayout = lazy(() => import('@/components/shopping-view/layout'));
const ShoppingHome = lazy(() => import('@/pages/shopping-view/home'));
const ShoppingListing = lazy(() => import('@/pages/shopping-view/listing'));
const ShoppingCheckout = lazy(() => import('@/pages/shopping-view/checkout'));
const ShoppingAccount = lazy(() => import('@/pages/shopping-view/account'));

const AuthLayout = lazy(() => import('@/components/auth/layout'));
const AuthLogin = lazy(() => import('@/pages/auth/login'));
const AuthRegister = lazy(() => import('@/pages/auth/register'));

// Custom loading component with skeleton
const PageLoadingFallback = ({ type = 'page' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center space-y-4">
      <LoadingSpinner size="large" />
      <p className="text-gray-600 text-lg">
        {type === 'admin' ? 'Loading Admin Panel...' : 
         type === 'shop' ? 'Loading Store...' : 
         type === 'auth' ? 'Loading Authentication...' : 
         'Loading...'}
      </p>
      {/* Skeleton for different page types */}
      {type === 'shop' && (
        <div className="mt-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-6 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Admin Routes Component
export const AdminRoutes = () => (
  <Suspense fallback={<PageLoadingFallback type="admin" />}>
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="features" element={<AdminFeatures />} />
      </Route>
    </Routes>
  </Suspense>
);

// Shopping Routes Component
export const ShoppingRoutes = () => (
  <Suspense fallback={<PageLoadingFallback type="shop" />}>
    <Routes>
      <Route path="/shop" element={<ShoppingLayout />}>
        <Route path="home" element={<ShoppingHome />} />
        <Route path="listing" element={<ShoppingListing />} />
        <Route path="checkout" element={<ShoppingCheckout />} />
        <Route path="account" element={<ShoppingAccount />} />
      </Route>
    </Routes>
  </Suspense>
);

// Auth Routes Component  
export const AuthRoutes = () => (
  <Suspense fallback={<PageLoadingFallback type="auth" />}>
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>
    </Routes>
  </Suspense>
);

export default {
  AdminRoutes,
  ShoppingRoutes,
  AuthRoutes
};
