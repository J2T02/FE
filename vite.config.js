import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      { find: "~", replacement: "/src" },
      { find: "~components", replacement: "/src/components" },
      { find: "~styles", replacement: "/src/assets/styles" },
      { find: "~pages", replacement: "/src/pages" },
      { find: "~routers", replacement: "/src/routers" },
      { find: "~contexts", replacement: "/src/contexts" },
    ],
  },
});
