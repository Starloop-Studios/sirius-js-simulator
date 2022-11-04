import React from "react";
import Styles from "./inventory.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import DataContext from "../../store/data-context";
import useHttp from "../../hooks/use-http";
import Toast from "../UI/Toast";
import Spinner from "../UI/Spinner";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
const Inventory = (props) => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const { getLatestInventory } = props;

  const addToInventoryHandler = async (itemId) => {
    const userId = authCtx.userData.userId;
    const quantity = 1000;
    console.log(`addToInventoryHandler() called. to add ${itemId}`);
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}/api/v1/inventory/operations?userId=${userId}&balancingContentId=${itemId}&opType=increment&quantity=${quantity}`,
        "POST",
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      toast.success(`Added ${quantity} ${itemId} to inventory.`);
      console.log(`${quantity} ${itemId} added to inventory.`);
      await getLatestInventory();
    } catch (error) {
      console.log(error, isError);
    }
  };

  return (
    <div className={Styles.container}>
      <Toast isError={isError} clearError={clearError} />
      <div className={Styles.name}>
        {isLoading ? "Updating ..." : "Inventory"}
      </div>
      <div className={Styles.content}>
        {dataCtx.inventoryData.length > 0 &&
          dataCtx.inventoryData.map((ele, index) => (
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
        {!dataCtx.inventoryData.length === 0 && (
          <span>No Inventory Data received.</span>
        )}
      </div>
    </div>
  );
};

export default Inventory;
