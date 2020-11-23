import React from "react";
import Aux from "../AuxHoc/AuxHoc";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/httpErrorHandler"

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    
    const [error, errorConfirmedHandler] = useHttpErrorHandler(axios)
    
      return (
        <Aux>
          <Modal
            modalClosed={errorConfirmedHandler}
            show={error}
          >
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...props} />
        </Aux>
      ); 
    }
  };


export default withErrorHandler;
