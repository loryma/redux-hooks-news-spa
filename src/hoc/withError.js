import React, { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";

const withError = WrappedComponent => {
  return function(props) {
    const [error, setError] = useState(null);
    let { error: propError } = props;

    useEffect(() => {
      setError(propError);
    }, [propError, setError]);
    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <>
        <Modal show={error} close={errorConfirmedHandler}>
          {props.error ? props.error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withError;
