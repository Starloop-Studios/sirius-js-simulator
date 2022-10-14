import React from "react";
// import { data } from "../../data/intialData";
import Styles from "./Army.module.css";
import BuildingButton from "./BuildingButton";
const Army = (props) => {
  const { armyData } = props;
  console.log(armyData);
  return (
    <div className={Styles.container}>
      <div className={Styles.name}>Army</div>
      <div className={Styles.content}>
        {armyData.map((ele, index) => (
          <div key={index} className={Styles.box}>
            <div className={Styles.itemName}>{ele.balancingContentId}</div>
            <div className={Styles.itemQuantity}>{ele.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Army;
