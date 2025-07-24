import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';

  return {
    plugins: [
      react({
        // Enable React Fast Refresh for better development experience
        fastRefresh: isDevelopment,
      })
    ],
    
    // Enhanced path resolution with organized aliases
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@services": path.resolve(__dirname, "./src/services"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@constants": path.resolve(__dirname, "./src/constants"),
        "@config": path.resolve(__dirname, "./src/config"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@assets": path.resolve(__dirname, "./src/assets"),
      },
    },
    
    // Environment configuration
    define: {
      __DEV__: isDevelopment,
      __PROD__: isProduction,
    },
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: isDevelopment,
      
      // Optimize chunks for better loading
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        },
        output: {
          // Create separate chunks for better caching and loading
          manualChunks: {
            // Core vendor libraries
            'vendor-react': ['react', 'react-dom'],
            'vendor-router': ['react-router-dom'],
            'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
            'vendor-ui': ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-label'],
            
            // Feature-based chunks for better loading
            'chunk-admin': [
              './src/pages/admin-view/dashboard.jsx',
              './src/pages/admin-view/products.jsx',
              './src/pages/admin-view/orders.jsx',
              './src/pages/admin-view/features.jsx',
            ],
            'chunk-shop': [
              './src/pages/shopping-view/home.jsx',
              './src/pages/shopping-view/listing.jsx',
              './src/pages/shopping-view/checkout.jsx',
              './src/pages/shopping-view/account.jsx',
            ],
            'chunk-auth': [
              './src/pages/auth/login.jsx',
              './src/pages/auth/register.jsx',
            ],
          },
          
          // Organized file naming for better caching
          chunkFileNames: (chunkInfo) => {
            if (chunkInfo.name.startsWith('vendor-')) return 'assets/js/vendor/[name]-[hash].js';
            if (chunkInfo.name.startsWith('chunk-')) return 'assets/js/chunks/[name]-[hash].js';
            return 'assets/js/[name]-[hash].js';
          },
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(css)$/.test(assetInfo.name)) {
              return 'assets/css/[name]-[hash].[ext]';
            }
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
              return 'assets/images/[name]-[hash].[ext]';
            }
            if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return 'assets/fonts/[name]-[hash].[ext]';
            }
            return 'assets/[ext]/[name]-[hash].[ext]';
          },
        }
      },
      
      // Environment-aware minification
      minify: isProduction ? 'terser' : false,
      terserOptions: isProduction ? {
        compress: {
          drop_console: true, // Remove console.logs in production
          drop_debugger: true
        }
      } : {},
      
      // Optimize assets
      assetsInlineLimit: 4096, // Inline assets smaller than 4kb
      cssCodeSplit: true, // Split CSS into separate files
    },
    
    // Enhanced development server configuration
    server: {
      port: 5173,
      host: true,
      open: isDevelopment,
      cors: true,
      hmr: {
        overlay: isDevelopment, // Show overlay only in development
      }
    },
    
    // Environment-aware dependency optimization
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@reduxjs/toolkit',
        'react-redux'
      ],
      exclude: isDevelopment ? [] : ['@vite/client', '@vite/env'],
    },
    
    // CSS configuration
    css: {
      devSourcemap: isDevelopment,
    },
    
    publicDir: 'public'
  };
});
