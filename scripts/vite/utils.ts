import path from "path";
import fs from "fs";
import typescript from "@rollup/plugin-typescript";
import commonJS from "@rollup/plugin-commonjs";
import ts from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
const packagePath = path.resolve(__dirname, "../../packages");
const distPath = path.resolve(__dirname, "../../dist/node_modules");

//获取输出基础路径
export function getPackagePathName(pak: string, isDist = false) {
  if (isDist) {
    return `${distPath}/${pak}`;
  } else {
    return `${packagePath}/${pak}`;
  }
}
export function getPackageJson(pck: string) {
  const bathUrl = getPackagePathName(pck);
  const jsonUrl = `${bathUrl}/package.json`;
  const file = fs.readFileSync(jsonUrl, {
    encoding: "utf-8",
  });
  return JSON.parse(file);
}

//返回一个plugin数组，方便使用
export function getCommonPlugin({
  typescriptConfig = {},
  inputBath = "",
  outputBath = "",
} = {}) {
  return [
    commonJS(),
    ts(typescriptConfig),
    replace({
      __DEV__: true,
    }),
    //导出package.json说明包的一些信息，且这是个包
  ];
}
