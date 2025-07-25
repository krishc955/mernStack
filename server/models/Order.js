const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
      variant: {
        color: String,
        colorCode: String,
        size: String
      }
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  // PayPal fields
  paymentId: String,
  payerId: String,
  // Razorpay fields
  razorpayOrderId: String,
  razorpaySignature: String,
});

module.exports = mongoose.model("Order", OrderSchema);
