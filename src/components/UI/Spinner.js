import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./Spinner.module.css";
import Spinner from "react-bootstrap/Spinner";
const Backdrop = (props) => {
  return <div className={styles.backdrop}>{props.children}</div>;
};

const spinner = (props) => {
  const portalElement = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop>
          <Spinner animation="border" variant="primary" />
        </Backdrop>,
        portalElement
      )}
    </Fragment>
  );
};

export default spinner;
