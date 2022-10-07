import React from "react";
import Button from "react-bootstrap/Button";
import Timer from "../UI/Timer";
import Styles from "./BuildingBox.module.css";
import { useContext, useEffect } from "react";
import DataContext from "../../store/data-context";
const ArmyButton = (props) => {
  const dataCtx = useContext(DataContext);
  const { data, checkProduceFinishHandler } = props;
  let produceTime = 70;
  if (data.balancingContentId === "archer") {
    produceTime = 60;
  } else if ((data.balancingContentId = "soldier")) {
    produceTime = 30;
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.name}>{data.balancingContentId}</div>
      <div className={Styles.name}>{data.quantity}</div>
      {/* {dataCtx.currProduce === data.balancingContentId && (
        <div className={Styles.timer}>
          Produce Finishes in{" "}
          <Timer
            startTime={produceTime}
            checkBuildFinishHandler={checkProduceFinishHandler}
            type={data.balancingContentId}
          />{" "}
          seconds .
        </div>
      )} */}
    </div>
  );
};

export default ArmyButton;
