import { useCallback, useContext, useEffect, useState } from "react";
import config from "../Config/config";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";
import Spinner from "../components/UI/Spinner";
import Toast from "../components/UI/Toast";
import User from "../components/User/User";
import Building from "../components/Buildings/Building";
import Inventory from "../components/Inventory/Inventory";
import Barracks from "../components/Barracks/Barracks";
import Footer from "../components/Footer/Footer";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const [inventoryData, setInventoryData] = useState(null);
  const [buildingData, setBuildingData] = useState([]);
  const [queueData, setQueueData] = useState([]);
  const [armyData, setArmyData] = useState([]);
  const [barrackId, setBarrackId] = useState(null);

  const setBalancingDataHandler = async () => {
    const balancingForRetrievalOfLatest = config.balancingForRetrievalOfLatest;
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${balancingForRetrievalOfLatest.path}`,
        balancingForRetrievalOfLatest.method,
        null,
        { Authorization: `Bearer ${authCtx.token}` }
      );
      dataCtx.setBalancingData(data.contents);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
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
      setBuildingData(
        data.content[0].buildings.sort((a, b) => {
          const nameA = a.balancingContentId;
          const nameB = b.balancingContentId;
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
      );
      dataCtx.setSettlementId(data.content[0].id);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }, [buildingData]);

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
      // dataCtx.setInventoryData(data.content);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }, [inventoryData]);

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
  }, [armyData]);

  useEffect(() => {
    setBalancingDataHandler();
    getLatestSettlement();
  }, []);

  return (
    <>
      <h3>Welcome to Sirirus-Zoolana Simulator</h3>
      {isError && <Toast isError={isError} clearError={clearError} />}
      {isLoading && <Spinner show={isLoading} />}
      {authCtx.userData && <User />}
      {buildingData && (
        <Building
          buildingData={buildingData}
          setBuildingData={setBuildingData}
          getLatestSettlement={getLatestSettlement}
          getLatestInventory={getLatestInventory}
          setBarrackId={setBarrackId}
        />
      )}
    </>
  );
};

export default Dashboard;
