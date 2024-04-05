import { defineConfig } from "vite";
import viteBaseConfig from "./vite.base.config";
import viteDevConfig from "./vite.dev.config";
import viteProConfig from "./vite.pro.config";
export default defineConfig((params) => {
  const { command } = params;
  const envConfig = command === "serve" ? viteDevConfig : viteProConfig;
  return {
    ...viteBaseConfig(params),
    ...envConfig(params),
  };
});
