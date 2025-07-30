import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";
import { initPerformanceOptimizations } from './utils/performance.js';

// Initialize performance optimizations
initPerformanceOptimizations();

// Register service worker for caching
if ('serviceWorker' in navigator && import.meta.env.MODE === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        if (import.meta.env.MODE === 'development') {
          console.log('SW registered: ', registration);
        }
      })
      .catch((registrationError) => {
        if (import.meta.env.MODE === 'development') {
          console.log('SW registration failed: ', registrationError);
        }
      });
  });
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
);
