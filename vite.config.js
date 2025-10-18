import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        short_name: "Meet",
        name: "Meet App",
        icons: [
          {
            src: "/meet-app-144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/meet-app-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/meet-app-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
      },
    }),
  ],
});
