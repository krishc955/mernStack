import { AlignJustify, LogOut, User, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Mobile Menu Button */}
        <Button 
          onClick={() => setOpen(true)} 
          variant="ghost"
          size="sm"
          className="lg:hidden hover:bg-gray-100 p-2"
        >
          <AlignJustify className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {/* Desktop Brand/Title */}
        <div className="hidden lg:flex items-center space-x-2">
          <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
        </div>

        {/* Mobile Brand */}
        <div className="flex lg:hidden">
          <h1 className="text-base font-semibold text-gray-900">Admin</h1>
        </div>

        {/* Right Side - User Info & Logout */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* User Profile (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span className="max-w-32 truncate">{user?.userName || 'Admin'}</span>
          </div>

          {/* Settings Button (Hidden on mobile) */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex hover:bg-gray-100 p-2"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
