import React, { Component } from 'react'
import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Forms/Input/Input"

 class ContactData extends Component {
        constructor(){
            super()
            this.state={
                orderForm: {
                name:{
                    elementType : "input",
                    elementConfig: {
                        type:"text",
                        placeholder:"Your Name"
                    },
                    value:""
                },
                street:{
                    elementType : "input",
                    elementConfig: {
                        type:"text",
                        placeholder:"Street"
                    },
                    value:""
                },
                zipCode:{
                    elementType : "input",
                    elementConfig: {
                        type:"text",
                        placeholder:"Zip Code"
                    },
                    value:""
                },
                country:{
                    elementType : "input",
                    elementConfig: {
                        type:"text",
                        placeholder:"Country"
                    },
                    value:""
                },
               
                email:{
                    elementType : "input",
                    elementConfig: {
                        type:"email",
                        placeholder:"Email"
                    },
                    value:""
                },
                deliveryMethod:{
                    elementType : "select",
                    elementConfig: {
                       options:[
                           {value:"fastest", displayValue:"Fastest"},
                           {value:"cheapest", displayValue:"Cheapest"},
                        ]
                    },
                    value:""
                }
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

        const formsElementsArray = []
        for (let key in this.state.orderForm){
            formsElementsArray.push({
                id:key,
                config:this.state.orderForm[key],
            })
        }

        let form = ( <form>
            {/* <Input elementType={} elementConfig={} value={}/> */}
           {formsElementsArray.map(elem=>(
               <Input 
               key={elem.id}
               elementType={elem.config.elementType}
               elementConfig={elem.config.elementConfig}
               value={elem.config.value}
               />

           ))}
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
