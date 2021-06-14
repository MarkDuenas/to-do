import React from "react";

import LoginContext from "./context/LoginProvider.js";
import ToDo from "./components/todo/Todo-Function";
import NavBar from "./components/Nav.js";

export default class App extends React.Component {
  render() {
    return (
      <LoginContext>
        <NavBar />
        <ToDo />
      </LoginContext>
    );
  }
}
LoginContext;
