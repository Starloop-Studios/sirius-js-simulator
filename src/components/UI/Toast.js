import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToastComponent = (props) => {
  const { isError, clearError } = props;

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      onClose={false}
      onClick={() => {
        clearError();
      }}
      closeButton={false}
    />
  );
};

export default ToastComponent;
