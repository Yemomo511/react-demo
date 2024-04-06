import { jsxDEV } from "./src/jsx";
import { createFiberWithReactElement } from "react-reconciler/src/fiber";
import reactReconciler from "react-reconciler";
import currentDispatcher, {
  Dispatcher,
  resolveDispatcher,
} from "./src/currentDispatcher";
//打包后成为react包，导出createReactElement 即 React.createReactElement ,
//babel 会吧jsx 转换 例如<div>aaa</div> 为React.createReactElement("div",{},"aaa")
//通过我们自定义的方法就可以生成ReactElement

export const useState: Dispatcher["useState"] = (initialState) => {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
};

//內部currentDispatcher共享
export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
  currentDispatcher,
};

export default {
  version: "0.0.0",
  createElement: jsxDEV,
  createFiberWithReactElement,
  reactReconciler,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
};
