import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, CreditCard, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any session storage related to checkout
    sessionStorage.removeItem("currentOrderId");
  }, []);

  const handleContinueShopping = () => {
    navigate("/shop/home");
  };

  const handleViewOrders = () => {
    navigate("/shop/account");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="text-center shadow-lg">
          <CardHeader className="pb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">
              Payment Successful!
            </CardTitle>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Order Confirmed</span>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-green-600" />
                <span className="font-medium">Payment Processed</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span className="font-medium">Preparing for Shipment</span>
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
              <p className="font-medium text-blue-800 mb-2">What's Next?</p>
              <ul className="space-y-1 text-left">
                <li>• You'll receive an order confirmation email shortly</li>
                <li>• Track your order status in your account</li>
                <li>• Your order will be shipped within 2-3 business days</li>
                <li>• You'll receive tracking information once shipped</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={handleViewOrders}
                className="flex-1"
              >
                View My Orders
              </Button>
              <Button 
                onClick={handleContinueShopping}
                variant="outline"
                className="flex-1"
              >
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
