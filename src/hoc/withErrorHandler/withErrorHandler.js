import React from "react";
import Aux from "../AuxHoc/AuxHoc";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        error: null,
      };
    }
    componentWillMount() {
      this.requestInterceptors = axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });
      this.responseInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptors);
      axios.interceptors.response.eject(this.responseInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
