import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux';
import burgerBuilderReducer from "./store/reducers/burgerBuilderReducer"
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk'
import submitOrderReducer from "./store/reducers/submitOrderReducer"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  burgerBuilder:burgerBuilderReducer,
  orderReducer:submitOrderReducer
})

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)) )




const app = ( 
  <Provider store={store}>
  <BrowserRouter> <App /></BrowserRouter>
  </Provider>
)



ReactDOM.render(
  app,
  document.getElementById('root')
);


serviceWorker.unregister();
