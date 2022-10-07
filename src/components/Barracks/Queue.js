import React from "react";
import Styles from "./Barracks.module.css";
const Queue = (props) => {
  const { queueData } = props;
  return (
    <div className={Styles.queueCont}>
      <h3>Queue</h3>
      <div>
        {queueData && queueData.length == 0 && (
          <h6>Queue is Empty . Start Producing.</h6>
        )}
        {queueData &&
          queueData.map((ele, index) => (
            <div key={index}>
              {index + 1}.&nbsp;{ele.meta.produceId}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Queue;
