
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import pkg from "./package.json";
const external: Array<string | RegExp> = Object.keys(pkg.dependencies);

export default defineConfig({
  esbuild: {
    drop: ["console", "debugger"],
  },
  plugins: [
    dts({
      entryRoot: resolve(__dirname, "src"),
    }),
  ],
  build: {
    outDir: "es",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "./src/index.ts"),
      formats: ["es"],
      fileName: (format, entryName) => {
        return entryName + ".js";
      },
    },
    rollupOptions: {
      external: external,
      output: {
        preserveModules: true,
      },
    },
  },
});
