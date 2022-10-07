import React from "react";
import Styles from "./inventory.module.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Inventory = (props) => {
  const { inventoryData, addToInventoryHandler, isLoading } = props;
  console.log(inventoryData);
  return (
    <div>
      {inventoryData && (
        <>
          <div className={Styles.name}>
            {isLoading ? "Updating ..." : "Inventory"}
          </div>
          <div className={Styles.content}>
            {inventoryData.map((ele, index) => (
              <div key={index} className={Styles.box}>
                <div className={Styles.itemName}>{ele.balancingContentId}</div>
                <div className={Styles.itemQuantity}>{ele.quantity}</div>
                <div className={Styles.itemControl}>
                  <Button
                    onClick={() => {
                      addToInventoryHandler(ele.balancingContentId);
                    }}
                  >
                    +ADD
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Inventory;
