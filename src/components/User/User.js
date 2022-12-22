import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Styles from "./User.module.css";
import { BiCopy } from "react-icons/bi";
import { MdOutlineDownloadDone } from "react-icons/md";
import Button from "react-bootstrap/Button";
import DataContext from "../../store/data-context";
import useHttp from "../../hooks/use-http";
import Toast from "../UI/Toast";
import Spinner from "../UI/Spinner";
import { toast } from "react-toastify";
import { async } from "q";

const User = () => {
  const [keyCopy, setKeyCopy] = useState(false);
  const [idCopy, setIdCopy] = useState(false);
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const userData = authCtx.userData;
  const addExpHandler = async () => {
    const userId = userData.userId;
    const quantity = 10;
    if (!userData) {
      console.log("No user data found.");
      return;
    }
    console.log(`addExpHandler() called to add ${quantity} exp to ${userId}`);
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}/api/v1/playerprofiles/userId/${userId}/xp/increment/${quantity}`,
        "POST",
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      toast.success(`Added ${quantity} exp to user ${userId}.`);
      console.log(data, `${quantity} exp added to user ${userId}.`);
      authCtx.setUserData({
        ...authCtx.userData,
        exp: data.exp,
        level: data.level,
      });
    } catch (error) {
      console.log(error, isError);
    }
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
            <div className={Styles.itemControl}>
              <Button
                onClick={() => {
                  addExpHandler();
                }}
              >
                +ADD
              </Button>
            </div>
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
