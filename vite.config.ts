import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// @ts-ignore - plugin-react will be used if installed by vite's react template
export default defineConfig({
  plugins: [react()],
});
