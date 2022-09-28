import { useContext } from "react";
import Styles from "./auth.module.css";
import Button from "react-bootstrap/Button";
import config from "../../Config/config";
import useHttp from "../../hooks/use-http";
import Toast from "../UI/Toast";
import AuthContext from "../../store/auth-context";

function formBody(details) {
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return (formBody = formBody.join("&"));
}

const Auth = () => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);

  const signUp = async () => {
    const tempAppIdKeyForInitialToken = config.tempAppIdKeyForInitialToken;
    const authenticateForToken = config.authenticateForToken;
    const userForCreation = config.userForCreation;
    let data;
    try {
      data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${authenticateForToken.path}`,
        authenticateForToken.method,
        formBody(tempAppIdKeyForInitialToken),
        { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
      );
      authCtx.login(data.accessToken, data.expiresIn);

      if (!data.accessToken) {
        throw Error("Unable to create user.");
      }

      let createData = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${userForCreation.path}`,
        userForCreation.method,
        null,
        { Authorization: `Bearer ${data.accessToken}` }
      );
      authCtx.setData(createData);
    } catch (error) {
      console.log(error, isError);
    }
  };
  const logIn = () => {
    console.log(authCtx.userData);
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.body}>Welcome ! Sirirus Zoolana Demo </div>
      <div className={Styles.control}>
        <Button onClick={signUp}>Sign Up</Button>
        <Button onClick={logIn}>Log In</Button>
      </div>
      <Toast isError={isError} clearError={clearError} />
      {authCtx.isLoggedin && (
        <div>User Creation Sucessful . Log in to continue.</div>
      )}
    </div>
  );
};

export default Auth;
