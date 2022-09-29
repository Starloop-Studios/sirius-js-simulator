import { useContext } from "react";
import Styles from "./auth.module.css";
import Button from "react-bootstrap/Button";
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

  const signUp = async () => {
    const userForCreation = config.userForCreation;
    let data;
    try {
      let data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${userForCreation.path}`,
        userForCreation.method,
        null,
        { Authorization: `Bearer ${authCtx.token}` }
      );
      authCtx.setData(data);
    } catch (error) {
      console.log(error, isError);
    }
  };

  const logIn = async () => {
    const userData = authCtx.userData;
    if (!userData) {
      console.log("No user data present . Please create a user");
      return;
    }
    let tempAppIdKeyForInitialToken = config.tempAppIdKeyForInitialToken;
    const authenticateForToken = config.authenticateForToken;
    tempAppIdKeyForInitialToken = {
      ...tempAppIdKeyForInitialToken,
      siriusId: userData.siriusId,
      siriusKey: userData.siriusKey,
    };
    let data;
    try {
      data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${authenticateForToken.path}`,
        authenticateForToken.method,
        formBody(tempAppIdKeyForInitialToken),
        { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
      );
      authCtx.login(data.accessToken);
    } catch (error) {
      console.log(error, isError);
    }
  };
  return (
    <div className={Styles.container}>
      {isLoading && <Spinner show={isLoading} />}
      <div className={Styles.body}>Welcome ! Sirirus Zoolana Stimulator </div>
      <div className={Styles.control}>
        <Button onClick={signUp} disabled={!!authCtx.userData}>
          Sign Up
        </Button>
        <Button onClick={logIn} disabled={!authCtx.userData}>
          Log In
        </Button>
      </div>
      <Toast isError={isError} clearError={clearError} />
      {authCtx.userData && (
        <div>User Creation Sucessfull .Log in to continue.</div>
      )}
    </div>
  );
};

export default Auth;
