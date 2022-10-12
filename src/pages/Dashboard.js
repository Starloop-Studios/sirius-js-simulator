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

const Dashboard = () => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const [inventoryData, setInventoryData] = useState(null);
  const [buildingData, setBuildingData] = useState([]);

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
      console.log(error, isError);
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
      setInventoryData(data.content);
      // dataCtx.setInventoryData(data.content);
    } catch (error) {
      console.log(error, isError);
    }
  }, [inventoryData]);

  useEffect(() => {
    setBalancingDataHandler();
    getLatestSettlement();
    getLatestInventory();
  }, []);

  return (
    <>
      <h3>Welcome to Sirirus-Zoolana Simulator</h3>
      <Toast isError={isError} clearError={clearError} />
      {isLoading && <Spinner show={isLoading} />}
      {authCtx.userData && <User />}
      {buildingData && (
        <Building
          buildingData={buildingData}
          setBuildingData={setBuildingData}
          getLatestSettlement={getLatestSettlement}
          getLatestInventory={getLatestInventory}
        />
      )}
      {inventoryData && (
        <Inventory
          inventoryData={inventoryData}
          getLatestInventory={getLatestInventory}
        />
      )}
    </>
  );
};

export default Dashboard;
