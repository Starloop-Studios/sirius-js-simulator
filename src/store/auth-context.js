import React, { createContext, useState, useCallback, useEffect } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedin: false,
  barrackFlag: false,
  userData: {},
  setToken: () => {},
  login: (token) => {},
  // logout: () => {},
  setUserData: () => {},
  buildingData: {},
  setBuildingData: () => {},
  inventoryData: {},
  setInventoryData: () => {},
  setBarrackFlag: () => {},
});
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [buildingData, setBuildingData] = useState();
  const [inventoryData, setInventoryData] = useState();
  const [barrackFlag, setBarrackFlag] = useState(false);

  const loginHandler = useCallback((token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  }, []);

  const logoutHandler = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }, []);


  useEffect(() => {
    const intialToken = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationToken");
    if (
      intialToken &&
      new Date(expirationTime) > new Date()
    ) {
      loginHandler(intialToken, new Date(expirationTime));
    } else {
      logoutHandler();
    }
  }, [loginHandler]);

  const contextValue = {
    token,
    isLoggedin,
    userData,
    setUserData,
    setToken,
    buildingData,
    setBuildingData,
    inventoryData,
    setInventoryData,
    setBarrackFlag,
    barrackFlag,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
