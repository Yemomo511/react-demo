"use strict";

import { jsxDEV } from "../jsx";

let React: any;
let ReactDOM: any;
let ReactTestUtils: any;

const preFixString = (testName: string) => {
  return `test: ${testName}`;
};

describe("ReactElement-test", () => {
  let ComponentFC: any;
  let originalSymbol: any;
  //测试环境是否成功
  //所有测试前运行的hook beforeEach

  beforeEach(() => {
    //重置module，防止重复导入
    //https://jestjs.io/zh-Hans/docs/jest-object#jestresetmodules
    jest.resetModules();

    originalSymbol = global.Symbol;

    const ReactDefault: any = require("react");
    React = ReactDefault.default;
    ReactDOM = require("react-dom");
    ReactTestUtils = require("react-dom/test-utils");

    ComponentFC = () => {
      return React.createElement("div");
    };
  });

  afterEach(() => {
    global.Symbol = originalSymbol;
  });

  // it("uses the fallback value when in an environment without Symbol", () => {
  //   console.log(jsxDEV("div", {}).$$typeof)
  //   expect(jsxDEV("div", {}).$$typeof).toBe(0xeac7);
  // });

  it("测试React FunctionComponent返回情况", () => {
    const element = React.createElement(ComponentFC);
    expect(element.type).toBe(ComponentFC);
    expect(element.key).toBe(null);
    expect(element.props).toEqual({});
  });

  it("测试React HostComponent", () => {
    const element = React.createElement("div");
    expect(element.type).toBe("div");
    expect(element.key).toBe(null);
    expect(element.props).toEqual({});
  });

  it("测试React props", () => {
    const element = React.createElement("div", {
      foo: 1,
    });
    expect(element.type).toBe("div");
    expect(element.key).toBe(null);
    expect(element.props).toEqual({ foo: 1 });
  });
  it("测试React child", () => {
    const element = React.createElement("div", {
      children: "aaa",
    });
    expect(element.type).toBe("div");
    expect(element.key).toBe(null);
    expect(element.props).toEqual({ children: "aaa" });
  });

  it("测试 isValidElement", () => {
    function Component() {
      return React.createElement("div");
    }
    expect(React.isValidElement(React.createElement("div"))).toEqual(true);
    expect(React.isValidElement(React.createElement(Component))).toEqual(true);

    expect(React.isValidElement(null)).toEqual(false);
    expect(React.isValidElement(true)).toEqual(false);
    expect(React.isValidElement({})).toEqual(false);
    expect(React.isValidElement("string")).toEqual(false);
    expect(React.isValidElement(Component)).toEqual(false);
    expect(React.isValidElement({ type: "div", props: {} })).toEqual(false);
    const element = React.createElement("div");
    expect(React.isValidElement(element)).toEqual(true);
  });
});
