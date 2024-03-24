import { jsxDEV } from "./src/jsx";

//打包后成为react包，导出createReactElement 即 React.createReactElement ,
//babel 会吧jsx 转换 例如<div>aaa</div> 为React.createReactElement("div",{},"aaa")
//通过我们自定义的方法就可以生成ReactElement
export default {
  version: "0.0.0",
  createElement: jsxDEV,
};