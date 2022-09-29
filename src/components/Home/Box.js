import React from "react";
import Styles from "./Box.module.css";
import Button from "react-bootstrap/Button";

const Box = (props) => {
  const { data } = props;
  return (
    <div className={Styles.container}>
      <div className={Styles.name}>{data.name}</div>
      <div className={Styles.count}>
        <div>Max Count : {data.maxQuantity} </div>
        <div>Current Count : {data.currQuantity} </div>
        <div>Build Time : {data.buildTime} </div>
      </div>
      <div className={Styles.controls}>
        <Button variant="primary" size="sm">
          Build
        </Button>
        <Button variant="success" size="sm">
          Collect
        </Button>
      </div>
    </div>
  );
};

export default Box;
