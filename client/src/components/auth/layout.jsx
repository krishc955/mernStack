import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Enhanced with gradient and better styling */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 w-1/2 px-12 relative overflow-hidden">
        <div className="max-w-md space-y-6 text-center text-white relative z-10">
          <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
            Welcome to Vinora
          </h1>
          
          <p className="text-lg text-amber-100 leading-relaxed">
            Discover amazing products and exclusive deals. Join our community of satisfied customers.
          </p>
          
          <div className="space-y-4 text-sm text-amber-200">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Secure & Fast Checkout</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Premium Quality Products</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Enhanced with subtle gradient */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-amber-50 to-white px-4 py-12 sm:px-6 lg:px-8 relative">
        <div className="relative z-10 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
