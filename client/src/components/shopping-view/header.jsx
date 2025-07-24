import { LogOut, Menu, ShoppingCart, UserCog, Search } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import VinoraLogo from "../../assets/img.png";
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
import UserCartWrapper from "./cart-wrapper-new";
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
    <nav className={`flex ${isMobile ? 'flex-col mb-4 space-y-3 max-w-full overflow-hidden' : 'flex-col mb-3 lg:mb-0 lg:items-center gap-4 lg:flex-row'}`}>
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className={`${isMobile 
            ? 'text-sm font-semibold cursor-pointer text-beige-100 hover:text-white bg-brown-600/40 hover:bg-brown-500/50 px-3 py-2 rounded-lg transition-all duration-200 border border-brown-500/40 hover:border-brown-400/60 max-w-full overflow-hidden whitespace-nowrap text-ellipsis' 
            : 'text-sm font-medium cursor-pointer text-beige-100 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-brown-600/30 whitespace-nowrap'
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
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-beige-200 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 pr-4 w-full bg-beige-800/30 border-beige-500 focus:border-beige-300 focus:ring-beige-300 rounded-full text-white placeholder:text-beige-200 transition-all duration-200 ${
            isMobile ? 'py-1.5 text-xs placeholder:text-xs' : 'py-2'
          }`}
        />
      </div>
    </form>
  );
}

function HeaderRightContent() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, isAuthenticated, user?.id]);

  // If user is not authenticated, show login/register buttons
  if (!isAuthenticated) {
    return (
      <div className="flex lg:items-center lg:flex-row lg:gap-3 flex-col gap-3 mt-4 pt-4 border-t border-brown-600/30 lg:mt-0 lg:pt-0 lg:border-t-0 max-w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-2 max-w-full">
          <Button 
            onClick={() => navigate("/auth/login")} 
            variant="outline"
            className="bg-brand-600 border-brand-700 hover:bg-brand-700 text-white hover:text-white font-semibold py-2 transition-all duration-200 whitespace-nowrap"
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate("/auth/register")} 
            variant="outline"
            className="bg-transparent border-brand-400 hover:bg-brand-600/20 text-beige-100 hover:text-white font-semibold py-2 transition-all duration-200 whitespace-nowrap"
          >
            Register
          </Button>
        </div>
      </div>
    );
  }

  console.log(cartItems, "sangam");

  return (
    <div className="flex lg:items-center lg:flex-row lg:gap-3 flex-col gap-3 mt-4 pt-4 border-t border-brown-600/30 lg:mt-0 lg:pt-0 lg:border-t-0 max-w-full overflow-hidden">
      {/* Mobile Cart Button in Menu */}
      <div className="lg:hidden max-w-full">
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="default"
            className="w-full relative bg-brown-600/20 border-brown-400 hover:bg-brown-500/30 text-beige-100 hover:text-white font-semibold py-2 transition-all duration-200 max-w-full overflow-hidden whitespace-nowrap"
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
            className="relative bg-beige-200/20 border-beige-400 hover:bg-beige-300/30 text-beige-100 hover:text-white h-9 w-9 transition-all duration-200"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 font-bold text-xs bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
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
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 max-w-full overflow-hidden">
        <div className="lg:hidden bg-brown-600/30 border border-brown-500/40 rounded-lg p-2 max-w-full overflow-hidden">
          <div className="flex items-center gap-2 max-w-full overflow-hidden">
            <Avatar className="bg-beige-600 hover:bg-beige-500 transition-colors h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-beige-600 text-brown-800 font-extrabold text-sm">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-beige-100 font-semibold text-sm truncate">{user?.userName}</p>
              <p className="text-beige-200 text-xs truncate">Welcome back!</p>
            </div>
          </div>
        </div>

        {/* Mobile Menu Actions */}
        <div className="lg:hidden space-y-2 max-w-full overflow-hidden">
          <Button 
            onClick={() => navigate("/shop/account")} 
            variant="outline"
            className="w-full bg-beige-600/20 border-beige-400 hover:bg-beige-500/30 text-beige-100 hover:text-white font-semibold py-2 transition-all duration-200 max-w-full overflow-hidden whitespace-nowrap"
          >
            <UserCog className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">My Account</span>
          </Button>
          <Button 
            onClick={handleLogout} 
            variant="outline"
            className="w-full bg-brown-600/20 border-brown-500 hover:bg-brown-500/30 text-beige-100 hover:text-white font-semibold py-2 transition-all duration-200 max-w-full overflow-hidden whitespace-nowrap"
          >
            <LogOut className="mr-2 h-5 w-5 flex-shrink-0" />
            <span className="truncate">Logout</span>
          </Button>
        </div>

        {/* Desktop Dropdown */}
        <div className="hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="bg-brand-600 hover:bg-brand-700 transition-colors h-9 w-9 cursor-pointer">
                <AvatarFallback className="bg-brand-600 text-white font-extrabold">
                  {user?.userName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56 bg-white border-neutral-200 shadow-lg">
              <DropdownMenuLabel className="text-neutral-700">Logged in as {user?.userName}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-neutral-200" />
              <DropdownMenuItem onClick={() => navigate("/shop/account")} className="text-neutral-700 hover:bg-brand-50 focus:bg-brand-50">
                <UserCog className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-neutral-200" />
              <DropdownMenuItem onClick={handleLogout} className="text-neutral-700 hover:bg-brand-50 focus:bg-brand-50">
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, isAuthenticated, user?.id]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-beige-300 bg-gradient-to-r from-beige-700 via-beige-600 to-beige-700 shadow-lg overflow-x-hidden">
      <div className="flex h-14 items-center justify-between pr-4 md:pr-6 max-w-full overflow-x-hidden relative">
        <Link to="/shop/home" className="flex items-center transition-colors flex-shrink-0 h-full absolute left-0 top-0">
          <img 
            src={VinoraLogo} 
            alt="Wearables" 
            className="h-full w-auto transition-transform duration-200 hover:scale-105 block"
          />
        </Link>

        {/* Mobile Search Bar - Always Visible */}
        <div className="flex-1 max-w-xs ml-16 mr-2 sm:ml-20 sm:mr-4 lg:hidden">
          <SearchBar isMobile={true} />
        </div>

        {/* Mobile Right Section - Cart + Menu */}
        <div className="flex items-center gap-1 sm:gap-2 lg:hidden flex-shrink-0">
          {/* Mobile Cart Button - Show only for authenticated users */}
          {isAuthenticated ? (
            <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
              <Button
                onClick={() => setOpenCartSheet(true)}
                variant="outline"
                size="icon"
                className="relative bg-brand-50 border-brand-200 hover:bg-brand-100 text-brand-700 hover:text-brand-800 transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-[-5px] right-[2px] font-bold text-xs bg-brown-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
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
          ) : (
            <Button
              onClick={() => navigate("/auth/login")}
              variant="outline"
              size="icon"
              className="bg-brand-50 border-brand-200 hover:bg-brand-100 text-brand-700 hover:text-brand-800 transition-all duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="sr-only">Login to view cart</span>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-brand-50 border-brand-200 hover:bg-brand-100 text-brand-700 transition-all duration-200">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-gradient-to-b from-brown-800 via-brown-700 to-brown-800 border-brown-600 p-4 overflow-y-auto overflow-x-hidden">
              <div className="mb-4 max-w-full overflow-hidden">
                <Link to="/shop/home" className="flex items-center transition-colors h-10">
                  <img 
                    src={VinoraLogo} 
                    alt="Wearables" 
                    className="h-full w-auto transition-transform duration-200 hover:scale-105"
                  />
                </Link>
              </div>
              <MenuItems isMobile={true} />
              <HeaderRightContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Search Bar */}
        <div className="flex-1 max-w-md ml-20 mr-4 hidden lg:block">
          <SearchBar />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block flex-shrink-0">
          <MenuItems />
        </div>

        {/* Desktop Right Content */}
        <div className="hidden lg:flex lg:items-center lg:gap-3 lg:ml-4 flex-shrink-0">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
