//托管vite处理了
import React from "react";
import ReactDOM from "react-dom";
import App from "./src/main";

const root = document.getElementById("root");
console.log(<App />);
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
