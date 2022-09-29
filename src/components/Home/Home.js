import React from "react";
import Styles from "./home.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Box from "./Box";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const userData = authCtx.userData;
  const buildingData = authCtx.buildingData;
  const inventoryData = authCtx.inventoryData;
  return (
    <div className={Styles.container}>
      {userData && (
        <div className={Styles.head}>
          Welcome {userData.username}, to the sirirus zoolana stimulator.
        </div>
      )}
      <div className={Styles.content}>
        <h4>Building Controls </h4>
        {buildingData && (
          <div className={Styles.build}>
            {buildingData.map((element) => (
              <Box data={element} key={element.id}></Box>
            ))}
          </div>
        )}
        <div className={Styles.inventory}>
          <div className={Styles.name}>Inventory</div>
          {inventoryData && (
            <div className={Styles.content}>
              {inventoryData.map((ele) => (
                <div key={ele.itemId} className={Styles.box}>
                  {ele.itemId} : {ele.quantity}{" "}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
