import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  analyticsData: null,
  dashboardStats: null,
  isLoading: false,
  error: null
};

// Define the base URL for API calls
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  if (typeof window !== 'undefined') {
    const currentHost = window.location.hostname;
    if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
      return 'http://localhost:5000';
    }
    if (currentHost === 'vinora.royalappleshimla.com') {
      return 'https://vinora-backend.onrender.com';
    }
  }
  
  return 'http://localhost:5000';
};

const API_BASE_URL = getApiBaseUrl();

export const fetchSalesAnalytics = createAsyncThunk(
  "analytics/fetchSalesAnalytics",
  async (period = 12, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/analytics/sales?period=${period}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch analytics data"
      );
    }
  }
);

export const fetchDashboardStats = createAsyncThunk(
  "analytics/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/analytics/dashboard-stats`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard stats"
      );
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    clearAnalyticsData: (state) => {
      state.analyticsData = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Sales Analytics
      .addCase(fetchSalesAnalytics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalesAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analyticsData = action.payload.data;
        state.error = null;
      })
      .addCase(fetchSalesAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.analyticsData = null;
      })
      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardStats = action.payload.data;
        state.error = null;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAnalyticsData, clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
