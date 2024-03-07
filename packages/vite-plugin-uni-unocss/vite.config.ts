
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";


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
      formats: ["cjs"],
      fileName: (format, entryName) => {
        return entryName + ".js";
      },
    },
    rollupOptions: {
      external: ['fs'],
      output: {
        preserveModules: true,
      },
    },
  },
});
