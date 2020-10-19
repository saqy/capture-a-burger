import React ,{Component} from "react"
import Aux from "../../hoc/AuxHoc/AuxHoc"
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"


const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    bacon:0.7,
    meat:1.4
}

class BurgerBuilder extends Component {
    constructor(){
        super()
        this.state= {
           ingredients:null,
           totalPrice: 4,
           purchasable:false,
           purchasing:false,
           loading:false,
           error: null
        }
       
    }

    componentDidMount(){
        axios.get('https://ishaq-burger-app.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data})
        }).catch(error=>{
            this.setState({error:true})
        })
    }

    purchaseHandler = () =>{
        this.setState({
            purchasing:true
        })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey=> ingredients[igKey])
        .reduce((sum,el)=> sum + el ,0)
        this.setState({purchasable:sum > 0})
    }

   addIngredientHandler = type => {
         const oldCount = this.state.ingredients[type]
         const updatedCount = oldCount +1;
         const updatedIngredients = {
             ...this.state.ingredients
         }
         updatedIngredients[type] = updatedCount;
         const priceAddition = INGREDIENT_PRICES[type];
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice + priceAddition;
         this.setState({ 
             totalPrice:newPrice,
             ingredients:updatedIngredients
         })
         this.updatePurchaseState(updatedIngredients);
   }

   removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]
    if(oldCount <= 0 ){
        return;
    }
         const updatedCount = oldCount - 1;
         const updatedIngredients = {
             ...this.state.ingredients
         }
         updatedIngredients[type] = updatedCount;
         const priceAddition = INGREDIENT_PRICES[type];
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice - priceAddition;
         this.setState({
             totalPrice:newPrice,
             ingredients:updatedIngredients
         })
         this.updatePurchaseState(updatedIngredients);
  }

        closeBackdropHandler = () => {
            this.setState({
                purchasing:false
            })            
        }

        purchaseContinueHandler = () => {
            this.setState({loading:true})
            const order = {
                ingredients:this.state.ingredients,
                price:this.state.totalPrice,
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
               this.setState({loading:false,purchasing:false})
           })
        .catch(error=>{
                this.setState({loading:false,purchasing:false})
           })
         }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        }

        let orderSummary = null;
        let burger = this.state.error ? <h3>Data cannot be laoded from server</h3> : <Spinner />

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger  ingredients = {this.state.ingredients}/>
                    <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} 
                    purchasable = {this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                    />
                </Aux>
                )
            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients} 
                purchaseCancelled={this.closeBackdropHandler}
                purchaseContinued={this.purchaseContinueHandler} />
                
            }

            if(this.state.loading){
                orderSummary = <Spinner />
            }
             
        for(let key in disabledInfo){

            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.closeBackdropHandler}>
                  {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default WithErrorHandler(BurgerBuilder,axios)