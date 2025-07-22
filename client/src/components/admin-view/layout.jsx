import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Admin Header */}
        <AdminHeader setOpen={setOpenSidebar} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
