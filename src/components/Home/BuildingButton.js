import React from "react";
import Button from "react-bootstrap/Button";
import Timer from "../UI/Timer";
import Styles from "./BuildingBox.module.css";

const BuildingButton = (props) => {
  const { data, checkBuildFinishHandler, collectHandler } = props;
  let controlName = "Collect";
  if (data.balancingContentId === "barracks") {
    controlName = "Produce";
  }
  var startTime = 5;
  if (data.balancingContentId === "lumber-mill") {
    startTime = 10;
  } else if (data.balancingContentId === "iron-mine") {
    startTime = 15;
  } else if (data.balancingContentId === "gold-mine") {
    startTime = 7;
  } else if (data.balancingContentId === "barracks") {
    startTime = 20;
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.name}>{data.balancingContentId}</div>
      {data.status === "pending" && (
        <div className={Styles.timer}>
          Build Finishes in{" "}
          <Timer
            startTime={startTime}
            checkBuildFinishHandler={checkBuildFinishHandler}
          />{" "}
          seconds .
        </div>
      )}
      {data.status === "activated" && (
        <div className={Styles.timer}>{controlName} resources !</div>
      )}
      <div className={Styles.controls}>
        <Button
          onClick={() => {
            collectHandler(data.id, data.balancingContentId);
          }}
          variant="success"
          disabled={data.status === "activated" ? false : true}
        >
          {controlName}
        </Button>
      </div>
    </div>
  );
};

export default BuildingButton;
