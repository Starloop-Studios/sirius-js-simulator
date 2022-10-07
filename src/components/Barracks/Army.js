import React from "react";
// import { data } from "../../data/intialData";
import Styles from "./Barracks.module.css";
import BuildingButton from "./BuildingButton";
const Army = (props) => {
  const { armyData } = props;
  console.log(armyData);
  return (
    <div className={Styles.inventory}>
      <h3>Current Army</h3>
      <div className ={Styles.armyBox}>
        {armyData &&
          armyData.map((ele, index) => (
            <BuildingButton key={index} data={ele} />
          ))}
      </div>
    </div>
  );
};

export default Army;
