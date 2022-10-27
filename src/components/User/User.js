import React from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Styles from "./User.module.css";
const User = () => {
  const authCtx = useContext(AuthContext);
  const userData = authCtx.userData;
  //   const userData = {
  //     userName: "SRS_34262787",
  //     siriusKey: "4v0jz8b46ie0000000000",
  //     siriusId: "auiic5aq3m",
  //   };
  return (
    <div className={Styles.container}>
      {!userData && <h5>No User data Found . Try Again .</h5>}
      {userData && (
        <>
          <div className={Styles.head}>User Info : </div>
          <div className={Styles.content}>
            <div className={Styles.title}>User Name</div>
            <div>:</div>
            <div className={Styles.main}>{userData.username}</div>
          </div>
          <div className={Styles.content}>
            <div className={Styles.title}>Sirius Key</div>
            <div>:</div>
            <div className={Styles.main}>{userData.siriusKey}</div>
          </div>
          <div className={Styles.content}>
            <div className={Styles.title}>Sirius Id</div>
            <div>:</div>
            <div className={Styles.main}>{userData.siriusId}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
