import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { X, Lock } from "lucide-react";
import VinoraLogo from "../../assets/img.png";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  function handleClose() {
    navigate("/shop/home");
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 relative">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -top-4 -right-4 h-8 w-8 rounded-full hover:bg-gray-100 z-10"
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>

      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        {/* Vinora Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src={VinoraLogo} 
            alt="Vinora" 
            className="h-16 w-auto transition-transform duration-200 hover:scale-105"
          />
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        
        <p className="text-amber-700 leading-relaxed">
          Sign in to your account to continue shopping and access your orders
        </p>
        
        <p className="text-sm text-amber-600">
          Don't have an account?{" "}
          <Link
            className="font-medium text-amber-800 hover:text-amber-700 hover:underline transition-colors"
            to="/auth/register"
          >
            Create one now
          </Link>
        </p>
      </div>

      {/* Enhanced Form Container */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100">
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
        
        {/* Additional Login Options */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-amber-600">Secure Login</span>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              to="#" 
              className="text-sm text-amber-700 hover:text-amber-800 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="text-center text-xs text-amber-700 bg-amber-50 p-3 rounded-lg">
        <div className="flex items-center justify-center space-x-1 mb-1">
          <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-amber-800">Secure Connection</span>
        </div>
        <p>Your data is protected with 256-bit SSL encryption</p>
      </div>
    </div>
  );
}

export default AuthLogin;
