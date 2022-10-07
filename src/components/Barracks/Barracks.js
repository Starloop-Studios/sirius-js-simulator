import { useContext, useEffect } from "react";
import DataContext from "../../store/data-context";
import AuthContext from "../../store/auth-context";
import Box from "./Box";
import Styles from "./Barracks.module.css";
import Army from "./Army";
import Queue from "./Queue";
import config from "../../Config/config";
import useHttp from "../../hooks/use-http";
import Toast from "../UI/Toast";

const Barracks = (props) => {
  const { buildingId } = props;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const combatUnitData = dataCtx.combatUnitData;
  const queueData = dataCtx.armyQueue;
  const armyData = dataCtx.armyData;
  const getLatestQueue = async () => {
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}/api/v1/production?buildingId=${buildingId}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      console.log("Queue Data recevied.", data);
      dataCtx.setArmyQueue(data);
      if (!data.length) {
        return;
      }
      const produceId = data[0].meta.produceId;
      dataCtx.setCurrentProduce(produceId);
      // dataCtx.setArmyData(
      //   dataCtx.armyData.map((ele) =>
      //     ele.produceId === produceId
      //       ? { ...ele, isProducing: true }
      //       : { ...ele, isProducing: false }
      //   )
      // );
      // console.log("Updating the Army Data");
    } catch (error) {
      console.log(error, isError);
    }
  };
  const startProduceHandler = async (produceId) => {
    console.log("StartProductionCalled()");
    const productionForCreation = config.productionForCreation;
    const startProdData = {
      type: "start",
      balancingVersion: "0",
      buildingId: buildingId,
      meta: {
        produceId: produceId,
      },
    };
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${productionForCreation.path}`,
        productionForCreation.method,
        JSON.stringify(startProdData),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      console.log("Production Data  recevied.", data);
      await getLatestQueue();
    } catch (error) {
      console.log(error, isError);
    }
  };

  const getLatestArmy = async () => {
    console.log("getLatestArmy() called .");
    const armyForRetrieval = config.armyForRetrieval;
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${armyForRetrieval.path}`,
        armyForRetrieval.method,
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      console.log("Army Data recevied.", data);
      dataCtx.setArmyData(data.content);
    } catch (error) {
      console.log(error, isError);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await getLatestArmy();
      await getLatestQueue();
    }, [5000]);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(async () => {
    await getLatestArmy();
  }, []);

  return (
    <div className={Styles.container}>
      <Toast isError={isError} clearError={clearError} />
      <div className={Styles.main}>
        <h4>Welcome Inside the barracks </h4>
        <div className={Styles.controls}>
          {combatUnitData &&
            combatUnitData.map((ele) => (
              <Box
                key={ele.id}
                startProduceHandler={startProduceHandler}
                data={ele}
              />
            ))}
        </div>
        <div className={Styles.content}>
          <div className={Styles.army}>
            <Army armyData={armyData} />
          </div>
        </div>
      </div>
      <div className={Styles.queue}>
        <Queue queueData={queueData} />
      </div>
    </div>
  );
};

export default Barracks;
