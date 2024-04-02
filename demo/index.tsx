import React from "react";
import ReactDOM from "react-dom"
// const ba =  (<div>aaa</div>)
console.log(React);
console.log("hello world");
console.log(ReactDOM)
const jsx = (
  <p>
    <div>bbb</div>
    <div>ccc</div>
  </p>
);
console.log(jsx);
const Fiber = React.createFiberWithReactElement(jsx);
const fiberTree = React.reactReconciler.performUnitOfWork(Fiber)
ReactDOM.createRoot(document.getElementById("root")).render(jsx);
