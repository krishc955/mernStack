import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import VinoraLogo from "../../assets/img.png";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
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

  console.log(formData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-100 via-beige-50 to-beige-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-brown-200/15 to-beige-300/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-amber-300/10 to-orange-300/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="mx-auto w-full max-w-md space-y-6 relative z-10">{/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-4 -right-4 h-8 w-8 rounded-full hover:bg-beige-200 z-10 text-brown-700"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        {/* Enhanced Header with Large Logo */}
        <div className="text-center space-y-6">
          {/* Large Centered Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-xl"></div>
              <img 
                src={VinoraLogo} 
                alt="Vinora Fashion" 
                className="relative h-24 w-auto transition-transform duration-300 hover:scale-105 drop-shadow-lg"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-brown-800 via-brown-700 to-amber-700 bg-clip-text text-transparent">
              Join Vinora Fashion
            </h1>
            
            <p className="text-brown-600 leading-relaxed text-base">
              Create your account and discover the latest in fashion trends
            </p>
          </div>
          
          <p className="text-sm text-brown-600">
            Already have an account?{" "}
            <Link
              className="font-semibold text-amber-700 hover:text-amber-600 hover:underline transition-colors"
              to="/auth/login"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Enhanced Form Container */}
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-beige-200/50">
          <CommonForm
            formControls={registerFormControls}
            buttonText={"Create Vinora Account"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
        </div>

        {/* Additional Info with Brand Colors */}
        <div className="text-center bg-gradient-to-r from-beige-50/80 to-amber-50/80 backdrop-blur-sm p-4 rounded-xl border border-beige-200/50">
          <p className="text-xs text-brown-600 mb-2">By creating an account, you agree to our</p>
          <p className="text-xs space-x-2">
            <Link to="#" className="text-amber-700 hover:underline font-medium">Terms of Service</Link>
            <span className="text-brown-400">&</span>
            <Link to="#" className="text-amber-700 hover:underline font-medium">Privacy Policy</Link>
          </p>
        </div>

        {/* Brand Footer */}
        <div className="text-center text-xs text-brown-500 space-y-1">
          <p className="font-medium">🌟 Fashion Forward • Quality First • Customer Focused 🌟</p>
          <p>Join thousands of satisfied customers worldwide</p>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
