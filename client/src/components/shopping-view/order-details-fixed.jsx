import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <DialogTitle className="sr-only">
        Order Details - {orderDetails?._id}
      </DialogTitle>
      <div className="grid gap-6 pr-2">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Amount</span>
            <Label>₹{orderDetails?.totalAmount?.toLocaleString('en-IN')}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : orderDetails?.orderStatus === "pending"
                    ? "bg-orange-500"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <div className="max-h-[300px] overflow-y-auto pr-2">
              <ul className="grid gap-3">
                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                  ? orderDetails?.cartItems.map((item, index) => (
                      <li key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{item.title}</div>
                          {/* Variant Information */}
                          {item.variant && (
                            <div className="flex items-center gap-4 mt-2">
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
                                <span className="text-xs font-bold text-gray-900 bg-white border border-gray-300 px-2 py-1 rounded shadow-sm">
                                  {item.variant.size}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                          <div className="font-semibold text-gray-900">₹{item.price?.toLocaleString('en-IN')}</div>
                        </div>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
