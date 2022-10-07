import { useCallback, useContext, useEffect, useState } from "react";
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
      dataCtx.setBuildingControls(data.contents.Building);
      dataCtx.setInitialData(data);
      setBalancingData(data);
    } catch (error) {
      console.log(error, isError);
    }
  };

  const getLatestSettlement = useCallback(async () => {
    const settlementForRetrieval = config.settlementForRetrieval;
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${settlementForRetrieval.path}`,
        settlementForRetrieval.method,
        null,
        { Authorization: `Bearer ${authCtx.token}` }
      );
      console.log("Latest Settlement loaded .", data);
      if (!data.content.length || !data.content[0].buildings.length) {
        console.log("No building Data.");
        return;
      }
      dataCtx.setSettlementId(data.content[0].id);
      dataCtx.setBuildingData(data.content[0].buildings);
    } catch (error) {
      console.log(error, isError);
    }
  }, [authCtx.buildingData]);

  const getLatestInventory = useCallback(async () => {
    const inventoryForRetrievalByAll = config.inventoryForRetrievalByAll;
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${inventoryForRetrievalByAll.path}`,
        inventoryForRetrievalByAll.method,
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      console.log("Inventory Data recevied.", data);
      dataCtx.setInventoryData(data.content);
    } catch (error) {
      console.log(error, isError);
    }
  }, [authCtx.inventoryData]);

  useEffect(() => {
    setBalancingDataHandler();
    getLatestSettlement();
    getLatestInventory();
  }, []);

  return (
    <>
      <Toast isError={isError} clearError={clearError} />
      <Home
        balancingData={balancingData}
        getLatestSettlement={getLatestSettlement}
        getLatestInventory={getLatestInventory}
      />
    </>
  );
};

export default Dashboard;
