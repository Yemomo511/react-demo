import React, { useState } from "react";
import ReactDOM from "react-dom";
// const ba =  (<div>aaa</div>)
const App = () => {
  const [state, setState] = useState(0);
  return <div>{state}</div>;
};
ReactDOM.createRoot(document.getElementById("app")).render(<App />);
