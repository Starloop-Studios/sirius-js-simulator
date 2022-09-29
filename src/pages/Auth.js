import { useContext, useEffect } from "react";
import config from "../Config/config";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import Spinner from "../components/UI/Spinner";
import AuthCom from "../components/Auth/Auth";
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

  const setIntialToken = async () => {
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
      authCtx.setToken(data.accessToken);
    } catch (error) {
      console.log(error, isError);
    }
  };

  useEffect(() => {
    setIntialToken();
  }, []);

  return (
    <>
      {isLoading && <Spinner show={isLoading} />}
      <AuthCom />
    </>
  );
};

export default Auth;
