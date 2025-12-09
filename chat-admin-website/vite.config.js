import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), 
      },
      optimizeDeps: {
        include: ["jwt-decode"],
      },
    },

    
    server: {
      origin: "http://localhost:5173", 
      cors: true,
    },
  },
});
  