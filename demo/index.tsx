import React from "react";
// const ba =  (<div>aaa</div>)
console.log(React);
console.log("hello world");
const jsx = (
  <p>
    <div>bbb</div>
    <div>ccc</div>
  </p>
);
console.log(jsx);
const Fiber = React.createFiberWithReactElement(jsx);
const fiberTree = React.reactReconciler.performUnitOfWork(Fiber)
console.log(Fiber)
