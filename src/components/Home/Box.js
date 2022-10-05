import React from "react";
import Styles from "./Box.module.css";
import Button from "react-bootstrap/Button";
import Timer from "../UI/Timer";
const Box = (props) => {
  const { data, startBuildHandler, checkBuildFinishHandler, collectHandler } =
    props;
  return (
    <div className={Styles.container}>
      <div className={Styles.name}>{data.name}</div>
      <div className={Styles.count}>
        <div>Build Time : {data.buildTime} </div>
      </div>
      <div className={Styles.status}>
        <h6>Status : &nbsp;</h6>
        {!data.isBuilding && !data.build && <span>Start Building !</span>}
        {data.isBuilding && (
          <div className={Styles.timer}>
            Build Finishes in{" "}
            <Timer
              startTime={data.buildTime}
              id={data.id}
              checkBuildFinishHandler={checkBuildFinishHandler}
            />{" "}
            seconds .
          </div>
        )}
        {!data.isBuilding && data.produce && <span>Start Collecting !</span>}
      </div>
      <div className={Styles.controls}>
        {!data.build && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              startBuildHandler(data.id);
            }}
          >
            {data.isBuilding ? "Building..." : "Build"}
          </Button>
        )}
        {data.build && (
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              collectHandler(data.id);
            }}
          >
            Collect
          </Button>
        )}
      </div>
    </div>
  );
};

export default Box;
