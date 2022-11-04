import { useCallback, useContext, useEffect } from "react";
import config from "../Config/config";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";
import Footer from "../components/Footer/Footer";
import Toast from "../components/UI/Toast";
import Spinner from "../components/UI/Spinner";
import { toast } from "react-toastify";
const FooterPage = () => {
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  const getLatestInventory = useCallback(async () => {
    const inventoryForRetrievalByAll = config.inventoryForRetrievalByAll;
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${inventoryForRetrievalByAll.path}`,
        inventoryForRetrievalByAll.method,
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      console.log("Inventory Data recevied.", data);
      dataCtx.setInventoryData(data.content);
      // dataCtx.setInventoryData(data.content);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }, []);

  const getLatestArmy = useCallback(async () => {
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
      toast.error(error.message);
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    getLatestArmy();
    getLatestInventory();
  }, []);

  return (
    <div>
      {isError && <Toast isError={isError} clearError={clearError} />}
      {isLoading && <Spinner show={isLoading} />}
      <Footer getLatestInventory={getLatestInventory} />
    </div>
  );
};

export default FooterPage;
