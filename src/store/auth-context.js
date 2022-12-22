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
  // const intialToken = localStorage.getItem("token");
  // const intialStudentId = localStorage.getItem("studentId");
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
  // const setData = (subjects) => {
  //   let revSubjects = subjects.reverse();
  //   setSubjects(revSubjects);
  // };

  useEffect(() => {
    const intialToken = localStorage.getItem("token");
    const intialStudentId = localStorage.getItem("studentId");
    const expirationTime = localStorage.getItem("expirationToken");

    if (
      intialToken &&
      intialStudentId &&
      new Date(expirationTime) > new Date()
    ) {
      loginHandler(intialToken, intialStudentId, new Date(expirationTime));
    } else {
      logoutHandler();
    }
    // eslint-disable-next-line
  }, [loginHandler]);

  // useEffect(() => {
  //   if (token && expiration) {
  //     // console.log(expiration.getTime() -new Date().getTime());

  //     timer = setTimeout(
  //       logoutHandler,
  //       expiration.getTime() - new Date().getTime()
  //     );
  //   } else {
  //     clearTimeout(timer);
  //   }
  // }, [token, expiration, logoutHandler]);

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
    // setData: setData,
    // subjects: subjects,
    // studentId: studentId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
