import React from 'react'

const orderSomething = () => {
    const style = {
        textAlign: "center",
        color:"red",
        fontWeight: "bold",

    }
    return (
        <div style={style}>
            <h3>No Active Orders</h3>
            <p>Please go to burder builder and order a burger.</p>
            
        </div>
    )
}

export default orderSomething
