import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
import { getPackagePathName } from "./utils";
import path from "path";
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      replace({
        __DEV__: true,
        preventAssignment: true,
      }),
    ],
    //打包方式
    resolve: {
      alias: [
        {
          find: "react",
          replacement: getPackagePathName("react",true),
        },
        {
          find: "react-dom",
          replacement: getPackagePathName("react-dom"),
        },
        {
          find: "hostConfig",
          replacement: path.resolve(
            getPackagePathName("react-dom"),
            './src/hostConfig.ts',
          ),
        },
      ],
    },
  };
});
