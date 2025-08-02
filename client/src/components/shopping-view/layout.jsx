import { Outlet, useLocation } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";
import CustomerAssurance from "./customer-assurance";

function ShoppingLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/shop/home' || location.pathname === '/';

  return (
    <div className="flex flex-col bg-white overflow-hidden min-h-screen no-horizontal-scroll container-safe">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full flex-1 no-horizontal-scroll container-safe">
        <Outlet />
      </main>
      {/* customer assurance section - only on home page */}
      {isHomePage && <CustomerAssurance />}
      {/* common footer */}
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;
