import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/job-board-app/",
  plugins: [
    react(),
    // Removed splitVendorChunkPlugin() - we're using manual chunks instead
  ],
  build: {
    rollupOptions: {
      output: {
        // Using function form for manual chunks (more flexible)
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@formspree/react')) {
              return 'form-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            if (id.includes('zustand')) {
              return 'state-vendor';
            }
            // All other node_modules go to vendor chunk
            return 'vendor';
          }
          
          // Component chunks
          if (id.includes('/components/ConversationalForm') || 
              id.includes('/components/AccessibleSelect') || 
              id.includes('/components/CoordinateInput')) {
            return 'form-components';
          }
          
          if (id.includes('/components/UnifiedQuoteWidget') || 
              id.includes('/utils/pricingCalculator') || 
              id.includes('/utils/distanceCalculator')) {
            return 'calculator-components';
          }
          
          if (id.includes('/services/')) {
            return 'services';
          }
          
          // Default chunk
          return undefined;
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging
    sourcemap: false,
    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ["lucide-react"]
  },
  // Performance optimizations
  server: {
    fs: {
      strict: false
    }
  }
});