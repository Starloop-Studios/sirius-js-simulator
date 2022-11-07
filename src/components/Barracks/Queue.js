import React from "react";
import { data } from "../../data/intialData";
import Styles from "./Barracks.module.css";
const Queue = (props) => {
  const { queueData } = props;
  return (
    <div className={Styles.queueCont}>
      <h4>Queue</h4>
      <div>
        {queueData && queueData.length == 0 && (
          <h6>Queue is Empty . Start Producing.</h6>
        )}
        {queueData &&
          queueData.map((ele, index) => (
            <div key={index}>
              {index + 1}.&nbsp;{ele.meta.produceId}
              ({ele.meta.collected ? ele.meta.collected : 0}/{ele.meta.expected})
            </div>
          ))}
      </div>
    </div>
  );
};

export default Queue;
