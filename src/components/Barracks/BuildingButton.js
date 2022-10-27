import React from "react";
import Styles from "./BuildingBox.module.css";

const ArmyButton = (props) => {
  const { data } = props;
  return (
    <div className={Styles.container}>
      <div className={Styles.name}>{data.balancingContentId}</div>
      <div className={Styles.name}>{data.quantity}</div>
    </div>
  );
};

export default ArmyButton;
