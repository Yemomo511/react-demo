import React, { useState } from "react";
function App() {
  const [state, setState] = useState(6);
  window.setState = setState;
  return (
    <div
      onClick={() => {
        setState((state) => {
          return state + 1;
        });
      }}
    >
      {state}
    </div>
  );
}
export default App;
