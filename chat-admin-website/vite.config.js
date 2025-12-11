import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), 
    },
  },

  server: {
    origin: "http://localhost:5173",
    cors: true,
  },

  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      optimizeDeps: {
        include: ["jwt-decode"],
      },
    },
  },
});
