import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, Search } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function MenuItems({ isMobile = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className={`flex ${isMobile ? 'flex-col mb-6 space-y-4' : 'flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'}`}>
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className={`${isMobile 
            ? 'text-base font-semibold cursor-pointer text-amber-100 hover:text-white bg-amber-800/20 hover:bg-amber-700/30 px-4 py-3 rounded-lg transition-all duration-200 border border-amber-700/30 hover:border-amber-600' 
            : 'text-sm font-medium cursor-pointer text-amber-700 hover:text-amber-900 transition-colors'
          }`}
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function SearchBar({ isMobile = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${isMobile ? 'w-full' : 'w-64 hidden md:block'}`}>
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 pr-4 w-full bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-full text-amber-900 placeholder:text-amber-600 ${
            isMobile ? 'py-1.5 text-xs placeholder:text-xs' : 'py-2'
          }`}
        />
      </div>
    </form>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  console.log(cartItems, "sangam");

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4 mt-6 pt-6 border-t border-amber-700/30">
      {/* Mobile Cart Button in Menu */}
      <div className="lg:hidden">
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="default"
            className="w-full relative bg-amber-700/20 border-amber-600 hover:bg-amber-600/30 text-amber-100 hover:text-white font-semibold py-3"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            View Cart ({cartItems?.items?.length || 0} items)
          </Button>
          <UserCartWrapper
            setOpenCartSheet={setOpenCartSheet}
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </Sheet>
      </div>

      {/* Desktop Cart Button */}
      <div className="hidden lg:block">
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="icon"
            className="relative bg-amber-200/30 border-amber-400 hover:bg-amber-300/40 text-amber-800 hover:text-amber-900"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-[-5px] right-[2px] font-bold text-xs bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems?.items?.length || 0}
            </span>
            <span className="sr-only">User cart</span>
          </Button>
          <UserCartWrapper
            setOpenCartSheet={setOpenCartSheet}
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </Sheet>
      </div>

      {/* User Profile Section */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        <div className="lg:hidden bg-amber-700/20 border border-amber-600/30 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <Avatar className="bg-amber-600 hover:bg-amber-500 transition-colors h-10 w-10">
              <AvatarFallback className="bg-amber-600 text-white font-extrabold text-lg">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-amber-100 font-semibold text-base">{user?.userName}</p>
              <p className="text-amber-200/80 text-sm">Welcome back!</p>
            </div>
          </div>
        </div>

        {/* Mobile Menu Actions */}
        <div className="lg:hidden space-y-2">
          <Button 
            onClick={() => navigate("/shop/account")} 
            variant="outline"
            className="w-full bg-amber-700/20 border-amber-600 hover:bg-amber-600/30 text-amber-100 hover:text-white font-semibold py-3"
          >
            <UserCog className="mr-2 h-5 w-5" />
            My Account
          </Button>
          <Button 
            onClick={handleLogout} 
            variant="outline"
            className="w-full bg-red-700/20 border-red-600 hover:bg-red-600/30 text-red-100 hover:text-white font-semibold py-3"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>

        {/* Desktop Dropdown */}
        <div className="hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="bg-amber-700 hover:bg-amber-800 transition-colors">
                <AvatarFallback className="bg-amber-700 text-amber-100 font-extrabold">
                  {user?.userName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56 bg-amber-50 border-amber-200">
              <DropdownMenuLabel className="text-amber-900">Logged in as {user?.userName}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-amber-200" />
              <DropdownMenuItem onClick={() => navigate("/shop/account")} className="text-amber-800 hover:bg-amber-100">
                <UserCog className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-amber-200" />
              <DropdownMenuItem onClick={handleLogout} className="text-amber-800 hover:bg-amber-100">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-200 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 shadow-lg">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2 text-amber-800 hover:text-amber-900 transition-colors">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold text-lg">Ecommerce</span>
        </Link>

        {/* Mobile Search Bar - Always Visible */}
        <div className="flex-1 max-w-xs mx-4 lg:hidden">
          <SearchBar isMobile={true} />
        </div>

        {/* Mobile Right Section - Cart + Menu */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Cart Button - Always Visible */}
          <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <Button
              onClick={() => setOpenCartSheet(true)}
              variant="outline"
              size="icon"
              className="relative bg-amber-200/30 border-amber-400 hover:bg-amber-300/40 text-amber-800 hover:text-amber-900"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-[-5px] right-[2px] font-bold text-xs bg-orange-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {cartItems?.items?.length || 0}
              </span>
              <span className="sr-only">User cart</span>
            </Button>
            <UserCartWrapper
              setOpenCartSheet={setOpenCartSheet}
              cartItems={
                cartItems && cartItems.items && cartItems.items.length > 0
                  ? cartItems.items
                  : []
              }
            />
          </Sheet>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-amber-200/30 border-amber-400 hover:bg-amber-300/40 text-amber-800">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-gradient-to-b from-amber-900 via-amber-900 to-amber-800 border-amber-700 p-6">
              <div className="mb-6">
                <Link to="/shop/home" className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors mb-6">
                  <HousePlug className="h-6 w-6" />
                  <span className="font-bold text-xl">StyleHub</span>
                </Link>
              </div>
              <MenuItems isMobile={true} />
              <HeaderRightContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Search Bar */}
        <div className="flex-1 max-w-md mx-8 hidden lg:block">
          <SearchBar />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* Desktop Right Content */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
