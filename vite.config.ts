import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "LidinAppKit",
      fileName: "lidin-app-kit",
    },
    rollupOptions: {
      external: [
        "vue",
        "vue-draggable",
        "lodash-es",
        "markdown-it",
        "vuetify",
        "vue-i18n",
        "pinia",
        "pinia-plugin-persistedstate",
        "zod",
        "uuid"
      ],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      // "@": path.resolve(__dirname, "src"), we don't do that because lib can be use in hot project with hot reload (alias)
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "src/styles/lidin-app-kit.scss" as *;
        `,
      },
    },
  },
});
