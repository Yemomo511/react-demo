import {
  Key,
  Props,
  ReactElementType,
  Ref,
  ElementType,
} from "shared/ReactElementTypes";
import { REACT_ELEMENT_TYPE } from "shared/ReactSymbol";

//创建ReactElement，具体处理
export const ReactElement = function (
  type: ElementType,
  props: Props,
  ref: Ref,
  key: Key,
): ReactElementType {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    props,
    ref,
    key,
    __mark: "yemomo",
  };
};

//此jsx遵循Classic模式，详细参考
//https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=DwEwlgbgBA1gpgTwLwCICGGVRGgLm1AI0KwHsA7AYQBswBjGVAbwzQF8UA-VjYAenAROQA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.24.3&externalPlugins=&assumptions=%7B%7D

//jsx转换为ReactElement
export const jsxPro = function (
  type: ElementType,
  config: any,
  ...children: any
) {
  const props: Props = {};
  let ref: Ref = null;
  let key: Key = null;

  //处理props
  for (const prop in config) {
    const value = config[prop];
    if (key == "key") {
      if (value != undefined) {
        key = "" + value; // key 转换为字符串
      }
      continue;
    } else if (key == "ref") {
      if (value != undefined) {
        ref = value;
      }
    } else {
      //判断是否是原型上的，考虑对象赋值的时候需要考虑这一点
      if ({}.hasOwnProperty.call(config, prop)) {
        props[prop] = value;
      }
    }
  }

  //处理children
  //思想 children可能为一个子children 或者 多个 children事实上就是ReactElement
  const childrenLength = children.length;
  if (childrenLength) {
    if (childrenLength == 1) {
      props.children = children[0];
    } else {
      props.children = children;
    }
  }

  return ReactElement(type, props, ref, key);
};

export const jsxDEV = (type: ElementType, config: any) => {
  let key: Key = null;
  let ref: Ref = null;
  const props: Props = {};

  for (const prop in config) {
    const value = config[prop];
    if (prop == "key") {
      if (value != undefined) {
        key = value + "";
      }
    }
    if (prop == "ref") {
      if (value != undefined) {
        ref = value;
      }
    }
    if ({}.hasOwnProperty.call(config, prop)) {
      //config中有children 会是config
      props[prop] = value;
    }
  }
  return ReactElement(type, props, ref, key);
};

export const isValidReactElement = (object: any) => {
  return (
    typeof object === "object" &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
};
export const jsx = jsxDEV;

export const jsxs = jsxDEV;
