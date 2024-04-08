import { defaults } from "jest-config";
import type { Config } from "jest";
const config: Config = {
  ...defaults,
  rootDir: process.cwd(),
  modulePathIgnorePatterns: ["<rootDir>/.history"],
  //适用范围
  roots: ["<rootDir>/packages"],
  moduleDirectories: ["dist/node_modules", ...defaults.moduleDirectories],
  testEnvironment: "jsdom",
};

export default config;
