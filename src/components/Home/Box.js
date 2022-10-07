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
              collectHandler(data.id, data.nameId);
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
