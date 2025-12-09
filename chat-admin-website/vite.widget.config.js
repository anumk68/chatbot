import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import "tailwindcss/tailwind.css";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  publicDir: false,
  define: {
    "process.env": {},
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/chatbot/index.jsx"),
      name: "DigiChatWidget",
      fileName: () => `widget.js`,
      formats: ["iife"],
    },
     cssCodeSplit: false, 
    outDir: "public/widget",
    rollupOptions: {
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          assetFileNames: "[name].[ext]",
        },
      },
    },
  },
  server: {
    origin: "http://localhost:5173",
    cors: true,
  },
});
