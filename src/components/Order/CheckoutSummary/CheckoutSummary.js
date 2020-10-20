import React from 'react'
import Burger from '../../Burger/Burger'
import Button from "../../UI/Button/Button"
import classes from "./CheckoutSummary.module.css"


const CheckoutSummary = (props) => {
    console.log("props.ingredients in checkoutsummary",props.ingredients)
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width:"100%", margin:"auto", textAlign:"center" }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
            
            
        </div>
    )
}

export default CheckoutSummary
