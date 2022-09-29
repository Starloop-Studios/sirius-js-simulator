import React, { createContext, useState, useCallback, useEffect } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedin: false,
  userData: {},
  setLogIn: () => {},
  login: (token) => {},
  // logout: () => {},
  setData: () => {},
});
let timer;
export const AuthContextProvider = (props) => {
  // const intialToken = localStorage.getItem("token");
  // const intialStudentId = localStorage.getItem("studentId");
  const [token, setToken] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();

  const loginHandler = useCallback((token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationToken", expirationTime);
  }, []);

  const setLogIn = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  const setData = useCallback((data) => {
    setUserData(data);
  }, []);

  // const logoutHandler = useCallback(() => {
  //   // console.log("called ")
  //   setToken(null);
  //   setStudentId(null);
  //   setIsLoggedIn(false);
  //   setExpiration(null);
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("studentId");
  //   localStorage.removeItem("expirationToken");
  // }, []);
  // const setData = (subjects) => {
  //   let revSubjects = subjects.reverse();
  //   setSubjects(revSubjects);
  // };

  // useEffect(() => {
  //   const intialToken = localStorage.getItem("token");
  //   const intialStudentId = localStorage.getItem("studentId");
  //   const expirationTime = localStorage.getItem("expirationToken");

  //   if (
  //     intialToken &&
  //     intialStudentId &&
  //     new Date(expirationTime) > new Date()
  //   ) {
  //     loginHandler(intialToken, intialStudentId, new Date(expirationTime));
  //   } else {
  //     logoutHandler();
  //   }

  //   // eslint-disable-next-line
  // }, [loginHandler]);

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
    setData,
    setLogIn,
    login: loginHandler,
    // // logout: logoutHandler,
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
