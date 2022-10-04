import React, { useEffect, useState, useContext } from "react";
import DataContext from "../../store/data-context";
const Timer = (props) => {
  const { startTime, id, checkBuildFinishHandler } = props;
  const dataCtx = useContext(DataContext);
  const [timer, setTimer] = useState(startTime);
  if (timer === 0) {
    checkBuildFinishHandler(id);
  }
  useEffect(() => {
    const data = setInterval(() => {
      if (timer === 0) {
        return;
      } else {
        setTimer((prev) => prev - 1);
      }
    }, 1000);
    return () => {
      clearTimeout(data);
    };
  }, [timer]);
  return <div>{timer}</div>;
};

export default Timer;
