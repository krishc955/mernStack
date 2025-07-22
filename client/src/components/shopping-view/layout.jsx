import { Outlet, useLocation } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";
import CustomerAssurance from "./customer-assurance";
import ShopByBrand from "./shop-by-brand";

function ShoppingLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/shop/home' || location.pathname === '/';

  return (
    <div className="flex flex-col bg-white overflow-hidden min-h-screen">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full flex-1">
        <Outlet />
      </main>
      {/* customer assurance section - only on home page */}
      {isHomePage && <CustomerAssurance />}
      {/* shop by brand section - only on home page */}
      {isHomePage && <ShopByBrand />}
      {/* common footer */}
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;
