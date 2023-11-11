import { defineConfig } from "vite";
import {resolve }from 'path';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "", // 引入多个文件以；分割
      },
    },
  },
  resolve: {
    // ↓路径别名
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  server: {
    cors: true,
    proxy: {
      "/apis": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true,
        //rewrite: (path) => path.replace(/^\/apis/, '')
      },
    },
  },
});

function pathResolver(dir: string) {
  return resolve(process.cwd(),  '.', dir)
}
