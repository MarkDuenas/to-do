import React, { useState, useEffect, createContext } from "react";

import jwt from "jsonwebtoken";
import cookie from "react-cookies";
import axios from "axios";
import base64 from "base-64";

export const LoginContext = createContext();

const LoginProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({});

  const validateToken = (token) => {
    try {
      const tokenUser = jwt.verify(token, process.env.REACT_APP_SECRET);
      console.log(tokenUser);
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
    const auth = base64.encode(`${input.username}:${input.password}`);
    try {
      const response = await axios.post(API, input, {
        headers: { authorization: `Basic ${auth}` },
      });

      const { token } = response.data;

      validateToken(token);
    } catch (e) {
      console.warn("Login Attempt Failed");
    }
  };
  const register = async (input) => {
    console.log(input);
    const newUser = {
      username: input.registerUsername,
      password: input.registerPassword,
      role: input.role,
    };
    console.log(newUser);
    const API = `${process.env.REACT_APP_API}/signup`;

    try {
      const response = await axios.post(API, newUser);

      const { token } = response.data;

      validateToken(token);
    } catch (e) {
      console.warn("Could not register user");
    }
  };

  useEffect(() => {
    const token = cookie.load("auth") || null;
    validateToken(token);
  }, []);

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    cookie.remove("auth");
  };

  const can = (permission) => {
    return user.access && user.access.includes(permission);
  };

  const globalContext = {
    login,
    register,
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
