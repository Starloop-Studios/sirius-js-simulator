import React from "react";
import Army from "../Barracks/Army";
import Inventory from "../Inventory/Inventory";
import Styles from "./Footer.module.css";
import { useContext } from "react";
import DataContext from "../../store/data-context";

const Footer = (props) => {
  const { getLatestInventory } = props;
  const dataCtx = useContext(DataContext);
  return (
    <div className={Styles.container}>
      <h4>Inventory & Army</h4>
      <div className={Styles.main}>
        {dataCtx.inventoryData.length > 0 && (
          <Inventory getLatestInventory={getLatestInventory} />
        )}
        {dataCtx.armyData.length > 0 && <Army />}
      </div>
    </div>
  );
};

export default Footer;
