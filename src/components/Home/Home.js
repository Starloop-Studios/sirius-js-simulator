import React from "react";
import Styles from "./home.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import DataContext from "../../store/data-context";
import Box from "./Box";
import config from "../../Config/config";
import useHttp from "../../hooks/use-http";
import Toast from "../UI/Toast";
import Spinner from "../UI/Spinner";

const Home = () => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  const userData = authCtx.userData;
  const buildingData = dataCtx.buildingData;
  const inventoryData = dataCtx.inventoryData;

  const startBuildHandler = async (id) => {
    //api call to start building
    const currBuildingData = buildingData.find((ele) => ele.id === id);
    const buildingForCreation = config.buildingForCreation;
    const settlementId = localStorage.getItem("settlementId");
    const buildingReqData = {
      settlementId,
      balancingContentId: currBuildingData.nameId,
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
      const newbuildingData = buildingData.map((ele) =>
        ele.id === id ? { ...ele, isBuilding: true, id: data.id } : ele
      );
      dataCtx.setBuildingData(newbuildingData);
    } catch (error) {
      console.log(error, isError);
    }
  };

  const checkBuildFinishHandler = async (id) => {
    //api call to chechk build finish
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}/api/v1/settlement/buildings/${id}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      console.log("build Data recevied.", data);
      if (data.status === "activated") {
        const newbuildingData = buildingData.map((ele) =>
          ele.id === id
            ? { ...ele, produce: true, build: true, isBuilding: false }
            : ele
        );
        dataCtx.setBuildingData(newbuildingData);
      } else {
        console.log(`${id} build failed `);
        checkBuildFinishHandler(id);
      }
    } catch (error) {
      console.log(error, isError);
    }
  };
  const updateInventory = async () => {
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
      console.log("inventory Data recevied.", data);
      const newInventoryData = data.content.map((ele) => ({
        ...ele,
        itemId: ele.balancingContentId,
      }));
      dataCtx.setInventoryData(newInventoryData);
    } catch (error) {
      console.log(error, isError);
    }
  };
  const collectHandler = async (id) => {
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
      updateInventory();
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
        {buildingData && (
          <div className={Styles.build}>
            {buildingData.map((element) => (
              <Box
                data={element}
                key={element.id}
                startBuildHandler={startBuildHandler}
                checkBuildFinishHandler={checkBuildFinishHandler}
                collectHandler={collectHandler}
              ></Box>
            ))}
          </div>
        )}
        <div className={Styles.inventory}>
          <div className={Styles.name}>Inventory</div>
          {inventoryData && (
            <div className={Styles.content}>
              {inventoryData.map((ele) => (
                <div key={ele.itemId} className={Styles.box}>
                  {ele.itemId} : {ele.quantity}{" "}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
