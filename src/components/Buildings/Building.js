import React from "react";
import Styles from "./Building.module.css";
import { useContext, useCallback } from "react";
import AuthContext from "../../store/auth-context";
import DataContext from "../../store/data-context";
import Box from "./Box";
import config from "../../Config/config";
import useHttp from "../../hooks/use-http";
import Toast from "../UI/Toast";
import BuildingButton from "./BuildingButton";
import Spinner from "../UI/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Building = (props) => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const navigate = useNavigate();

  const {
    buildingData,
    setBuildingData,
    getLatestSettlement,
    getLatestInventory,
    setBarrackId,
  } = props;
  const buildingControls = dataCtx.balancingData.Building;
  const buildingCost = dataCtx.balancingData.BuildingCost;

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
      toast.error(isError);
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
    console.log(buildingReqData);
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
      toast.info(`Building Started For ${id}`);
      await getLatestSettlement();
      await getLatestInventory();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const checkBuildFinishHandler = useCallback(
    async (id) => {
      setBuildingData(
        buildingData.map((ele) =>
          ele.id === id ? { ...ele, status: "checking" } : ele
        )
      );
      console.log("checkBuildFinishHandler() called ", id);
      await getLatestSettlement();
    },
    [buildingData]
  );

  const collectHandler = async (id, type) => {
    if (type === "barracks") {
      console.log("Enter to the barracks called .");
      setBarrackId(id);
      // navigate("/barracks", { state: { buildingId: id } });
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
      toast.success(
        `Collected ${data.meta.currentCollected} units ${data.meta.produceId}.`
      );
      console.log("collection Data recevied.", data);
      await getLatestInventory();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <div>
      <Toast isError={isError} clearError={clearError} />
      {isLoading && <Spinner show={isLoading} />}
      <h4>Building Controls </h4>
      {buildingControls && (
        <div className={Styles.controls}>
          {buildingControls.map((control, index) => {
            const newBuidlingArray = buildingData.filter(
              (build) => build.balancingContentId === control.id
            );
            const cost = buildingCost.filter(
              (building) =>
                building.buildingId === control.id && building.level === 1
            );
            const dataObject = {
              ...control,
              cost: cost,
            };
            return (
              <div className={Styles.build} key={index}>
                <Box
                  data={dataObject}
                  startBuildHandler={startBuildHandler}
                ></Box>
                {newBuidlingArray.map((ele, index) => (
                  <BuildingButton
                    data={ele}
                    key={index}
                    checkBuildFinishHandler={checkBuildFinishHandler}
                    collectHandler={collectHandler}
                  ></BuildingButton>
                ))}
              </div>
            );
          })}
        </div>
      )}
      {buildingData && !buildingData.length && (
        <h5>No Building . Start Building</h5>
      )}
    </div>
  );
};

export default Building;
