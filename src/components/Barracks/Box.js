import Styles from "./Box.module.css";
import Button from "react-bootstrap/Button";
import Timer from "../UI/Timer";
const Box = (props) => {
  const { data, startProduceHandler, checkProductionFinish, queueData } = props;
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
              startTime={data.produceTime}
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
