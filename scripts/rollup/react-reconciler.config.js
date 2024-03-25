//react-reconciler-config的打包

import generatePackageJson from "rollup-plugin-generate-package-json";
import { getCommonPlugin, getPackageJson, getPackagePathName } from "./utils";
const { module, name } = getPackageJson("react-reconciler");
console.log(name, module);
const devBath = getPackagePathName(name);
const buildBath = getPackagePathName(name, true);

console.log(module);
const config = [
  {
    input: `${devBath}/${module}`,
    output: {
      file: `${buildBath}/index.js`,
      name: "index.js",
      format: "umd",
    },
    plugins: [
      ...getCommonPlugin(),
      generatePackageJson({
        inputFolder: devBath,
        outputFolder: buildBath,
        baseContents: ({ name, version, description }) => {
          return {
            name,
            version,
            description,
            main: "index.js",
          };
        },
      }),
    ],
  },
];

export default config;
