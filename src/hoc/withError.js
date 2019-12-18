import React, { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import formatError from "../utilities/formatError";

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
          {props.error ? formatError(props.error.response.data.error.message) : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withError;
