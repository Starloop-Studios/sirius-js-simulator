import React from "react";
import Styles from "./home.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import DataContext from "../../store/data-context";
import Box from "./Box";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  const userData = authCtx.userData;
  const buildingData = dataCtx.buildingData;
  const inventoryData = dataCtx.inventoryData;

  const startBuildHandler = (id) => {
    //api call to start building
    const newbuildingData = buildingData.map((ele) =>
      ele.id === id ? { ...ele, isBuilding: true } : ele
    );
    dataCtx.setBuildingData(newbuildingData);
    // dataCtx.startBuild(id);
  };

  const checkBuildFinishHandler = (id) => {
    //api call to chechk build finish
    const newbuildingData = buildingData.map((ele) =>
      ele.id === id
        ? { ...ele, produce: true, build: true, isBuilding: false }
        : ele
    );
    dataCtx.setBuildingData(newbuildingData);
    console.log(id);
  };
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
              <Box
                data={element}
                key={element.id}
                startBuildHandler={startBuildHandler}
                checkBuildFinishHandler={checkBuildFinishHandler}
              ></Box>
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
