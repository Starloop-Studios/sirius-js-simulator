import React, { createContext, useState } from "react";
const DataContext = createContext({
  buildingControls: [],
  inventoryData: [],
  buildingData: [],
  combatUnitData: [],
  armyData: [],
  armyQueue: [],
  currProduce: "none",
  balancingData: {},
  barrackId: "",
  setBuildingControls: () => {},
  setInitialData: () => {},
  setBuildingData: () => {},
  setInventoryData: () => {},
  setSettlementId: () => {},
  setArmyQueue: () => {},
  setArmyData: () => {},
  setCurrentProduce: () => {},
  setBalancingData: () => {},
  setBarrackId: () => {},
});
export const DataContextProvider = (props) => {
  const [buildingControls, setBuildingControls] = useState([]);
  const [buildingData, setBuildingData] = useState();
  const [inventoryData, setInventoryData] = useState([]);
  const [combatUnitData, setCombatUnitData] = useState();
  const [armyData, setArmyData] = useState([]);
  const [balancingData, setBalancingData] = useState({});
  const [barrackId, setBarrackId] = useState("");

  const setSettlementId = (id) => {
    localStorage.setItem("settlementId", id);
  };

  const contextValue = {
    setBalancingData,
    balancingData,
    buildingControls,
    buildingData,
    inventoryData,
    combatUnitData,
    armyData,
    barrackId,
    setBuildingControls,
    setBuildingData,
    setInventoryData,
    setSettlementId,
    setArmyData,
    setBarrackId,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
