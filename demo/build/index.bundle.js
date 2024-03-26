(self["webpackChunkdemo"] = self["webpackChunkdemo"] || []).push([["index"],{

/***/ "../dist/node_modules/react/index.js":
/*!*******************************************!*\
  !*** ../dist/node_modules/react/index.js ***!
  \*******************************************/
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  //由于reactElement $$typeof很特殊，因此定义为一个symbol类型作为独一无法的标识，防止ReactElement被滥用
  //Symbol会产生一个唯一的值，symbol.for()会在全局产生一个唯一的值
  const supportSymbol = typeof Symbol === "function" && Symbol.for;
  const REACT_ELEMENT_TYPE = supportSymbol
      ? Symbol.for("react-element")
      : 0xeac7;

  //创建ReactElement，具体处理
  const ReactElement = function (type, props, ref, key) {
      return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          props,
          ref,
          key,
          __mark: "yemomo",
      };
  };
  const jsxDEV = (type, config) => {
      let key = null;
      let ref = null;
      const props = {};
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

  //Fiber的组件类型
  const FunctionComponent = 0;
  //  A DOM element.
  const HostComponent = 4;

  //集中副作用的定义，采用2进制表示
  //缺少就补
  /**
   * 在JavaScript和TypeScript中，|= 是一个位运算赋值操作符，它执行按位或（bitwise OR）操作并赋值。

   * 这是它的工作方式：

   * 它首先将左操作数和右操作数转换为32位二进制数。
   * 然后，它对这两个二进制数执行按位或操作。按位或操作的规则是，如果两个相应的二进制位中至少有一个为1，则结果为1，否则为0。
   * 最后，它将结果赋值给左操作数。
   * 例如，假设fiber.flags的值为2（在二进制中为10），并且Placement的值为1（在二进制中为01）。那么fiber.flags |= Placement;将fiber.flags的值更新为3（在二进制中为11）。
   *
   *
   * 例如fiber.flags == NoFlags 现在执行 fiber.flags |= Placement 为 0x00000011
   * 现在有一个更新操作 fiber.flags |= Update 为 0x00000111
   * 处理时读位即可
   *
   */
  const NoFlags = /*                      */ 0b00000001;

  //定义fiber结构
  class FiberNode {
      // 对于 FunctionComponent，指函数本身()=>{}这种,对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
      type;
      // Fiber对应组件的类型 Function/Class/Host...
      tag;
      pendingProps; //更改的属性
      key;
      stateNode; //真实dom
      ref;
      //节点定义，详细参考Fiber树
      return;
      child;
      sibling;
      index; //标注兄弟元素中排名多少
      //update的标注
      subtreeFlags;
      flags;
      memorizedProps;
      memorizedState; // memorizedState有很多情况
      alternate;
      //TODO: 后期再实现 
      //参考https://kasong.gitee.io/just-react/state/update.html#updatequeue
      updateQueue;
      //优先级相关,后期标注为Lane
      lanes;
      //构造时有type props key
      constructor(tag, pendingProps, key) {
          this.tag = tag;
          this.key = key;
          this.stateNode = null;
          this.type = null;
          //节点构成
          this.return = null;
          this.sibling = null;
          this.child = null;
          this.index = 0;
          this.ref = null;
          //工作单元
          this.pendingProps = pendingProps;
          this.memorizedProps = null;
          //对应的current，互相链接
          this.alternate = null;
          //副作用，确定本次更新该干什么
          this.flags = NoFlags;
          this.subtreeFlags = NoFlags;
          this.lanes = null;
      }
  }

  //请参考https://kasong.gitee.io/just-react/process/fiber.html#fiber%E7%9A%84%E7%BB%93%E6%9E%84
  //React 采用DFS来遍历构成Fiber树，
  //reconclier的render阶段会根据fiberNode构建子Fiber
  //beginWork为DFS的递阶段 ，completework为DFS的归阶段
  const createFiberWithReactElement = (reactElement) => {
      const { type, props, key, ref } = reactElement;
      const fiber = new FiberNode(HostComponent, props, key);
      if (typeof type === "string") {
          fiber.tag = HostComponent;
      }
      else if (typeof type === "function") {
          fiber.tag = FunctionComponent;
      }
      else {
          {
              console.error("未知定义的type类型", reactElement);
          }
      }
      fiber.type = type;
      fiber.key = key;
      fiber.ref = ref;
      return fiber;
  };

  //打包后成为react包，导出createReactElement 即 React.createReactElement ,
  //babel 会吧jsx 转换 例如<div>aaa</div> 为React.createReactElement("div",{},"aaa")
  //通过我们自定义的方法就可以生成ReactElement
  var index = {
      version: "0.0.0",
      createElement: jsxDEV,
      createFiberWithReactElement
  };

  return index;

}));


/***/ }),

/***/ "../dist/node_modules/react/jsx-runtime.js":
/*!*************************************************!*\
  !*** ../dist/node_modules/react/jsx-runtime.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
   true ? factory(exports) :
  0;
})(this, (function (exports) { 'use strict';

  //由于reactElement $$typeof很特殊，因此定义为一个symbol类型作为独一无法的标识，防止ReactElement被滥用
  //Symbol会产生一个唯一的值，symbol.for()会在全局产生一个唯一的值
  const supportSymbol = typeof Symbol === "function" && Symbol.for;
  const REACT_ELEMENT_TYPE = supportSymbol
      ? Symbol.for("react-element")
      : 0xeac7;

  //创建ReactElement，具体处理
  const ReactElement = function (type, props, ref, key) {
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
  const jsxPro = function (type, config, ...children) {
      const props = {};
      let ref = null;
      let key = null;
      //处理props
      for (const prop in config) {
          const value = config[prop];
          {
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
          }
          else {
              props.children = children;
          }
      }
      return ReactElement(type, props, ref, key);
  };
  const jsxDEV = (type, config) => {
      let key = null;
      let ref = null;
      const props = {};
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
  const jsx = jsxDEV;
  const jsxs = jsxDEV;

  exports.ReactElement = ReactElement;
  exports.jsx = jsx;
  exports.jsxDEV = jsxDEV;
  exports.jsxPro = jsxPro;
  exports.jsxs = jsxs;

}));


/***/ }),

/***/ "./index.tsx":
/*!*******************!*\
  !*** ./index.tsx ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../dist/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "../dist/node_modules/react/jsx-runtime.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


// const ba =  (<div>aaa</div>)

console.log((react__WEBPACK_IMPORTED_MODULE_0___default()));
console.log("hello world");
var jsx = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("p", {
  children: ["aaa", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    children: "bbb"
  })]
});
console.log(jsx);
console.log(react__WEBPACK_IMPORTED_MODULE_0___default().createFiberWithReactElement(jsx));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./index.tsx"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxFQUFFLEtBQTREO0FBQzlELEVBQUUsQ0FDNEk7QUFDOUksQ0FBQyx1QkFBdUI7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlGQUF5RjtBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyx3QkFBd0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7QUM5SkQ7QUFDQSxFQUFFLEtBQTREO0FBQzlELEVBQUUsQ0FDeUs7QUFDM0ssQ0FBQyw4QkFBOEI7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RnlCOztBQUUxQjtBQUFBO0FBQ0FLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTiw4Q0FBSyxDQUFDO0FBQ2xCSyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFDMUIsSUFBTUwsR0FBRyxnQkFBR0csdURBQUE7RUFBQUcsUUFBQSxHQUFHLEtBQUcsZUFBQUwsc0RBQUE7SUFBQUssUUFBQSxFQUFLO0VBQUcsQ0FBSyxDQUFDO0FBQUEsQ0FBRyxDQUFDO0FBQ3BDRixPQUFPLENBQUNDLEdBQUcsQ0FBQ0wsR0FBRyxDQUFDO0FBQ2hCSSxPQUFPLENBQUNDLEdBQUcsQ0FBQ04sd0VBQWlDLENBQUNDLEdBQUcsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGVtby8uLi9kaXN0L25vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kZW1vLy4uL2Rpc3Qvbm9kZV9tb2R1bGVzL3JlYWN0L2pzeC1ydW50aW1lLmpzIiwid2VicGFjazovL2RlbW8vLi9pbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCAoZ2xvYmFsLmluZGV4ID0gZ2xvYmFsLmluZGV4IHx8IHt9LCBnbG9iYWwuaW5kZXguanMgPSBmYWN0b3J5KCkpKTtcbn0pKHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAvL+eUseS6jnJlYWN0RWxlbWVudCAkJHR5cGVvZuW+iOeJueauiu+8jOWboOatpOWumuS5ieS4uuS4gOS4qnN5bWJvbOexu+Wei+S9nOS4uueLrOS4gOaXoOazleeahOagh+ivhu+8jOmYsuatolJlYWN0RWxlbWVudOiiq+a7peeUqFxuICAvL1N5bWJvbOS8muS6p+eUn+S4gOS4quWUr+S4gOeahOWAvO+8jHN5bWJvbC5mb3IoKeS8muWcqOWFqOWxgOS6p+eUn+S4gOS4quWUr+S4gOeahOWAvFxuICBjb25zdCBzdXBwb3J0U3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5mb3I7XG4gIGNvbnN0IFJFQUNUX0VMRU1FTlRfVFlQRSA9IHN1cHBvcnRTeW1ib2xcbiAgICAgID8gU3ltYm9sLmZvcihcInJlYWN0LWVsZW1lbnRcIilcbiAgICAgIDogMHhlYWM3O1xuXG4gIC8v5Yib5bu6UmVhY3RFbGVtZW5077yM5YW35L2T5aSE55CGXG4gIGNvbnN0IFJlYWN0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBwcm9wcywgcmVmLCBrZXkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIHByb3BzLFxuICAgICAgICAgIHJlZixcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgX19tYXJrOiBcInllbW9tb1wiLFxuICAgICAgfTtcbiAgfTtcbiAgY29uc3QganN4REVWID0gKHR5cGUsIGNvbmZpZykgPT4ge1xuICAgICAgbGV0IGtleSA9IG51bGw7XG4gICAgICBsZXQgcmVmID0gbnVsbDtcbiAgICAgIGNvbnN0IHByb3BzID0ge307XG4gICAgICBmb3IgKGNvbnN0IHByb3AgaW4gY29uZmlnKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBjb25maWdbcHJvcF07XG4gICAgICAgICAgaWYgKHByb3AgPT0gXCJrZXlcIikge1xuICAgICAgICAgICAgICBpZiAodmFsdWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICBrZXkgPSB2YWx1ZSArIFwiXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHByb3AgPT0gXCJyZWZcIikge1xuICAgICAgICAgICAgICBpZiAodmFsdWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICByZWYgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3ApKSB7XG4gICAgICAgICAgICAgIC8vY29uZmln5Lit5pyJY2hpbGRyZW4g5Lya5pivY29uZmlnXG4gICAgICAgICAgICAgIHByb3BzW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFJlYWN0RWxlbWVudCh0eXBlLCBwcm9wcywgcmVmLCBrZXkpO1xuICB9O1xuXG4gIC8vRmliZXLnmoTnu4Tku7bnsbvlnotcbiAgY29uc3QgRnVuY3Rpb25Db21wb25lbnQgPSAwO1xuICAvLyAgQSBET00gZWxlbWVudC5cbiAgY29uc3QgSG9zdENvbXBvbmVudCA9IDQ7XG5cbiAgLy/pm4bkuK3lia/kvZznlKjnmoTlrprkuYnvvIzph4fnlKgy6L+b5Yi26KGo56S6XG4gIC8v57y65bCR5bCx6KGlXG4gIC8qKlxuICAgKiDlnKhKYXZhU2NyaXB05ZKMVHlwZVNjcmlwdOS4re+8jHw9IOaYr+S4gOS4quS9jei/kOeul+i1i+WAvOaTjeS9nOespu+8jOWug+aJp+ihjOaMieS9jeaIlu+8iGJpdHdpc2UgT1LvvInmk43kvZzlubbotYvlgLzjgIJcblxuICAgKiDov5nmmK/lroPnmoTlt6XkvZzmlrnlvI/vvJpcblxuICAgKiDlroPpppblhYjlsIblt6bmk43kvZzmlbDlkozlj7Pmk43kvZzmlbDovazmjaLkuLozMuS9jeS6jOi/m+WItuaVsOOAglxuICAgKiDnhLblkI7vvIzlroPlr7nov5nkuKTkuKrkuozov5vliLbmlbDmiafooYzmjInkvY3miJbmk43kvZzjgILmjInkvY3miJbmk43kvZznmoTop4TliJnmmK/vvIzlpoLmnpzkuKTkuKrnm7jlupTnmoTkuozov5vliLbkvY3kuK3oh7PlsJHmnInkuIDkuKrkuLox77yM5YiZ57uT5p6c5Li6Me+8jOWQpuWImeS4ujDjgIJcbiAgICog5pyA5ZCO77yM5a6D5bCG57uT5p6c6LWL5YC857uZ5bem5pON5L2c5pWw44CCXG4gICAqIOS+i+Wmgu+8jOWBh+iuvmZpYmVyLmZsYWdz55qE5YC85Li6Mu+8iOWcqOS6jOi/m+WItuS4reS4ujEw77yJ77yM5bm25LiUUGxhY2VtZW5055qE5YC85Li6Me+8iOWcqOS6jOi/m+WItuS4reS4ujAx77yJ44CC6YKj5LmIZmliZXIuZmxhZ3MgfD0gUGxhY2VtZW50O+WwhmZpYmVyLmZsYWdz55qE5YC85pu05paw5Li6M++8iOWcqOS6jOi/m+WItuS4reS4ujEx77yJ44CCXG4gICAqXG4gICAqXG4gICAqIOS+i+WmgmZpYmVyLmZsYWdzID09IE5vRmxhZ3Mg546w5Zyo5omn6KGMIGZpYmVyLmZsYWdzIHw9IFBsYWNlbWVudCDkuLogMHgwMDAwMDAxMVxuICAgKiDnjrDlnKjmnInkuIDkuKrmm7TmlrDmk43kvZwgZmliZXIuZmxhZ3MgfD0gVXBkYXRlIOS4uiAweDAwMDAwMTExXG4gICAqIOWkhOeQhuaXtuivu+S9jeWNs+WPr1xuICAgKlxuICAgKi9cbiAgY29uc3QgTm9GbGFncyA9IC8qICAgICAgICAgICAgICAgICAgICAgICovIDBiMDAwMDAwMDE7XG5cbiAgLy/lrprkuYlmaWJlcue7k+aehFxuICBjbGFzcyBGaWJlck5vZGUge1xuICAgICAgLy8g5a+55LqOIEZ1bmN0aW9uQ29tcG9uZW5077yM5oyH5Ye95pWw5pys6LqrKCk9Pnt96L+Z56eNLOWvueS6jkNsYXNzQ29tcG9uZW5077yM5oyHY2xhc3PvvIzlr7nkuo5Ib3N0Q29tcG9uZW5077yM5oyHRE9N6IqC54K5dGFnTmFtZVxuICAgICAgdHlwZTtcbiAgICAgIC8vIEZpYmVy5a+55bqU57uE5Lu255qE57G75Z6LIEZ1bmN0aW9uL0NsYXNzL0hvc3QuLi5cbiAgICAgIHRhZztcbiAgICAgIHBlbmRpbmdQcm9wczsgLy/mm7TmlLnnmoTlsZ7mgKdcbiAgICAgIGtleTtcbiAgICAgIHN0YXRlTm9kZTsgLy/nnJ/lrp5kb21cbiAgICAgIHJlZjtcbiAgICAgIC8v6IqC54K55a6a5LmJ77yM6K+m57uG5Y+C6ICDRmliZXLmoJFcbiAgICAgIHJldHVybjtcbiAgICAgIGNoaWxkO1xuICAgICAgc2libGluZztcbiAgICAgIGluZGV4OyAvL+agh+azqOWFhOW8n+WFg+e0oOS4reaOkuWQjeWkmuWwkVxuICAgICAgLy91cGRhdGXnmoTmoIfms6hcbiAgICAgIHN1YnRyZWVGbGFncztcbiAgICAgIGZsYWdzO1xuICAgICAgbWVtb3JpemVkUHJvcHM7XG4gICAgICBtZW1vcml6ZWRTdGF0ZTsgLy8gbWVtb3JpemVkU3RhdGXmnInlvojlpJrmg4XlhrVcbiAgICAgIGFsdGVybmF0ZTtcbiAgICAgIC8vVE9ETzog5ZCO5pyf5YaN5a6e546wIFxuICAgICAgLy/lj4LogINodHRwczovL2thc29uZy5naXRlZS5pby9qdXN0LXJlYWN0L3N0YXRlL3VwZGF0ZS5odG1sI3VwZGF0ZXF1ZXVlXG4gICAgICB1cGRhdGVRdWV1ZTtcbiAgICAgIC8v5LyY5YWI57qn55u45YWzLOWQjuacn+agh+azqOS4ukxhbmVcbiAgICAgIGxhbmVzO1xuICAgICAgLy/mnoTpgKDml7bmnIl0eXBlIHByb3BzIGtleVxuICAgICAgY29uc3RydWN0b3IodGFnLCBwZW5kaW5nUHJvcHMsIGtleSkge1xuICAgICAgICAgIHRoaXMudGFnID0gdGFnO1xuICAgICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICAgIHRoaXMuc3RhdGVOb2RlID0gbnVsbDtcbiAgICAgICAgICB0aGlzLnR5cGUgPSBudWxsO1xuICAgICAgICAgIC8v6IqC54K55p6E5oiQXG4gICAgICAgICAgdGhpcy5yZXR1cm4gPSBudWxsO1xuICAgICAgICAgIHRoaXMuc2libGluZyA9IG51bGw7XG4gICAgICAgICAgdGhpcy5jaGlsZCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgICAgdGhpcy5yZWYgPSBudWxsO1xuICAgICAgICAgIC8v5bel5L2c5Y2V5YWDXG4gICAgICAgICAgdGhpcy5wZW5kaW5nUHJvcHMgPSBwZW5kaW5nUHJvcHM7XG4gICAgICAgICAgdGhpcy5tZW1vcml6ZWRQcm9wcyA9IG51bGw7XG4gICAgICAgICAgLy/lr7nlupTnmoRjdXJyZW5077yM5LqS55u46ZO+5o6lXG4gICAgICAgICAgdGhpcy5hbHRlcm5hdGUgPSBudWxsO1xuICAgICAgICAgIC8v5Ymv5L2c55So77yM56Gu5a6a5pys5qyh5pu05paw6K+l5bmy5LuA5LmIXG4gICAgICAgICAgdGhpcy5mbGFncyA9IE5vRmxhZ3M7XG4gICAgICAgICAgdGhpcy5zdWJ0cmVlRmxhZ3MgPSBOb0ZsYWdzO1xuICAgICAgICAgIHRoaXMubGFuZXMgPSBudWxsO1xuICAgICAgfVxuICB9XG5cbiAgLy/or7flj4LogINodHRwczovL2thc29uZy5naXRlZS5pby9qdXN0LXJlYWN0L3Byb2Nlc3MvZmliZXIuaHRtbCNmaWJlciVFNyU5QSU4NCVFNyVCQiU5MyVFNiU5RSU4NFxuICAvL1JlYWN0IOmHh+eUqERGU+adpemBjeWOhuaehOaIkEZpYmVy5qCR77yMXG4gIC8vcmVjb25jbGllcueahHJlbmRlcumYtuauteS8muagueaNrmZpYmVyTm9kZeaehOW7uuWtkEZpYmVyXG4gIC8vYmVnaW5Xb3Jr5Li6REZT55qE6YCS6Zi25q61IO+8jGNvbXBsZXRld29ya+S4ukRGU+eahOW9kumYtuautVxuICBjb25zdCBjcmVhdGVGaWJlcldpdGhSZWFjdEVsZW1lbnQgPSAocmVhY3RFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCB7IHR5cGUsIHByb3BzLCBrZXksIHJlZiB9ID0gcmVhY3RFbGVtZW50O1xuICAgICAgY29uc3QgZmliZXIgPSBuZXcgRmliZXJOb2RlKEhvc3RDb21wb25lbnQsIHByb3BzLCBrZXkpO1xuICAgICAgaWYgKHR5cGVvZiB0eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgZmliZXIudGFnID0gSG9zdENvbXBvbmVudDtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiB0eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBmaWJlci50YWcgPSBGdW5jdGlvbkNvbXBvbmVudDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuacquefpeWumuS5ieeahHR5cGXnsbvlnotcIiwgcmVhY3RFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaWJlci50eXBlID0gdHlwZTtcbiAgICAgIGZpYmVyLmtleSA9IGtleTtcbiAgICAgIGZpYmVyLnJlZiA9IHJlZjtcbiAgICAgIHJldHVybiBmaWJlcjtcbiAgfTtcblxuICAvL+aJk+WMheWQjuaIkOS4unJlYWN05YyF77yM5a+85Ye6Y3JlYXRlUmVhY3RFbGVtZW50IOWNsyBSZWFjdC5jcmVhdGVSZWFjdEVsZW1lbnQgLFxuICAvL2JhYmVsIOS8muWQp2pzeCDovazmjaIg5L6L5aaCPGRpdj5hYWE8L2Rpdj4g5Li6UmVhY3QuY3JlYXRlUmVhY3RFbGVtZW50KFwiZGl2XCIse30sXCJhYWFcIilcbiAgLy/pgJrov4fmiJHku6zoh6rlrprkuYnnmoTmlrnms5XlsLHlj6/ku6XnlJ/miJBSZWFjdEVsZW1lbnRcbiAgdmFyIGluZGV4ID0ge1xuICAgICAgdmVyc2lvbjogXCIwLjAuMFwiLFxuICAgICAgY3JlYXRlRWxlbWVudDoganN4REVWLFxuICAgICAgY3JlYXRlRmliZXJXaXRoUmVhY3RFbGVtZW50XG4gIH07XG5cbiAgcmV0dXJuIGluZGV4O1xuXG59KSk7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGZhY3RvcnkoKGdsb2JhbFtcImpzeC1ydW50aW1lXCJdID0gZ2xvYmFsW1wianN4LXJ1bnRpbWVcIl0gfHwge30sIGdsb2JhbFtcImpzeC1ydW50aW1lXCJdLmpzID0ge30pKSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIC8v55Sx5LqOcmVhY3RFbGVtZW50ICQkdHlwZW9m5b6I54m55q6K77yM5Zug5q2k5a6a5LmJ5Li65LiA5Liqc3ltYm9s57G75Z6L5L2c5Li654us5LiA5peg5rOV55qE5qCH6K+G77yM6Ziy5q2iUmVhY3RFbGVtZW506KKr5rul55SoXG4gIC8vU3ltYm9s5Lya5Lqn55Sf5LiA5Liq5ZSv5LiA55qE5YC877yMc3ltYm9sLmZvcigp5Lya5Zyo5YWo5bGA5Lqn55Sf5LiA5Liq5ZSv5LiA55qE5YC8XG4gIGNvbnN0IHN1cHBvcnRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLmZvcjtcbiAgY29uc3QgUkVBQ1RfRUxFTUVOVF9UWVBFID0gc3VwcG9ydFN5bWJvbFxuICAgICAgPyBTeW1ib2wuZm9yKFwicmVhY3QtZWxlbWVudFwiKVxuICAgICAgOiAweGVhYzc7XG5cbiAgLy/liJvlu7pSZWFjdEVsZW1lbnTvvIzlhbfkvZPlpITnkIZcbiAgY29uc3QgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIHByb3BzLCByZWYsIGtleSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgcHJvcHMsXG4gICAgICAgICAgcmVmLFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICBfX21hcms6IFwieWVtb21vXCIsXG4gICAgICB9O1xuICB9O1xuICAvL+atpGpzeOmBteW+qkNsYXNzaWPmqKHlvI/vvIzor6bnu4blj4LogINcbiAgLy9odHRwczovL2JhYmVsanMuaW8vcmVwbCM/YnJvd3NlcnM9ZGVmYXVsdHMlMkMlMjBub3QlMjBpZSUyMDExJTJDJTIwbm90JTIwaWVfbW9iJTIwMTEmYnVpbGQ9JmJ1aWx0SW5zPWZhbHNlJmNvcmVqcz0zLjIxJnNwZWM9ZmFsc2UmbG9vc2U9ZmFsc2UmY29kZV9sej1Ed0V3bGdiZ0JBMWdwZ1R3THdDSUNHR1ZSR2dMbTFBSTBLd0hzQTdBWVFCc3dCakdWQWJ3elFGOFVBLVZqWUFlbkFST1FBJmRlYnVnPWZhbHNlJmZvcmNlQWxsVHJhbnNmb3Jtcz1mYWxzZSZtb2R1bGVzPWZhbHNlJnNoaXBwZWRQcm9wb3NhbHM9ZmFsc2UmY2lyY2xlY2lSZXBvPSZldmFsdWF0ZT1mYWxzZSZmaWxlU2l6ZT1mYWxzZSZ0aW1lVHJhdmVsPWZhbHNlJnNvdXJjZVR5cGU9bW9kdWxlJmxpbmVXcmFwPXRydWUmcHJlc2V0cz1lbnYlMkNyZWFjdCUyQ3N0YWdlLTImcHJldHRpZXI9ZmFsc2UmdGFyZ2V0cz0mdmVyc2lvbj03LjI0LjMmZXh0ZXJuYWxQbHVnaW5zPSZhc3N1bXB0aW9ucz0lN0IlN0RcbiAgLy9qc3jovazmjaLkuLpSZWFjdEVsZW1lbnRcbiAgY29uc3QganN4UHJvID0gZnVuY3Rpb24gKHR5cGUsIGNvbmZpZywgLi4uY2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IHByb3BzID0ge307XG4gICAgICBsZXQgcmVmID0gbnVsbDtcbiAgICAgIGxldCBrZXkgPSBudWxsO1xuICAgICAgLy/lpITnkIZwcm9wc1xuICAgICAgZm9yIChjb25zdCBwcm9wIGluIGNvbmZpZykge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gY29uZmlnW3Byb3BdO1xuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgLy/liKTmlq3mmK/lkKbmmK/ljp/lnovkuIrnmoTvvIzogIPomZHlr7nosaHotYvlgLznmoTml7blgJnpnIDopoHogIPomZHov5nkuIDngrlcbiAgICAgICAgICAgICAgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgcHJvcHNbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8v5aSE55CGY2hpbGRyZW5cbiAgICAgIC8v5oCd5oOzIGNoaWxkcmVu5Y+v6IO95Li65LiA5Liq5a2QY2hpbGRyZW4g5oiW6ICFIOWkmuS4qiBjaGlsZHJlbuS6i+WunuS4iuWwseaYr1JlYWN0RWxlbWVudFxuICAgICAgY29uc3QgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgICBpZiAoY2hpbGRyZW5MZW5ndGgpIHtcbiAgICAgICAgICBpZiAoY2hpbGRyZW5MZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuWzBdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIHByb3BzLCByZWYsIGtleSk7XG4gIH07XG4gIGNvbnN0IGpzeERFViA9ICh0eXBlLCBjb25maWcpID0+IHtcbiAgICAgIGxldCBrZXkgPSBudWxsO1xuICAgICAgbGV0IHJlZiA9IG51bGw7XG4gICAgICBjb25zdCBwcm9wcyA9IHt9O1xuICAgICAgZm9yIChjb25zdCBwcm9wIGluIGNvbmZpZykge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gY29uZmlnW3Byb3BdO1xuICAgICAgICAgIGlmIChwcm9wID09IFwia2V5XCIpIHtcbiAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAga2V5ID0gdmFsdWUgKyBcIlwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwcm9wID09IFwicmVmXCIpIHtcbiAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgcmVmID0gdmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wKSkge1xuICAgICAgICAgICAgICAvL2NvbmZpZ+S4reaciWNoaWxkcmVuIOS8muaYr2NvbmZpZ1xuICAgICAgICAgICAgICBwcm9wc1twcm9wXSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwgcHJvcHMsIHJlZiwga2V5KTtcbiAgfTtcbiAgY29uc3QganN4ID0ganN4REVWO1xuICBjb25zdCBqc3hzID0ganN4REVWO1xuXG4gIGV4cG9ydHMuUmVhY3RFbGVtZW50ID0gUmVhY3RFbGVtZW50O1xuICBleHBvcnRzLmpzeCA9IGpzeDtcbiAgZXhwb3J0cy5qc3hERVYgPSBqc3hERVY7XG4gIGV4cG9ydHMuanN4UHJvID0ganN4UHJvO1xuICBleHBvcnRzLmpzeHMgPSBqc3hzO1xuXG59KSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbi8vIGNvbnN0IGJhID0gICg8ZGl2PmFhYTwvZGl2PilcbmNvbnNvbGUubG9nKFJlYWN0KTtcbmNvbnNvbGUubG9nKFwiaGVsbG8gd29ybGRcIik7XG5jb25zdCBqc3ggPSA8cD5hYWE8ZGl2PmJiYjwvZGl2PjwvcD5cbmNvbnNvbGUubG9nKGpzeClcbmNvbnNvbGUubG9nKFJlYWN0LmNyZWF0ZUZpYmVyV2l0aFJlYWN0RWxlbWVudChqc3gpKVxuXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiY29uc29sZSIsImxvZyIsImNoaWxkcmVuIiwiY3JlYXRlRmliZXJXaXRoUmVhY3RFbGVtZW50Il0sInNvdXJjZVJvb3QiOiIifQ==