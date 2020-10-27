
import * as actionTypes from "./actionTypes" 
import axios from "../../axios-orders"

export const purchaseBurgerSuccess = (id,orderedData) => {

    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderedData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        err: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
      dispatch(purchaseBurgerStart());
        axios.post("/orders.json",orderData)
        .then(response=>{
              dispatch(purchaseBurgerSuccess(response.data.name,orderData))
           })
        .catch(error=>{
              dispatch(purchaseBurgerFail(error))
           })
    }
}

export const purchaseInit = ()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}


export const fetchOrderSuccess = order => {
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        order:order
    }
}

export const fetchOrderFail = error => {
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        err:error
    }
}

export const fetchOrderStart = () => {
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}


export const fetchOrders = () => {
   return dispatch => {
       dispatch(fetchOrderStart())
    axios.get("/orders.json")
    .then(response=>{
        const fetchOrders = []
        console.log("fetchUser",response)
        for(let key in response.data){
            fetchOrders.push({
               ...response.data[key],
               id:key
            })
        }
        dispatch(fetchOrderSuccess(fetchOrders))
    })
    .catch(error=>{
        dispatch(fetchOrderFail(error))
    })
   }
}

