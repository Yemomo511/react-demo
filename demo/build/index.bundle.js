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

  //打包后成为react包，导出createReactElement 即 React.createReactElement ,
  //babel 会吧jsx 转换 例如<div>aaa</div> 为React.createReactElement("div",{},"aaa")
  //通过我们自定义的方法就可以生成ReactElement
  var index = {
      version: "0.0.0",
      createElement: jsxDEV,
  };

  return index;

}));


/***/ }),

/***/ "./index.tsx":
/*!*******************!*\
  !*** ./index.tsx ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react */ "../dist/node_modules/react/index.js");
/* harmony import */ var _node_modules_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_react__WEBPACK_IMPORTED_MODULE_0__);

// const ba =  (<div>aaa</div>)
console.log((_node_modules_react__WEBPACK_IMPORTED_MODULE_0___default()));
console.log("hello world");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./index.tsx"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxFQUFFLEtBQTREO0FBQzlELEVBQUUsQ0FDNEk7QUFDOUksQ0FBQyx1QkFBdUI7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0VBQXNFO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDMUR3QztBQUN6QztBQUNBQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsNERBQUssQ0FBQztBQUNsQkMsT0FBTyxDQUFDQyxHQUFHLENBQUMsYUFBYSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGVtby8uLi9kaXN0L25vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kZW1vLy4vaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgKGdsb2JhbC5pbmRleCA9IGdsb2JhbC5pbmRleCB8fCB7fSwgZ2xvYmFsLmluZGV4LmpzID0gZmFjdG9yeSgpKSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgLy/nlLHkuo5yZWFjdEVsZW1lbnQgJCR0eXBlb2blvojnibnmrorvvIzlm6DmraTlrprkuYnkuLrkuIDkuKpzeW1ib2znsbvlnovkvZzkuLrni6zkuIDml6Dms5XnmoTmoIfor4bvvIzpmLLmraJSZWFjdEVsZW1lbnTooqvmu6XnlKhcbiAgLy9TeW1ib2zkvJrkuqfnlJ/kuIDkuKrllK/kuIDnmoTlgLzvvIxzeW1ib2wuZm9yKCnkvJrlnKjlhajlsYDkuqfnlJ/kuIDkuKrllK/kuIDnmoTlgLxcbiAgY29uc3Qgc3VwcG9ydFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuZm9yO1xuICBjb25zdCBSRUFDVF9FTEVNRU5UX1RZUEUgPSBzdXBwb3J0U3ltYm9sXG4gICAgICA/IFN5bWJvbC5mb3IoXCJyZWFjdC1lbGVtZW50XCIpXG4gICAgICA6IDB4ZWFjNztcblxuICAvL+WIm+W7ulJlYWN0RWxlbWVudO+8jOWFt+S9k+WkhOeQhlxuICBjb25zdCBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwgcHJvcHMsIHJlZiwga2V5KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG4gICAgICAgICAgdHlwZSxcbiAgICAgICAgICBwcm9wcyxcbiAgICAgICAgICByZWYsXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIF9fbWFyazogXCJ5ZW1vbW9cIixcbiAgICAgIH07XG4gIH07XG4gIGNvbnN0IGpzeERFViA9ICh0eXBlLCBjb25maWcpID0+IHtcbiAgICAgIGxldCBrZXkgPSBudWxsO1xuICAgICAgbGV0IHJlZiA9IG51bGw7XG4gICAgICBjb25zdCBwcm9wcyA9IHt9O1xuICAgICAgZm9yIChjb25zdCBwcm9wIGluIGNvbmZpZykge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gY29uZmlnW3Byb3BdO1xuICAgICAgICAgIGlmIChwcm9wID09IFwia2V5XCIpIHtcbiAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAga2V5ID0gdmFsdWUgKyBcIlwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwcm9wID09IFwicmVmXCIpIHtcbiAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgcmVmID0gdmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wKSkge1xuICAgICAgICAgICAgICAvL2NvbmZpZ+S4reaciWNoaWxkcmVuIOS8muaYr2NvbmZpZ1xuICAgICAgICAgICAgICBwcm9wc1twcm9wXSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwgcHJvcHMsIHJlZiwga2V5KTtcbiAgfTtcblxuICAvL+aJk+WMheWQjuaIkOS4unJlYWN05YyF77yM5a+85Ye6Y3JlYXRlUmVhY3RFbGVtZW50IOWNsyBSZWFjdC5jcmVhdGVSZWFjdEVsZW1lbnQgLFxuICAvL2JhYmVsIOS8muWQp2pzeCDovazmjaIg5L6L5aaCPGRpdj5hYWE8L2Rpdj4g5Li6UmVhY3QuY3JlYXRlUmVhY3RFbGVtZW50KFwiZGl2XCIse30sXCJhYWFcIilcbiAgLy/pgJrov4fmiJHku6zoh6rlrprkuYnnmoTmlrnms5XlsLHlj6/ku6XnlJ/miJBSZWFjdEVsZW1lbnRcbiAgdmFyIGluZGV4ID0ge1xuICAgICAgdmVyc2lvbjogXCIwLjAuMFwiLFxuICAgICAgY3JlYXRlRWxlbWVudDoganN4REVWLFxuICB9O1xuXG4gIHJldHVybiBpbmRleDtcblxufSkpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCIuL25vZGVfbW9kdWxlcy9yZWFjdFwiO1xuLy8gY29uc3QgYmEgPSAgKDxkaXY+YWFhPC9kaXY+KVxuY29uc29sZS5sb2coUmVhY3QpO1xuY29uc29sZS5sb2coXCJoZWxsbyB3b3JsZFwiKTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9