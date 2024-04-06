import React, { useState } from "react";
function App() {
  const [state,setState] = useState(6)
  return (
    <div>
      <p>{state}</p>
    </div>
  );
}
export default App