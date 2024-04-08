import generatePackageJson from "rollup-plugin-generate-package-json";
import { getCommonPlugin, getPackageJson, getPackagePathName } from "./utils";
import alias from "@rollup/plugin-alias";

const { module, name, peerDependencies } = getPackageJson("react-dom");
const devBath = getPackagePathName(name);
const buildBath = getPackagePathName(name, true);

const config = [
  {
    input: `${devBath}/${module}`,
    output: [
      {
        file: `${buildBath}/index.js`,
        name: "ReactDOM",
        format: "umd",
      },
      {
        file: `${buildBath}/client.js`,
        name: "client",
        format: "umd",
      },
    ],
    external: [...Object.keys(peerDependencies)],
    plugins: [
      ...getCommonPlugin(),
      //import hostConfig from "react-dom/hostConfig"
      alias({
        entries: {
          hostConfig: `${devBath}/src/hostConfig.ts`,
        },
      }),
      generatePackageJson({
        inputFolder: devBath,
        outputFolder: buildBath,
        baseContents: ({ name, version, description }) => {
          return {
            name,
            version,
            description,
            main: "index.js",
            peerDependencies: {
              react: version,
            },
          };
        },
      }),
    ],
  },
  //react-test-utils //测试模块
  {
    input: `${devBath}/test-utils.ts`,
    output: [
      {
        file: `${buildBath}/test-utils.js`,
        name: "testUtils",
        format: "umd",
      },
    ],
    external: ["react-dom", "react"],
    plugins: [...getCommonPlugin()],
  },
];

export default config;
