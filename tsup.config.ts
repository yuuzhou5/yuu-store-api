import { defineConfig } from "tsup";

export default defineConfig({
  outDir: "dist",
  format: ["cjs", "esm"],
  entry: ["src/app.ts"],
  dts: true,
});
