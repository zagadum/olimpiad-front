import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const isDebug = env.VITE_DEBUG_MODE === "true";
  return {
    plugins: [react()],
    server: {
      host: false,
      proxy: {
        "/api": isDebug
          ? "https://api-memory.firm.kiev.ua"
          : "https://olymp-space.com",
      },
    },
    build: {
      outDir: "build",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
