import React, { useCallback, useEffect } from "react";
import Styles from "./home.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import DataContext from "../../store/data-context";
import Box from "./Box";
import config from "../../Config/config";
import useHttp from "../../hooks/use-http";
import Toast from "../UI/Toast";
import Inventory from "./Inventory";
import { useNavigate } from "react-router-dom";
import Button from "@restart/ui/esm/Button";
import BuildingButton from "./BuildingButton";
// import Spinner from "../UI/Spinner";

const Home = (props) => {
  const { getLatestSettlement, getLatestInventory } = props;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const navigate = useNavigate();

  const buildingControls = dataCtx.buildingControls;
  const userData = authCtx.userData;
  const buildingData = dataCtx.buildingData;
  const inventoryData = dataCtx.inventoryData;

  const createSettlement = async () => {
    console.log("CreatedSettlement() called.");
    const settlementForCreation = config.settlementForCreation;
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${settlementForCreation.path}`,
        settlementForCreation.method,
        null,
        { Authorization: `Bearer ${authCtx.token}` }
      );
      console.log("New Settleement created !", data);
      dataCtx.setSettlementId(data.id);
    } catch (error) {
      console.log(error, isError);
    }
  };
  const startBuildHandler = async (id) => {
    if (!buildingData.length) {
      await createSettlement();
    }
    //api call to start building
    const buildingForCreation = config.buildingForCreation;
    const settlementId = localStorage.getItem("settlementId");
    const buildingReqData = {
      settlementId,
      balancingContentId: id,
    };
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}/api/v1/settlement/${settlementId}/buildings`,
        buildingForCreation.method,
        JSON.stringify(buildingReqData),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      console.log("build Data recevied.", data);
      await getLatestSettlement();
    } catch (error) {
      console.log(error, isError);
    }
  };

  const checkBuildFinishHandler = useCallback(async () => {
    console.log("checkBuildFinishHandler() called ");
    await getLatestSettlement();
    await getLatestInventory();
  }, []);

  const collectHandler = async (id, type) => {
    if (type === "barracks") {
      navigate("/barracks", { state: { buildingId: id } });
      return;
    }
    const productionForCreation = config.productionForCreation;
    const collectProdData = {
      type: "collect",
      balancingVersion: "0",
      buildingId: id,
      meta: {},
    };
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${productionForCreation.path}`,
        productionForCreation.method,
        JSON.stringify(collectProdData),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      console.log("collection Data recevied.", data);
      getLatestInventory();
    } catch (error) {
      console.log(error, isError);
    }
  };

  const addToInventoryHandler = async (itemId) => {
    const userId = authCtx.userData.userId;
    const quantity = 1000;
    console.log("addToInventoryHandler() called.");
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}/api/v1/inventory/operations?userId=${userId}&balancingContentId=${itemId}&opType=increment&quantity=${quantity}`,
        "POST",
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      console.log(`${quantity} ${itemId} added to inventory.`);
      await getLatestInventory();
    } catch (error) {
      console.log(error, isError);
    }
  };

  return (
    <div className={Styles.container}>
      <Toast isError={isError} clearError={clearError} />
      {userData && (
        <div className={Styles.head}>
          Welcome {userData.username}, to the sirirus zoolana stimulator.
        </div>
      )}
      <div className={Styles.content}>
        <h4>Building Controls </h4>
        {buildingControls && (
          <div className={Styles.controls}>
            {buildingControls.map((element,index) => (
              <Box
                data={element}
                key={index}
                startBuildHandler={startBuildHandler}
              ></Box>
            ))}
          </div>
        )}
        <h4>Current Buildings</h4>
        {buildingData && (
          <div className={Styles.build}>
            {buildingData.map((element,index) => (
              <BuildingButton
                data={element}
                key={index}
                checkBuildFinishHandler={checkBuildFinishHandler}
                collectHandler={collectHandler}
              ></BuildingButton>
            ))}
          </div>
        )}
        {buildingData && !buildingData.length && (
          <h5>No Building . Start Building</h5>
        )}
        {inventoryData && (
          <div className={Styles.inventory}>
            <Inventory
              inventoryData={inventoryData}
              addToInventoryHandler={addToInventoryHandler}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
