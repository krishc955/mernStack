import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  // Root path redirection
  if (location.pathname === "/") {
    if (isAuthenticated && user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Redirect authenticated users away from auth pages
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Admin route protection - only authenticated admin users can access
  if (location.pathname.includes("admin")) {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    }
    if (user?.role !== "admin") {
      return <Navigate to="/unauth-page" />;
    }
  }

  // Prevent admin users from accessing shop routes
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Protected shop routes that require authentication
  const protectedShopRoutes = ["/shop/checkout", "/shop/account", "/shop/orders"];
  if (
    !isAuthenticated &&
    protectedShopRoutes.some(route => location.pathname.includes(route.split('/').pop()))
  ) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
