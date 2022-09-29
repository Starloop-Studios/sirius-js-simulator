import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
const spinner = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={false}
    >
      {" "}
      <Button variant="primary" disabled size="sm">
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        &nbsp;Loading...
      </Button>
    </Modal>
  );
};

export default spinner;
