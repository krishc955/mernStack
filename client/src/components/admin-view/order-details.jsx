import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Optional: Log order details for debugging (remove in production)

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[1200px] max-h-[95vh] overflow-hidden flex flex-col">
      <DialogTitle className="sr-only">
        Admin Order Details - Order #{orderDetails?._id}
      </DialogTitle>
      {/* Header Section - Fixed */}
      <div className="flex-shrink-0 pb-4 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
        <p className="text-sm text-gray-500 mt-1">Manage and track order information</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Order ID</span>
                  <span className="text-sm text-gray-900 font-mono">{orderDetails?._id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Order Date</span>
                  <span className="text-sm text-gray-900">{orderDetails?.orderDate.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Total Amount</span>
                  <span className="text-lg font-bold text-green-600">₹{orderDetails?.totalAmount?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Payment Method</span>
                  <span className="text-sm text-gray-900 capitalize">{orderDetails?.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Payment Status</span>
                  <Badge variant={orderDetails?.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                    {orderDetails?.paymentStatus}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Order Status</span>
                  <Badge
                    className={`py-1 px-3 ${
                      orderDetails?.orderStatus === "delivered"
                        ? "bg-green-500 hover:bg-green-600"
                        : orderDetails?.orderStatus === "confirmed"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : orderDetails?.orderStatus === "shipped"
                        ? "bg-purple-500 hover:bg-purple-600"
                        : orderDetails?.orderStatus === "in process"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : orderDetails?.orderStatus === "rejected"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-500 hover:bg-gray-600"
                    }`}
                  >
                    {orderDetails?.orderStatus}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Shipping Information</h3>
              <div className="bg-blue-50 rounded-lg p-5">
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">Customer:</span>
                    <span className="text-gray-900">{user.userName}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-gray-600">Address:</span>
                    <div className="text-gray-900">
                      <div>{orderDetails?.addressInfo?.address}</div>
                      <div>{orderDetails?.addressInfo?.city}</div>
                      <div>PIN: {orderDetails?.addressInfo?.pincode}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">Phone:</span>
                    <span className="text-gray-900">{orderDetails?.addressInfo?.phone}</span>
                  </div>
                  {orderDetails?.addressInfo?.notes && (
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-gray-600">Notes:</span>
                      <span className="text-gray-900">{orderDetails?.addressInfo?.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Update Status Form */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Update Order Status</h3>
              <div className="bg-yellow-50 rounded-lg p-5">
                <CommonForm
                  formControls={[
                    {
                      label: "Order Status",
                      name: "status",
                      componentType: "select",
                      options: [
                        { id: "pending", label: "Pending" },
                        { id: "confirmed", label: "Confirmed" },
                        { id: "in process", label: "In Process" },
                        { id: "shipped", label: "Shipped" },
                        { id: "delivered", label: "Delivered" },
                        { id: "rejected", label: "Rejected" },
                      ],
                    },
                  ]}
                  formData={formData}
                  setFormData={setFormData}
                  buttonText={"Update Order Status"}
                  onSubmit={handleUpdateStatus}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Order Items</h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                  ? orderDetails?.cartItems.map((item, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-3">{item.title}</h4>
                            {/* Variant Information */}
                            {item.variant && (
                              <div className="flex flex-wrap items-center gap-4 mb-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-gray-500">Color:</span>
                                  <div className="flex items-center gap-1">
                                    <div 
                                      className="w-5 h-5 rounded-full border-2 border-gray-300 shadow-sm"
                                      style={{ backgroundColor: item.variant.colorCode || '#000' }}
                                    ></div>
                                    <span className="text-xs text-gray-700 capitalize font-medium">{item.variant.color}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-gray-500">Size:</span>
                                  <span className="text-xs font-bold text-gray-900 bg-gray-100 border border-gray-300 px-2 py-1 rounded">
                                    {item.variant.size}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="text-right ml-4 space-y-1">
                            <div className="text-sm text-gray-600">Qty: <span className="font-semibold">{item.quantity}</span></div>
                            <div className="text-base font-bold text-gray-900">₹{item.price?.toLocaleString('en-IN')}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  : <div className="text-center py-8 text-gray-500">No items found</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;