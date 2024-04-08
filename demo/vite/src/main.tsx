import React, { useState } from "react";
function App() {
  const [state, setState] = useState(6);
  window.setState = setState;
  return (
    <div
      onClick={() => {
        setState(8);
      }}
    >
      {state}
    </div>
  );
}
export default App;
