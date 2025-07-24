import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
  razorpayOrder: null,
  razorpayKey: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/shop/order/create`,
      orderData
    );

    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/shop/order/capture`,
      {
        paymentId,
        payerId,
        orderId,
      }
    );

    return response.data;
  }
);

export const verifyRazorpayPayment = createAsyncThunk(
  "/order/verifyRazorpayPayment",
  async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId }) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/shop/order/verify-razorpay`,
      {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderId,
      }
    );

    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/shop/order/list/${userId}`
    );

    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/shop/order/details/${id}`
    );

    return response.data;
  }
);

export const deleteOrder = createAsyncThunk(
  "/order/deleteOrder",
  async (id) => {
    const response = await axios.delete(
      `${API_BASE_URL}/api/shop/order/delete/${id}`
    );

    return response.data;
  }
);

export const deleteAllPendingOrders = createAsyncThunk(
  "/order/deleteAllPendingOrders",
  async (userId) => {
    const response = await axios.delete(
      `${API_BASE_URL}/api/shop/order/delete-all-pending/${userId}`
    );

    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.approvalURL) {
          state.approvalURL = action.payload.approvalURL;
        }
        if (action.payload.razorpayOrder) {
          state.razorpayOrder = action.payload.razorpayOrder;
          state.razorpayKey = action.payload.key;
        }
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
        state.razorpayOrder = null;
        state.razorpayKey = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted order from the orderList
        state.orderList = state.orderList.filter(
          order => order._id !== action.meta.arg
        );
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAllPendingOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllPendingOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove all pending orders from the orderList
        state.orderList = state.orderList.filter(
          order => order.orderStatus !== "pending"
        );
      })
      .addCase(deleteAllPendingOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
