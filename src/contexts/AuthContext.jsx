import React, { createContext, useEffect, useCallback } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/UseLocalStorage";

let logoutTimer;

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthContextProvider({ children }) {
  const [currentUser, storeUser, clearStoredUser] = useLocalStorage("user");
  const [sessionExpDate, storeSessionExpDate, clearSessionExpDate] =
    useLocalStorage("sessionExpiration");
  const history = useNavigate();

  const handleUserLogin = (user) => {
    const expiration = new Date(jwtDecode(user.access_token).exp * 1000);
    storeUser(user);
    storeSessionExpDate(expiration);
  };

  const handleUserLogout = () => {
    clearStoredUser();
    clearSessionExpDate();
  };

  const handleAutomaticLogout = useCallback(() => {
    clearStoredUser();
    clearSessionExpDate();
    history.push("/login");
  }, [history]);

  useEffect(() => {
    if (currentUser && sessionExpDate) {
      const remainingTime = new Date(sessionExpDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(handleAutomaticLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [currentUser, sessionExpDate, handleAutomaticLogout]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ currentUser, handleUserLogin, handleUserLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
