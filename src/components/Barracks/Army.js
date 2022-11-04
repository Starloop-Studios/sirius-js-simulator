import { useCallback, useContext, useEffect } from "react";
import DataContext from "../../store/data-context";
import Styles from "./Army.module.css";
import BuildingButton from "./BuildingButton";
const Army = () => {
  const dataCtx = useContext(DataContext);
  return (
    <div className={Styles.container}>
      <div className={Styles.name}>Army</div>
      <div className={Styles.content}>
        {dataCtx.armyData.length > 0  &&
          dataCtx.armyData.map((ele, index) => (
            <div key={index} className={Styles.box}>
              <div className={Styles.itemName}>{ele.balancingContentId}</div>
              <div className={Styles.itemQuantity}>{ele.quantity}</div>
            </div>
          ))}
        {dataCtx.armyData.length === 0 && <span>No Army Data Found.</span>}
      </div>
    </div>
  );
};

export default Army;
