import React, { useContext } from "react";
import { LoginContext } from "../context/LoginProvider.js";
import { When } from "react-if";
const Auth = (props) => {
  const userContext = useContext(LoginContext);

  const haveAccess = props.capability
    ? userContext.can(props.capability)
    : true;

  const readyForRender = userContext.isLoggedIn && haveAccess;

  return <When condition={readyForRender}>{props.children}</When>;
};

export default Auth;
