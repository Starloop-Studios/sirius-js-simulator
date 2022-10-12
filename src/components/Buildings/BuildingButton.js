import React, { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Timer from "../UI/Timer";
import Styles from "./BuildingBox.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import DataContext from "../../store/data-context";
import useHttp from "../../hooks/use-http";
import Toast from "../UI/Toast";
const BuildingButton = (props) => {
  const { data, checkBuildFinishHandler, collectHandler } = props;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const [produce, setProduce] = useState(0);
  const startTime = dataCtx.balancingData
    ? dataCtx.balancingData.Building.find(
        (ele) => ele.id === data.balancingContentId
      ).buildTime
    : 5;
  const buildingCapacity = dataCtx.balancingData
    ? dataCtx.balancingData.BuildingCapacity.find(
        (ele) => ele.buildingId === data.balancingContentId && ele.level === 1
      )
    : {};
  const buildingYeild = dataCtx.balancingData
    ? dataCtx.balancingData.BuildingYield.find(
        (ele) => ele.buildingId === data.balancingContentId
      )
    : {};

  let controlName = "Collect";
  if (data.balancingContentId === "barracks") {
    controlName = "Produce";
  }

  const getLatestProduction = async () => {
    try {
      const reqData = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}/api/v1/production?buildingId=${data.id}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      setProduce(reqData[0].meta.quantity ? reqData[0].meta.quantity : 0);
    } catch (error) {
      console.log(error, isError);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.status === "activated" && produce < buildingCapacity.capacity) {
        getLatestProduction();
      }
    }, buildingCapacity.cycleTime * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [data.status, produce]);

  return (
    <div className={Styles.container}>
      <Toast isError={isError} clearError={clearError} />
      <div className={Styles.name}>{data.balancingContentId}</div>
      {data.status === "pending" && (
        <div className={Styles.content}>
          <div className={Styles.title}>Time Left</div>
          <div>:</div>
          <div className={Styles.main}>
            {" "}
            <Timer
              startTime={startTime}
              checkBuildFinishHandler={checkBuildFinishHandler}
              id={data.id}
            />
          </div>
        </div>
      )}
      {data.status === "checking" && (
        <div className={Styles.content}>
          <div className={Styles.title}>Status</div>
          <div>:</div>
          <div className={Styles.main}>Updating...</div>
        </div>
      )}

      {buildingYeild && (
        <div className={Styles.content}>
          <div className={Styles.title}>Produce Type</div>
          <div>:</div>
          <div className={Styles.main}>{buildingYeild.produceId} </div>
        </div>
      )}
      {buildingYeild && (
        <div className={Styles.content}>
          <div className={Styles.title}>Yeild Per Cycle</div>
          <div>:</div>
          <div className={Styles.main}>{buildingYeild.yield} </div>
        </div>
      )}

      {buildingCapacity && (
        <div className={Styles.content}>
          <div className={Styles.title}>Cycle Time</div>
          <div>:</div>
          <div className={Styles.main}>{buildingCapacity.cycleTime} S</div>
        </div>
      )}

      {buildingCapacity && (
        <div className={Styles.content}>
          <div className={Styles.title}>Max Capacity</div>
          <div>:</div>
          <div className={Styles.main}>{buildingCapacity.capacity}</div>
        </div>
      )}

      <div className={Styles.content}>
        <div className={Styles.title}>Current Produce</div>
        <div>:</div>
        <div className={Styles.main}>{isLoading ? "..." : produce}</div>
      </div>

      {data.status !== "pending" && (
        <div className={Styles.controls}>
          <Button
            onClick={() => {
              setProduce(0);
              collectHandler(data.id, data.balancingContentId);
            }}
            variant="success"
            disabled={data.status === "activated" ? false : true}
          >
            {controlName}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BuildingButton;
