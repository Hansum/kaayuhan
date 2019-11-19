import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

const App = () => {
  return React.createElement("div", { className: "uhm hello?" }, [
    React.createElement("p", { id: "firstId" }, "Hello World"),
    React.createElement(Pet, { name: "butchi", animal: "dog", breed: "askal" }),
    React.createElement(Pet, {
      name: "bok",
      animal: "pig",
      breed: "brown pig"
    }),
    React.createElement(Pet, {
      name: "bulter",
      animal: "dog",
      breed: "golden retriever"
    })
  ]);
};

render(React.createElement(App), document.getElementById("root"));
