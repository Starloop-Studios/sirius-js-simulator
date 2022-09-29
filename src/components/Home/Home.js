import React from "react";
import Styles from "./home.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const userData = authCtx.userData;
  console.log(userData);
  return (
    <div className = {Styles.container}>
      {userData && (
        <div className={Styles.head}>
          Welcome {userData.username}, to the sirirus zoolana stimulator.
        </div>
      )}
    </div>
  );
};

export default Home;
