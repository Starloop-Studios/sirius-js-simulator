import React, { useEffect, useState } from "react";
const Timer = (props) => {
  const { startTime, checkBuildFinishHandler } = props;
  const [timer, setTimer] = useState(startTime);

  useEffect(() => {
    const data = setInterval(() => {
      if (timer === 0) {
        checkBuildFinishHandler();
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
