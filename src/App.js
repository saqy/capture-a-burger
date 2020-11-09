import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/Checkout";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Orders from "./container/Orders/Orders";
import Auth from "./container/Auth/Auth";
import Logout from "./container/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/actionIndex";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />

        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAunthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAunthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
