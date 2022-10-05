import { useContext, useEffect, useState } from "react";
import config from "../Config/config";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";
import Spinner from "../components/UI/Spinner";
import Home from "../components/Home/Home";
import Toast from "../components/UI/Toast";
// import { data } from "../data/intialData";

const Dashboard = () => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const [balancingData, setBalancingData] = useState(null);
  const setBalancingDataHandler = async () => {
    const balancingForRetrievalOfLatest = config.balancingForRetrievalOfLatest;
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${balancingForRetrievalOfLatest.path}`,
        balancingForRetrievalOfLatest.method,
        null,
        { Authorization: `Bearer ${authCtx.token}` }
      );
      dataCtx.setInitialData(data);
      setBalancingData(data);
    } catch (error) {
      console.log(error, isError);
    }
  };

  const setSettlementId = async () => {
    const settlementForCreation = config.settlementForCreation;
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${settlementForCreation.path}`,
        settlementForCreation.method,
        null,
        { Authorization: `Bearer ${authCtx.token}` }
      );
      console.log(data);
      dataCtx.setSettlementId(data.id);
    } catch (error) {
      console.log(error, isError);
    }
  };

  useEffect(() => {
    setBalancingDataHandler();
    setSettlementId();
  }, []);

  return (
    <>
      {isLoading && <Spinner show={isLoading} />}
      <Toast isError={isError} clearError={clearError} />
      <Home balancingData={balancingData} />
    </>
  );
};

export default Dashboard;
