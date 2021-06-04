import React from "react";

import ToDo from "./components/todo/Todo-Function";
import NavBar from "./components/Nav.js";

export default class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <ToDo />
      </>
    );
  }
}
