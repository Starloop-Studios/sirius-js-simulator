import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Styles from "./User.module.css";
import { BiCopy } from "react-icons/bi";
import { MdOutlineDownloadDone } from "react-icons/md";
const User = () => {
  const [keyCopy, setKeyCopy] = useState(false);
  const [idCopy, setIdCopy] = useState(false);
  const authCtx = useContext(AuthContext);
  // const userData = authCtx.userData;
  const userData = {
    username: "SRS_34262787",
    siriusKey: "4v0jz8b46ie0000000000",
    siriusId: "auiic5aq3m",
    exp: 0,
    level: 0,
  };
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
            <button
              className={Styles.controls}
              onClick={() => {
                setIdCopy(false);
                setKeyCopy(true);
                navigator.clipboard.writeText(userData.siriusKey);
              }}
            >
              {keyCopy ? <MdOutlineDownloadDone /> : <BiCopy />}
            </button>
          </div>
          <div className={Styles.content}>
            <div className={Styles.title}>Sirius Id</div>
            <div>:</div>
            <div className={Styles.main}>{userData.siriusId}</div>
            <button
              className={Styles.controls}
              onClick={() => {
                setKeyCopy(false);
                setIdCopy(true);
                navigator.clipboard.writeText(userData.siriusId);
              }}
            >
              {idCopy ? <MdOutlineDownloadDone /> : <BiCopy />}
            </button>
          </div>
          <div className={Styles.content}>
            <div className={Styles.title}>User Experience</div>
            <div>:</div>
            <div className={Styles.main}>{userData.exp}</div>
          </div>
          <div className={Styles.content}>
            <div className={Styles.title}>User Level</div>
            <div>:</div>
            <div className={Styles.main}>{userData.level}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
