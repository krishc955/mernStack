import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-4 flex-col flex gap-1">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-brown-700 transition-all hover:bg-beige-100 hover:text-brown-800 active:bg-beige-200"
        >
          <div className="flex-shrink-0">
            {menuItem.icon}
          </div>
          <span className="truncate">{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile Sidebar Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-80 p-0 bg-white">
          <SheetTitle className="sr-only">
            Admin Panel Navigation
          </SheetTitle>
          <SheetDescription className="sr-only">
            Mobile navigation for admin panel with access to all admin features
          </SheetDescription>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b bg-beige-100">
              <ChartNoAxesCombined size={24} className="text-brown-600" />
              <h1 className="text-xl font-bold text-brown-800">Admin Panel</h1>
            </div>
            
            {/* Mobile Menu Items */}
            <div className="flex-1 px-4 py-4 overflow-y-auto">
              <MenuItems setOpen={setOpen} />
            </div>
            
            {/* Mobile Footer */}
            <div className="p-4 border-t bg-beige-100">
              <p className="text-xs text-brown-600 text-center">Admin Dashboard v2.0</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-white shadow-sm">
        {/* Desktop Header */}
        <div className="p-6 border-b">
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex cursor-pointer items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="p-2 bg-brown-100 rounded-lg">
              <ChartNoAxesCombined size={20} className="text-brown-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-brown-800">Admin Panel</h1>
              <p className="text-xs text-brown-600">Management System</p>
            </div>
          </div>
        </div>
        
        {/* Desktop Menu Items */}
        <div className="flex-1 p-4">
          <MenuItems />
        </div>

        {/* Desktop Footer */}
        <div className="p-4 border-t">
          <p className="text-xs text-brown-500 text-center">v2.0.0</p>
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
