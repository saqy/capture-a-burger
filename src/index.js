import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import burgerBuilderReducer from "./store/reducers/burgerBuilderReducer";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import submitOrderReducer from "./store/reducers/submitOrderReducer";
import authReducer from "./store/reducers/authReducer";
import createSagaMiddleware from "redux-saga";
import {
  watchAuth,
  watchBurgerBuilder,
  watchOrderBurger,
} from "./store/sagas/sagaIndex";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  orderReducer: submitOrderReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrderBurger);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
