import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./authSaga";
import { initIngredientsSaga } from "./burgerBuilderSaga";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./orderSaga";
import * as actionTypes from "../actions/actionTypes";
import { takeEvery, all, takeLatest } from "redux-saga/effects";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ])
  
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrderBurger() {
  yield takeLatest(actionTypes.PURCHASE_BURGER_ORDER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
