import React from "react";
import Army from "../Barracks/Army";
import Inventory from "../Inventory/Inventory";
import Styles from './Footer.module.css'
const Footer = (props) => {
    const {armyData ,inventoryData,getLatestInventory} = props;
  return (
    <div className = {Styles.container}> 
      {inventoryData && <Inventory
        inventoryData={inventoryData}
        getLatestInventory={getLatestInventory}
      />}
      {armyData.length > 0 &&<Army armyData={armyData}/>}
    </div>
  );
};

export default Footer;
