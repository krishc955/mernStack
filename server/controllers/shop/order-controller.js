const paypal = require("../../helpers/paypal");
const razorpayHelper = require("../../helpers/razorpay");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    if (paymentMethod === "razorpay") {
      // Handle Razorpay payment
      try {
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        console.log('🔄 Creating Razorpay order with amount:', totalAmount);
        const razorpayOrder = await razorpayHelper.createOrder({
          amount: totalAmount,
          receipt: `order_${newlyCreatedOrder._id}`,
          notes: {
            userId: userId,
            orderId: newlyCreatedOrder._id.toString(),
          },
        });

        console.log('✅ Razorpay order created successfully:', razorpayOrder.id);
        res.status(201).json({
          success: true,
          orderId: newlyCreatedOrder._id,
          razorpayOrder: razorpayOrder,
          key: process.env.RAZORPAY_KEY_ID,
        });
      } catch (error) {
        console.log('❌ Razorpay order creation error:', error);
        return res.status(500).json({
          success: false,
          message: "Error while creating Razorpay order",
          error: error.message || error,
        });
      }
    } else {
      // Handle PayPal payment (existing code)
      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:5173/shop/paypal-return",
          cancel_url: "http://localhost:5173/shop/paypal-cancel",
        },
        transactions: [
          {
            item_list: {
              items: cartItems.map((item) => ({
                name: item.title,
                sku: item.productId,
                price: item.price.toFixed(2),
                currency: "INR",
                quantity: item.quantity,
              })),
            },
            amount: {
              currency: "INR",
              total: totalAmount.toFixed(2),
            },
            description: "description",
          },
        ],
      };

      paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
        if (error) {
          console.log(error);

          return res.status(500).json({
            success: false,
            message: "Error while creating paypal payment",
          });
        } else {
          const newlyCreatedOrder = new Order({
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
          });

          await newlyCreatedOrder.save();

          const approvalURL = paymentInfo.links.find(
            (link) => link.rel === "approval_url"
          ).href;

          res.status(201).json({
            success: true,
            approvalURL,
            orderId: newlyCreatedOrder._id,
          });
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

// New function for Razorpay payment verification
const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Verify the payment signature
    const isValidSignature = razorpayHelper.verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValidSignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Get payment details from Razorpay
    const paymentDetails = await razorpayHelper.getPaymentDetails(razorpay_payment_id);

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update order with payment details
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = razorpay_payment_id;
    order.razorpayOrderId = razorpay_order_id;
    order.razorpaySignature = razorpay_signature;

    // Update product stock
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.title}`,
        });
      }

      // Check if there's enough stock
      if (product.totalStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product: ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    // Delete the cart
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment verified and order confirmed",
      data: order,
      paymentDetails: {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        amount: paymentDetails.amount / 100, // Convert back from paise to rupees
        currency: paymentDetails.currency,
        status: paymentDetails.status,
        method: paymentDetails.method,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error verifying payment",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

// Delete order (only for pending orders)
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Only allow deletion of pending orders
    if (order.orderStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending orders can be deleted",
      });
    }

    await Order.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Delete all pending orders for a user
const deleteAllPendingOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all pending orders for the user
    const pendingOrders = await Order.find({ 
      userId: userId, 
      orderStatus: "pending" 
    });

    if (pendingOrders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No pending orders found!",
      });
    }

    // Delete all pending orders
    const deleteResult = await Order.deleteMany({ 
      userId: userId, 
      orderStatus: "pending" 
    });

    res.status(200).json({
      success: true,
      message: `${deleteResult.deletedCount} pending orders deleted successfully`,
      deletedCount: deleteResult.deletedCount,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  verifyRazorpayPayment,
  getAllOrdersByUser,
  getOrderDetails,
  deleteOrder,
  deleteAllPendingOrders,
};
