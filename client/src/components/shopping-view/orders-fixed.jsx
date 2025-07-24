import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
  deleteOrder,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";
import { Trash2, Eye, AlertCircle } from "lucide-react";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const { toast } = useToast();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  function handleDeleteOrder(orderId) {
    if (window.confirm("Are you sure you want to delete this pending order?")) {
      dispatch(deleteOrder(orderId)).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Order Deleted",
            description: "Pending order has been removed successfully.",
          });
        } else {
          toast({
            title: "Error",
            description: data?.payload?.message || "Failed to delete order",
            variant: "destructive",
          });
        }
      });
    }
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  // Filter orders based on showPendingOnly state
  const filteredOrders = showPendingOnly 
    ? orderList?.filter(order => order.orderStatus === "pending") 
    : orderList;

  const pendingOrdersCount = orderList?.filter(order => order.orderStatus === "pending").length || 0;

  console.log(orderDetails, "orderDetails");

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            Order History
            {pendingOrdersCount > 0 && (
              <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
                <AlertCircle className="w-3 h-3 mr-1" />
                {pendingOrdersCount} Pending
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={showPendingOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowPendingOnly(!showPendingOnly)}
              className={showPendingOnly ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              {showPendingOnly ? "Show All Orders" : "Show Pending Only"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredOrders && filteredOrders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((orderItem) => (
                <TableRow key={orderItem._id}>
                  <TableCell className="font-mono text-xs">{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem?.orderStatus === "rejected"
                          ? "bg-red-600"
                          : orderItem?.orderStatus === "pending"
                          ? "bg-orange-500"
                          : "bg-black"
                      }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>₹{orderItem?.totalAmount?.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        View Details
                      </Button>
                      {orderItem?.orderStatus === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteOrder(orderItem?._id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {showPendingOnly ? (
              <div>
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No pending orders found</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setShowPendingOnly(false)}
                >
                  Show All Orders
                </Button>
              </div>
            ) : (
              <div>
                <p>No orders found</p>
                <p className="text-sm mt-1">Start shopping to see your orders here</p>
              </div>
            )}
          </div>
        )}
        
        {/* Order Details Dialog */}
        <Dialog
          open={openDetailsDialog}
          onOpenChange={() => {
            setOpenDetailsDialog(false);
            dispatch(resetOrderDetails());
          }}
        >
          <ShoppingOrderDetailsView orderDetails={orderDetails} />
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
