import React from "react";
import classes from "./Modal.module.css";

const Modal = ({ show, children, close }) => {
  return (
    <>
      {show ? <div className={classes.Backdrop} onClick={close}></div> : null}
      <div
        className={classes.Modal}
        style={{
          transform: show ? "transforY(0)" : "transform(-100vh)",
          opacity: show ? "1" : "0"
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
