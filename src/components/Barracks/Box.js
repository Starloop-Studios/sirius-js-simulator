import Styles from "./Box.module.css";
import Button from "react-bootstrap/Button";
import Timer from "../UI/Timer";
import moment from "moment";
import { useState } from "react";
const Box = (props) => {
  const { data, startProduceHandler, checkProductionFinish, queueData } = props;
  const [unitQuanity, setUnitQuantity] = useState(1);

  let startTime = data.produceTime;
  const maxQuantity = 20;
  const minQuantity = 1;
  //timer sync form backend
  if (queueData.length > 0 && queueData[0].meta.produceId === data.id) {
    const currQueueData = queueData[0];
    const endDate = moment(currQueueData.startDate).add(
      data.produceTime *
        ((currQueueData.meta.collected ? currQueueData.meta.collected : 0) + 1),
      "s"
    );
    const currDate = moment();
    let diff = Math.ceil(moment.duration(endDate - currDate).asSeconds());
    if (diff <= 0 || diff > data.produceTime) {
      diff = 0;
    }
    startTime =
      data.produceTime - diff > 2 && diff !== 0 ? diff + 1 : data.produceTime;
    // console.log(currQueueData.createdDate, "createdDate");
    // console.log(endDate, "endDate");
    // console.log(currDate, "currDate");
    // console.log(diff, "diff");
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.name}>{data.name}</div>
      <div className={Styles.content}>
        <div className={Styles.title}>Build Time </div>
        <div>:</div>
        <div className={Styles.main}>{data.produceTime} s</div>
        <div className={Styles.title}>Resource</div>
        <div>:</div>
        <div className={Styles.main}>
          {data.cost.map((ele, index) => (
            <span key={index}>
              {ele.resource}({ele.resourceQuantity}){" "}
            </span>
          ))}
        </div>
      </div>
      {queueData.length > 0 && queueData[0].meta.produceId === data.id && (
        <div className={Styles.content}>
          <div className={Styles.title}>Time Left</div>
          <div>:</div>
          <div className={Styles.main}>
            {" "}
            <Timer
              startTime={startTime}
              // startTime={data.produceTime}
              checkBuildFinishHandler={checkProductionFinish}
              id={data.id}
            />
          </div>
        </div>
      )}

      <div className={Styles.quantity}>
        <Button
          onClick={() => {
            if (unitQuanity >= maxQuantity) {
              console.log(`Maximum quanity is ${maxQuantity}`);
              return;
            }
            setUnitQuantity((prev) => prev + 1);
          }}
          disabled={unitQuanity > maxQuantity - 1 ? true : false}
        >
          +
        </Button>
        <input
          type="number"
          value={unitQuanity}
          onChange={(event) => {
            setUnitQuantity(parseInt(event.target.value));
          }}
        ></input>
        <Button
          onClick={() => {
            if (unitQuanity <= minQuantity) {
              console.log(`Minimum quanity is ${minQuantity}`);
              return;
            }
            setUnitQuantity((prev) => prev - 1);
          }}
          disabled={unitQuanity <= minQuantity ? true : false}
        >
          -
        </Button>
      </div>

      <div className={Styles.controls}>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setUnitQuantity(1);
            startProduceHandler(data.id, unitQuanity);
          }}
        >
          Produce
        </Button>
      </div>
    </div>
  );
};

export default Box;
