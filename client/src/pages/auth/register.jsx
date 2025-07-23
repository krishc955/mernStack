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
          Create Your Account
        </h1>
        
        <p className="text-amber-700 leading-relaxed">
          Join thousands of satisfied customers and start your shopping journey today
        </p>
        
        <p className="text-sm text-amber-600">
          Already have an account?{" "}
          <Link
            className="font-medium text-amber-800 hover:text-amber-700 hover:underline transition-colors"
            to="/auth/login"
          >
            Sign in here
          </Link>
        </p>
      </div>

      {/* Enhanced Form Container */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100">
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Create Account"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>

      {/* Additional Info */}
      <div className="text-center text-xs text-amber-600 space-y-2">
        <p>By creating an account, you agree to our</p>
        <p>
          <Link to="#" className="text-amber-800 hover:underline">Terms of Service</Link>
          {" "}&{" "}
          <Link to="#" className="text-amber-800 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}

export default AuthRegister;
