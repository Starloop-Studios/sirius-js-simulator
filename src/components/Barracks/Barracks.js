import { useCallback, useContext } from "react";
import DataContext from "../../store/data-context";
import AuthContext from "../../store/auth-context";
import Box from "./Box";
import Styles from "./Barracks.module.css";
import Queue from "./Queue";
import config from "../../Config/config";
import useHttp from "../../hooks/use-http";
import Toast from "../UI/Toast";
import Spinner from "../UI/Spinner";
import { toast } from "react-toastify";

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
const Barracks = (props) => {
  const {
    barrackId,
    getLatestQueue,
    getLatestInventory,
    getLatestArmy,
    queueData,
    setQueueData,
  } = props;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const combatUnitData = dataCtx.balancingData.CombatUnit;
  const unitCost = dataCtx.balancingData.UnitCost;
  const startProduceHandler = async (produceId) => {
    console.log("StartProductionCalled()");
    const productionForCreation = config.productionForCreation;
    const startProdData = {
      type: "start",
      balancingVersion: "0",
      buildingId: barrackId,
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
      toast.success(`${capitalize(data.meta.produceId)} added to queue.`);
      console.log("Production Data  recevied.", data);
      await getLatestQueue();
      await getLatestInventory();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const checkProductionFinish = useCallback(async () => {
    setQueueData([]);
    await getLatestQueue();
    await getLatestArmy();
    console.log("Check Called .", queueData);
  }, [queueData]);

  return (
    <div className={Styles.container} id="barracks">
      <Toast isError={isError} clearError={clearError} />
      {isLoading && <Spinner show={isLoading} />}
      <div className={Styles.main}>
        <h4>Welcome Inside the barracks </h4>
        <div className={Styles.controls}>
          {combatUnitData &&
            combatUnitData.map((ele) => {
              const cost = unitCost.filter((unit) => unit.unitId === ele.id);
              const dataObject = {
                ...ele,
                cost: cost,
              };
              return (
                <Box
                  key={ele.id}
                  data={dataObject}
                  startProduceHandler={startProduceHandler}
                  checkProductionFinish={checkProductionFinish}
                  queueData={queueData}
                />
              );
            })}
        </div>
      </div>
      <div className={Styles.queue}>
        <Queue queueData={queueData} />
      </div>
    </div>
  );
};

export default Barracks;
