import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToastComponent = (props) => {
  const { isError, clearError } = props;
  return (
    <ToastContainer className="p-3" position="top-start">
      <Toast
        show={!!isError}
        onClose={() => {
          clearError();
        }}
        animation={true}
        delay={3000}
        autohide
        bg="danger"
      >
        <Toast.Header closeButton={true}>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Message</strong>
        </Toast.Header>
        <Toast.Body>{isError}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;
