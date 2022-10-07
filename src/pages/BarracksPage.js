import { useContext, useEffect, useState } from "react";
import Barracks from "../components/Barracks/Barracks";
// import { queue } from "../data/intialData";
import config from "../Config/config";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";
import { useLocation, useNavigate } from "react-router";
const BarracksPage = () => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const location = useLocation();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const buildingId = location.state.buildingId;

  useEffect(() => {
    if (!buildingId) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Barracks
        buildingId={location.state.buildingId}
        // getLatestQueue={getLatestQueue}
        // getLatestArmy={getLatestArmy}
      />
    </div>
  );
};

export default BarracksPage;
