import React, { useState } from "react";
import TreeCheckbox from "./components/TreeCheckbox/TreeCheckbox.jsx";
import { contextChildrenToParents } from "./context/contextChildrenToParents.js";
import "./App.css";

function App() {
  //parentCheckbox undefined
  const [parentCheckbox, setParentCheckbox] = useState();

  return (
    <>
      <contextChildrenToParents.Provider
        value={{ parentCheckbox, setParentCheckbox }}
      >
        <TreeCheckbox />
      </contextChildrenToParents.Provider>
    </>
  );
}

export default App;
