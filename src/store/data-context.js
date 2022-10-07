import React, { createContext, useState } from "react";

const DataContext = createContext({
  buildingControls: [],
  inventoryData: [],
  buildingData: [],
  combatUnitData: [],
  armyData: [],
  armyQueue: [],
  currProduce: "none",
  setBuildingControls: () => {},
  setInitialData: () => {},
  setBuildingData: () => {},
  setInventoryData: () => {},
  setSettlementId: () => {},
  setArmyQueue: () => {},
  setArmyData: () => {},
  setCurrentProduce: () => {},
});

export const DataContextProvider = (props) => {
  // const intialToken = localStorage.getItem("token");
  // const intialStudentId = localStorage.getItem("studentId");
  //   const [initialData, setInitialData] = useState(null);
  const [buildingControls, setBuildingControls] = useState([]);
  const [buildingData, setBuildingData] = useState();
  const [inventoryData, setInventoryData] = useState();
  const [combatUnitData, setCombatUnitData] = useState();
  const [armyData, setArmyData] = useState();
  const [armyQueue, setArmyQueue] = useState();
  const [currProduce, setCurrentProduce] = useState("none");

  const setData = (data) => {
    setInventoryData(data.contents.InventorySeed);
    setCombatUnitData(data.contents.CombatUnit);
    // const array = [];
    // let counter = 1;
    // for (var i = 0; i < bData.length; i++) {
    //   for (var j = 0; j < Number(bData[i].maxQuantity); j++) {
    //     let data = {
    //       id: counter++,
    //       nameId: bData[i].id,
    //       name: bData[i].name,
    //       buildTime: Number(bData[i].buildTime),
    //       isBuilding: false,
    //       build: false,
    //       produce: false,
    //     };
    //     array.push(data);
    //   }
    // }
    const newArmyData = data.contents.CombatUnit.map((ele) => ({
      name: ele.name,
      produceId: ele.id,
      quantity: 0,
      balancingContentId: ele.id,
      produceTime: ele.produceTime,
    }));
    setArmyData([]);
    setBuildingData([]);
  };

  const setSettlementId = (id) => {
    localStorage.setItem("settlementId", id);
  };

  const contextValue = {
    setInitialData: setData,
    buildingControls,
    buildingData,
    inventoryData,
    combatUnitData,
    armyData,
    armyQueue,
    currProduce,
    setBuildingControls,
    setBuildingData,
    setInventoryData,
    setSettlementId,
    setArmyQueue,
    setArmyData,
    setCurrentProduce,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
