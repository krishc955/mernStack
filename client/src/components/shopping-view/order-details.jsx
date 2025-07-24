import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import OrderProgressTracker from "./OrderProgressTracker";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
      <div className="grid gap-6 pr-2">
        
        {/* Order Progress Tracker */}
        <OrderProgressTracker currentStatus={orderDetails?.orderStatus} />
        
        {/* Order Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Order Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <span className="text-sm font-medium text-gray-600">Current Status</span>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "delivered"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "confirmed"
                    ? "bg-blue-500"
                    : orderDetails?.orderStatus === "shipped"
                    ? "bg-purple-500"
                    : orderDetails?.orderStatus === "in process"
                    ? "bg-yellow-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : orderDetails?.orderStatus === "pending"
                    ? "bg-orange-500"
                    : "bg-gray-500"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </div>
          </div>
        </div>
        <Separator />
        
        {/* Order Items */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Order Items</h3>
          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item, index) => (
                  <div key={index} className="flex items-start justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                      {/* Variant Information */}
                      {item.variant && (
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-600">Color:</span>
                            <div className="flex items-center gap-1">
                              <div 
                                className="w-4 h-4 rounded-full border-2 border-gray-300 shadow-sm"
                                style={{ backgroundColor: item.variant.colorCode || '#000' }}
                              ></div>
                              <span className="text-xs text-gray-700 capitalize font-medium">{item.variant.color}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-600">Size:</span>
                            <span className="text-xs font-bold text-gray-900 bg-gray-100 border border-gray-300 px-2 py-1 rounded">
                              {item.variant.size}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-gray-600">Qty: <span className="font-semibold">{item.quantity}</span></div>
                      <div className="text-base font-bold text-gray-900">₹{item.price?.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                ))
              : <div className="text-center py-6 text-gray-500">No items found</div>}
          </div>
        </div>
        
        {/* Shipping Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Shipping Information</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
