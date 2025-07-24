import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyRazorpayPayment } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";

const RazorpayPayment = ({ orderData, onSuccess, onFailure }) => {
  const dispatch = useDispatch();
  const { razorpayOrder, razorpayKey, orderId } = useSelector((state) => state.shopOrder);
  const { toast } = useToast();

  useEffect(() => {
    if (razorpayOrder && razorpayKey) {
      loadRazorpayScript();
    }
  }, [razorpayOrder, razorpayKey]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      toast({
        title: "Error",
        description: "Razorpay SDK failed to load. Please check your internet connection.",
        variant: "destructive",
      });
      return;
    }

    const options = {
      key: razorpayKey,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "Vinora Store",
      description: "Payment for your order",
      order_id: razorpayOrder.id,
      handler: function (response) {
        // Verify payment on the backend
        dispatch(verifyRazorpayPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId: orderId,
        })).then((result) => {
          if (result?.payload?.success) {
            toast({
              title: "Payment Successful",
              description: "Your order has been confirmed!",
            });
            if (onSuccess) onSuccess(result.payload);
            // Clear session storage
            sessionStorage.removeItem("currentOrderId");
            // Redirect to success page
            window.location.href = "/shop/payment-success";
          } else {
            toast({
              title: "Payment Verification Failed",
              description: "There was an issue verifying your payment. Please contact support.",
              variant: "destructive",
            });
            if (onFailure) onFailure("Payment verification failed");
          }
        });
      },
      prefill: {
        name: orderData?.addressInfo?.name || "",
        email: "", // Add user email if available
        contact: orderData?.addressInfo?.phone || "",
      },
      notes: {
        address: orderData?.addressInfo?.address || "",
      },
      theme: {
        color: "#000000",
      },
      modal: {
        ondismiss: function() {
          toast({
            title: "Payment Cancelled",
            description: "Payment was cancelled by user.",
            variant: "destructive",
          });
          if (onFailure) onFailure("Payment cancelled");
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Auto-trigger payment when Razorpay order is ready
  useEffect(() => {
    if (razorpayOrder && razorpayKey) {
      handlePayment();
    }
  }, [razorpayOrder, razorpayKey]);

  return null; // This component doesn't render anything visible
};

export default RazorpayPayment;
