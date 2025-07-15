import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/job-board-app/",
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'terser'
  }
});