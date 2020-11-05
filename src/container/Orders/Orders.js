import React, { Component } from 'react'
import axios from "../../axios-orders"
import Order from "../../components/Order/Order"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import * as actions from "../../store/actions/actionIndex"
import {connect} from "react-redux"
import Spinner from "../../components/UI/Spinner/Spinner"


class Orders extends Component {

    componentDidMount(){
        console.log(this.props.token)
        this.props.onFetchOrders(this.props.token)
    }

    render() {
        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.orders.map(order=>(
                <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
                />
            ))
        }
        return (
            <div>
               {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
   
    return{
        orders:state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token:state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token)=> dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))
