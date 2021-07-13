import PropTypes from "prop-types";
import React, { createContext, useContext, useState, useEffect } from "react";
import { deleteCookie, getSessionToken } from "../utils/session";

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, token: null });

  const logout = () => {
    deleteCookie();
    setAuth({ toekn: null });
  };

  useEffect(() => {
    async function getUser() {
      const token = getSessionToken();
      console.log("[token]", token);
      setAuth({
        loading: false,
        token,
      });
    }
    getUser();
  }, []);

  return (
    <authContext.Provider value={{ ...auth, logout }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthProvider, useAuth };
