import Styles from "./Box.module.css";
import Button from "react-bootstrap/Button";
import Timer from "../UI/Timer";
import moment from "moment";
const Box = (props) => {
  const { data, startProduceHandler, checkProductionFinish, queueData } = props;
  
  let startTime = data.produceTime;
  if (queueData.length > 0 && queueData[0].meta.produceId === data.id) {
    const currQueueData = queueData[0];
    const endDate = moment(currQueueData.createdDate).add(
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
    console.log(diff, "diff");
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

      <div className={Styles.controls}>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            startProduceHandler(data.id);
          }}
        >
          Produce
        </Button>
      </div>
    </div>
  );
};

export default Box;
