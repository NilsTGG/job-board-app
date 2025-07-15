import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/job-board-app/",
  plugins: [
    react(),
    splitVendorChunkPlugin()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'form-vendor': ['@formspree/react'],
          'icons-vendor': ['lucide-react'],
          // Separate heavy components
          'form-components': [
            './src/components/JobForm.tsx',
            './src/components/AccessibleSelect.tsx',
            './src/components/CoordinateInput.tsx'
          ],
          'calculator-components': [
            './src/components/SmartPricingCalculator.tsx',
            './src/utils/pricingCalculator.ts',
            './src/utils/distanceCalculator.ts'
          ]
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
