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
      <div className={Styles.content}>
        <div className={Styles.title}>Build Time </div>
        <div>:</div>
        <div className={Styles.main}>{data.buildTime} s</div>

        <div className={Styles.title}>Maximum Quantity</div>
        <div>:</div>
        <div className={Styles.main}>{data.maxQuantity}</div>

        <div className={Styles.title}>Resource</div>
        <div>:</div>
        <div className={Styles.main}>
          {data.cost.map((ele, index) => (
            <span key={index}>
              {ele.resource}({ele.resourceQuantity}){" "}
            </span>
          ))}
        </div>
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
      </div>
    </div>
  );
};

export default Box;
