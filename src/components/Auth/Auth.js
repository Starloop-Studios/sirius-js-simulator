import { useContext, useEffect, useState } from "react";
import Styles from "./auth.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import config from "../../Config/config";
import useHttp from "../../hooks/use-http";
import Toast from "../UI/Toast";
import AuthContext from "../../store/auth-context";
import Spinner from "../UI/Spinner";

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
  const [siriusId, setSiriusId] = useState();
  const [siriusKey, setSiriusKey] = useState();

  const setIntialToken = async () => {
    console.log("setIntialToken() called !");
    const tempAppIdKeyForInitialToken = config.tempAppIdKeyForInitialToken;
    const authenticateForToken = config.authenticateForToken;
    let data;
    try {
      data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${authenticateForToken.path}`,
        authenticateForToken.method,
        formBody(tempAppIdKeyForInitialToken),
        { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
      );
      console.log("App authenticate Token received .");
      return data.accessToken;
    } catch (error) {
      console.log(error, isError);
    }
  };
  const signUp = async () => {
    console.log("userCreation() called !");
    const userForCreation = config.userForCreation;
    const intialToken = await setIntialToken();
    try {
      let data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${userForCreation.path}`,
        userForCreation.method,
        null,
        { Authorization: `Bearer ${intialToken}` }
      );
      console.log(data, "Created User Data.");
      setSiriusId(data.siriusId);
      setSiriusKey(data.siriusKey);
      authCtx.setUserData({
        username: data.username,
        siriusKey: data.siriusKey,
        siriusId: data.siriusId,
      });
      await logIn(data.siriusId, data.siriusKey);
    } catch (error) {
      console.log(error, isError);
    }
  };

  const getCurrentUser = async (token) => {
    console.log("GetCurrentUser() called.");
    const authenticateForInfo = config.authenticateForInfo;
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${authenticateForInfo.path}`,
        authenticateForInfo.method,
        null,
        { Authorization: `Bearer ${token}` }
      );
      authCtx.setUserData({ userId: data.id, siriusId: data.siriusId });
      console.log("Current user data set authctx");
    } catch (error) {
      console.log(error, isError);
    }
  };

  const logIn = async (siriusIdL, siriusKeyL) => {
    console.log("Login() called !");
    let tempAppIdKeyForInitialToken = config.tempAppIdKeyForInitialToken;
    tempAppIdKeyForInitialToken = {
      ...tempAppIdKeyForInitialToken,
      siriusId: siriusId ? siriusId : siriusIdL,
      siriusKey: siriusKey ? siriusKey : siriusKeyL,
    };
    console.log(
      tempAppIdKeyForInitialToken,
      "Logging in with user provided data ."
    );
    const authenticateForToken = config.authenticateForToken;
    let data;
    try {
      data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${authenticateForToken.path}`,
        authenticateForToken.method,
        formBody(tempAppIdKeyForInitialToken),
        { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
      );
      authCtx.login(data.accessToken);
      await getCurrentUser(data.accessToken);
      console.log("User loggin Sucessfull.");
    } catch (error) {
      console.log(error, isError);
    }
  };

  return (
    <div className={Styles.container}>
      {isLoading && <Spinner show={isLoading} />}
      <div className={Styles.body}>Welcome ! Sirirus Zoolana Stimulator </div>
      <div className={Styles.control}>
        <Form>
          <Form.Group className="mb" controlId="formBasicEmail">
            <Form.Label>Sirius Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Sirius Id"
              onChange={(event) => {
                setSiriusId(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb" controlId="formBasicPassword">
            <Form.Label>Sirius Key</Form.Label>
            <Form.Control
              type="text"
              placeholder="Sirius Key"
              onChange={(event) => {
                setSiriusKey(event.target.value);
              }}
            />
          </Form.Group>
        </Form>
        <Button onClick={logIn}>Log In</Button>
        <Button onClick={signUp}>Sign Up</Button>
      </div>
      <Toast isError={isError} clearError={clearError} />
      {authCtx.userData && (
        <div>User Creation Sucessfull .Log in to continue.</div>
      )}
    </div>
  );
};

export default Auth;
