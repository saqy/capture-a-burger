import React, { Component } from 'react'
import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"


 class ContactData extends Component {
        constructor(){
            super()
            this.state={
                name:"",
                email:"",
                address:{
                    street:"",
                    postalCode:""
                },
                loading:false
            }
        }

        orderHandler = (event) => {
            event.preventDefault()
              this.setState({loading:true})
            const order = {
                ingredients:this.props.ingredients,
                price:this.props.price,
                customer:{
                    name:"Ishaq",
                    address:{
                        street:"Test street",
                        zipCode:"12345",
                        country:"pakistan"
                    },
                    email:"123@gmail.com"
                },
                deliveryMethod:"fastest"
            }

        axios.post("/orders.json",order)
        .then(response=>{
               this.setState({loading:false})
               this.props.history.push("/")
           })
        .catch(error=>{
                this.setState({loading:false})
           })
        }


    render() {
        let form = ( <form>
            <input type="text" name="name" placeholder="Your Name" />
            <input type="email" name="email" placeholder="Your Email" />
            <input type="text" name="street" placeholder="Street" />
            <input type="text" name="postal" placeholder="Postal Code" />
            <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
        </form>);
        if(this.state.loading){
             form = <Spinner />
        }
        return (
            <div className = {classes.ContactData}>
                <h4>Enter Contact Data Please !</h4>
                {form}
            </div>
        )
    }
}

export default ContactData
