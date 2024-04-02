import generatePackageJson from "rollup-plugin-generate-package-json";
import { getCommonPlugin, getPackageJson, getPackagePathName } from "./utils";
import alias from "@rollup/plugin-alias";

const { module, name } = getPackageJson("react-dom");
const devBath = getPackagePathName(name);
const buildBath = getPackagePathName(name, true);

const config = [
  {
    input: `${devBath}/${module}`,
    output: [
      {
        file: `${buildBath}/index.js`,
        name: "index.js",
        format: "umd",
      },
      {
        file: `${buildBath}/client.js`,
        name: "client.js",
        format: "umd",
      },
    ],
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
];

export default config;
