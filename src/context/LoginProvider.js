import React, { useState, useEffect, createContext } from "react";

import jwt from "jsonwebtoken";
import cookie from "react-cookies";
import axios from "axios";

export const LoginContext = createContext();

const LoginProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({});

  const validateToken = (token) => {
    try {
      const tokenUser = jwt.verify(token, process.env.REACT_APP_SECRET);
      setIsLoggedIn(true);
      setUser(tokenUser);
      cookie.save("auth", token);
    } catch (e) {
      setUser({});
      setIsLoggedIn(false);
      console.warn("Token Validation Error", e);
    }
  };

  const login = async (input) => {
    const API = `${process.env.REACT_APP_API}/signin`;
    try {
      const response = await axios.post(API, input);

      const { token } = response.body;

      validateToken(token);
    } catch (e) {
      console.warn("Login Attemp Failed");
    }
  };

  useEffect(() => {
    const token = cookie.load("auth") || null;
    validateToken(token);
  });

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    cookie.remove("auth");
  };

  const can = (permission) => {
    return user.capabilities && user.capabilities.inclues(permission);
  };

  const globalContext = {
    login,
    logout,
    can,
    user,
    isLoggedIn,
  };
  return (
    <LoginContext.Provider value={globalContext}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
