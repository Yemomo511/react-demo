//react打包配置,根据package 的 name字段来解析对应的包，同时进行打包

import { getCommonPlugin, getPackageJson, getPackagePathName } from "./utils";
import generatePackageJson from "rollup-plugin-generate-package-json";
//rollup 打包为一个数组 ，数组里面每一个都是一个流程
/*{
    input:
    output:
    plugin
}*/

//两个问题 1.怎么获得我要打包的路径，2.怎么获得我输出的路径
//首先package.json的name不刚刚好能告诉我们哪个路径可以打包 即 packages/{name}

const { name, module } = getPackageJson("react");
const inputBath = getPackagePathName(name);
const outputBath = getPackagePathName(name, true);
console.log(`${inputBath}/package.json`)
//info: 打包一般只打包一个文件，即入口文件，其他文件都会被耦合到那个文件中
export default [
  {
    input: `${inputBath}/${module}`,
    output: {
      file: `${outputBath}/index.js`,
      name: "index.js",
      //兼容commonjs导入和esmodule导入
      format: "umd",
    },
    plugins: [
      ...getCommonPlugin(),
      //导出package.json说明包的一些信息，且这是个包
      generatePackageJson({
        inputFolder: inputBath,
        outputFolder: outputBath,
        baseContents: ({ name, version, description }) => {
          return {
            name,
            version,
            description,
            //umd 支持commonjs和esmodule
            main: "index.js",
          };
        },
      }),
    ],
  },
  {
    //参考https://babeljs.io/docs/babel-plugin-transform-react-jsx
    //遵循官方定义定义jsx
    input: `${inputBath}/src/jsx.ts`,
    output: [
      //jsx-runtime
      {
        file: `${outputBath}/jsx-runtime.js`,
        name: "jsx-runtime.js",
        format: "umd",
      },
      //dev-runtime
      {
        file: `${outputBath}/jsx-dev-runtime.js`,
        name: "jsx-dev-runtime.js",
        format: "umd",
      },
    ],
    plugins: getCommonPlugin(),
  },
  //导出json
];
