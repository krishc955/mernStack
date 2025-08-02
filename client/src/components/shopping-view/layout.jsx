import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden min-h-screen no-horizontal-scroll container-safe">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full flex-1 no-horizontal-scroll container-safe">
        <Outlet />
      </main>
      {/* common footer */}
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;
