"use strict";

let React: any;
let ReactDOM: any;
let ReactTestUtils: any;

const preFixString = (testName: string) => {
  return `test: ${testName}`;
};

describe("ReactElement-test", () => {
  let ComponentFC;
  let originalSymbol;
  //测试环境是否成功
  //所有测试前运行的hook beforeEach

  beforeEach(() => {
    //重置module，防止重复导入
    //https://jestjs.io/zh-Hans/docs/jest-object#jestresetmodules
    jest.resetModules();

    originalSymbol = global.Symbol;

    React = require("react");
    ReactDOM = require("react-dom");
    ReactTestUtils = require("react-dom/test-utils");

    ComponentFC = () => {
      return React.createElement("div");
    };
  });

  it("uses the fallback value when in an environment without Symbol", () => {
    expect(true).toBe(true);
  });
});
