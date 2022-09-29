import { useContext, useEffect, useState } from "react";
import config from "../Config/config";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import Spinner from "../components/UI/Spinner";
import Home from "../components/Home/Home";

const Dashboard = () => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const [balancingData, setBalancingData] = useState(null);
  const setBalancingDataHandler = async () => {
    const balancingForRetrievalOfLatest = config.balancingForRetrievalOfLatest;
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_HOST_URL}${balancingForRetrievalOfLatest.path}`,
        balancingForRetrievalOfLatest.method,
        null,
        { Authorization: `Bearer ${authCtx.token}` }
      );
      data.contents.Building.forEach((element, index) => {
        data.contents.Building[index] = {
          ...data.contents.Building[index],
          currQuantity: 0,
        };
      });
      authCtx.setBuildingData(data.contents.Building);
      authCtx.setInventoryData(data.contents.InventorySeed);
      setBalancingData(data);
    } catch (error) {
      console.log(error, isError);
    }
  };

  useEffect(() => {
    setBalancingDataHandler();
  }, []);

  return (
    <>
      {isLoading && <Spinner show={isLoading} />}
      <Home balancingData={balancingData} />
    </>
  );
};

export default Dashboard;
