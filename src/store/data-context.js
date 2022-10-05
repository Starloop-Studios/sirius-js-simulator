import React, { createContext, useState, useCallback } from "react";

const DataContext = createContext({
  inventoryData: [],
  buildingData: [],
  setInitialData: () => {},
  setBuildingData: () => {},
  setInventoryData: () => {},
  setSettlementId: () => {},
});

export const DataContextProvider = (props) => {
  // const intialToken = localStorage.getItem("token");
  // const intialStudentId = localStorage.getItem("studentId");
  //   const [initialData, setInitialData] = useState(null);
  const [buildingData, setBuildingData] = useState();
  const [inventoryData, setInventoryData] = useState();

  const setData = (data) => {
    const bData = data.contents.Building;
    setInventoryData(data.contents.InventorySeed);
    const array = [];
    let counter = 1;
    for (var i = 0; i < bData.length; i++) {
      for (var j = 0; j < Number(bData[i].maxQuantity); j++) {
        let data = {
          id: counter++,
          nameId: bData[i].id,
          name: bData[i].name,
          buildTime: Number(bData[i].buildTime),
          isBuilding: false,
          build: false,
          produce: false,
        };
        array.push(data);
      }
    }
    setBuildingData(array);
  };

  const setSettlementId = (id) => {
    localStorage.setItem("settlementId", id);
  };

  const contextValue = {
    setInitialData: setData,
    buildingData,
    inventoryData,
    setBuildingData,
    setInventoryData,
    setSettlementId,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
