import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    //visualizer({ open: true }),
    react({
      jsxRuntime: "automatic",
    }),
  ],
  define: {
    global: "window",
  },
  optimizeDeps: {
    include: ["buffer", "process"],
  },

  server: {
    port: 5605,
  },
  base: "/",
}));
