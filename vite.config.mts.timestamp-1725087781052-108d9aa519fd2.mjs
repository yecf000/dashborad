// vite.config.mts
import Components from "file:///E:/works/pan/node_modules/unplugin-vue-components/dist/vite.js";
import Vue from "file:///E:/works/pan/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Vuetify, { transformAssetUrls } from "file:///E:/works/pan/node_modules/vite-plugin-vuetify/dist/index.mjs";
import ViteFonts from "file:///E:/works/pan/node_modules/unplugin-fonts/dist/vite.mjs";
import VueRouter from "file:///E:/works/pan/node_modules/unplugin-vue-router/dist/vite.js";
import { defineConfig } from "file:///E:/works/pan/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///E:/works/pan/vite.config.mts";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter(),
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss"
      }
    }),
    Components(),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900"
          }
        ]
      }
    })
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"]
  },
  server: {
    port: 8900,
    host: "0.0.0.0",
    proxy: {
      "/xapi": {
        target: "https://pan.goldsgp.com",
        // target: 'http://video-api.51os.xyz/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/xapi/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcd29ya3NcXFxccGFuXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFx3b3Jrc1xcXFxwYW5cXFxcdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi93b3Jrcy9wYW4vdml0ZS5jb25maWcubXRzXCI7Ly8gUGx1Z2luc1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xyXG5pbXBvcnQgVnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IFZ1ZXRpZnksIHsgdHJhbnNmb3JtQXNzZXRVcmxzIH0gZnJvbSBcInZpdGUtcGx1Z2luLXZ1ZXRpZnlcIjtcclxuaW1wb3J0IFZpdGVGb250cyBmcm9tIFwidW5wbHVnaW4tZm9udHMvdml0ZVwiO1xyXG5pbXBvcnQgVnVlUm91dGVyIGZyb20gXCJ1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGVcIjtcclxuXHJcbi8vIFV0aWxpdGllc1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tIFwibm9kZTp1cmxcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgVnVlUm91dGVyKCksXHJcbiAgICBWdWUoe1xyXG4gICAgICB0ZW1wbGF0ZTogeyB0cmFuc2Zvcm1Bc3NldFVybHMgfSxcclxuICAgIH0pLFxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Z1ZXRpZnlqcy92dWV0aWZ5LWxvYWRlci90cmVlL21hc3Rlci9wYWNrYWdlcy92aXRlLXBsdWdpbiNyZWFkbWVcclxuICAgIFZ1ZXRpZnkoe1xyXG4gICAgICBhdXRvSW1wb3J0OiB0cnVlLFxyXG4gICAgICBzdHlsZXM6IHtcclxuICAgICAgICBjb25maWdGaWxlOiBcInNyYy9zdHlsZXMvc2V0dGluZ3Muc2Nzc1wiLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKCksXHJcbiAgICBWaXRlRm9udHMoe1xyXG4gICAgICBnb29nbGU6IHtcclxuICAgICAgICBmYW1pbGllczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlJvYm90b1wiLFxyXG4gICAgICAgICAgICBzdHlsZXM6IFwid2dodEAxMDA7MzAwOzQwMDs1MDA7NzAwOzkwMFwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBkZWZpbmU6IHsgXCJwcm9jZXNzLmVudlwiOiB7fSB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgIH0sXHJcbiAgICBleHRlbnNpb25zOiBbXCIuanNcIiwgXCIuanNvblwiLCBcIi5qc3hcIiwgXCIubWpzXCIsIFwiLnRzXCIsIFwiLnRzeFwiLCBcIi52dWVcIl0sXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDg5MDAsXHJcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcveGFwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6ICdodHRwczovL3Bhbi5zZ2pwbi50b3AnLFxyXG4gICAgICAgIC8vIHRhcmdldDogJ2h0dHA6Ly92aWRlby1hcGkuNTFvcy54eXovJyxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL3hhcGkvLCBcIlwiKVxyXG4gICAgICB9LFxyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVywwQkFBMEI7QUFDNUMsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sZUFBZTtBQUd0QixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGVBQWUsV0FBVztBQVRtRyxJQUFNLDJDQUEyQztBQVl2TCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixJQUFJO0FBQUEsTUFDRixVQUFVLEVBQUUsbUJBQW1CO0FBQUEsSUFDakMsQ0FBQztBQUFBO0FBQUEsSUFFRCxRQUFRO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixRQUFRO0FBQUEsUUFDTixZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLE1BQ1IsUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBLFVBQ1I7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFFBQVE7QUFBQSxVQUNWO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRLEVBQUUsZUFBZSxDQUFDLEVBQUU7QUFBQSxFQUM1QixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsSUFDQSxZQUFZLENBQUMsT0FBTyxTQUFTLFFBQVEsUUFBUSxPQUFPLFFBQVEsTUFBTTtBQUFBLEVBQ3BFO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxTQUFTO0FBQUEsUUFDUCxRQUFRO0FBQUE7QUFBQSxRQUVSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxXQUFXLEVBQUU7QUFBQSxNQUMvQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
