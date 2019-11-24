import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";
import SearchParams from "./searchParams";

const App = () => {
  return (
    <div>
      <h1 id="hello">My First react app</h1>
      <SearchParams />
    </div>
  );
};

render(<App />, document.getElementById("root"));
