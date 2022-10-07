import React from "react";
import Styles from "./Box.module.css";
import Button from "react-bootstrap/Button";

const Box = (props) => {
  const { data, startProduceHandler } = props;
  return (
    <div className={Styles.container}>
      <div className={Styles.name}>{data.name}</div>
      <div className={Styles.count}>
        <div>Build Time : {data.produceTime} </div>
      </div>
      <div className={Styles.controls}>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            startProduceHandler(data.id);
          }}
        >
          Produce
        </Button>
      </div>
    </div>
  );
};

export default Box;
