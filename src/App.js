import React, { useEffect, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Logout from "./container/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/actionIndex";

const Checkout = React.lazy(()=>{
  return import("./container/Checkout/Checkout");
})
const Orders = React.lazy(()=>{
  return import("./container/Orders/Orders");
})
const Auth = React.lazy(()=>{
  return import("./container/Auth/Auth");
})


const App = props => {
  
  const {onTryAutoSignUp} = props

useEffect(()=>{
 onTryAutoSignUp()
},[onTryAutoSignUp])

 
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" render={(props)=> <Auth {...props}/>} />

        <Redirect to="/" />
      </Switch>
    );

    if (props.isAunthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" render={(props)=> <Checkout {...props} />} />
          <Route path="/auth" render={(props)=> <Auth {...props}/>} />
          <Route path="/orders" render={(props)=> <Orders {...props}/>} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout><Suspense fallback={<p>Loading...</p>}>{routes}</Suspense></Layout>
      </div>
    );
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
