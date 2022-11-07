import React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../Config/config";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";
import User from "../components/User/User";
import Building from "../components/Buildings/Building";
import Inventory from "../components/Inventory/Inventory";
import Barracks from "../components/Barracks/Barracks";
import Footer from "../components/Footer/Footer";
import Toast from "../components/UI/Toast";
import Spinner from "../components/UI/Spinner";
import { toast } from "react-toastify";
const BarracksPage = () => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const params = useParams();
  const [queueData, setQueueData] = useState([]);
  const barrackId = params.id;

  const getLatestQueue = useCallback(async () => {
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}/api/v1/production?buildingId=${barrackId}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      console.log("Queue Data recevied.", data);
      setQueueData(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }, [barrackId, queueData]);
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
      toast.error(error.message);
      console.log(error.message);
    }
  }, []);

  const getLatestArmy = useCallback(async () => {
    console.log("getLatestArmy() called .");
    const armyForRetrieval = config.armyForRetrieval;
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${armyForRetrieval.path}`,
        armyForRetrieval.method,
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      console.log("Army Data recevied.", data);
      dataCtx.setArmyData(data.content);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    getLatestQueue();
    getLatestArmy();
  }, []);

  return (
    <div>
      {isError && <Toast isError={isError} clearError={clearError} />}
      {isLoading && <Spinner show={isLoading} />}
      {barrackId && (
        <Barracks
          barrackId={barrackId}
          getLatestQueue={getLatestQueue}
          getLatestInventory={getLatestInventory}
          getLatestArmy={getLatestArmy}
          queueData={queueData}
          setQueueData={setQueueData}
        />
      )}
    </div>
  );
};

export default BarracksPage;
