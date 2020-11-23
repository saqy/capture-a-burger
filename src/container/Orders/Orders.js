import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/actionIndex";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSomething from "../../components/UI/orderSomething"

class Orders extends Component {
  componentDidMount() {
    console.log(this.props.userId);
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
  
    return <div>{orders.length> 0 ? orders : <OrderSomething />}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
