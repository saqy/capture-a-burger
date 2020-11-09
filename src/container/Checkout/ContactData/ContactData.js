import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Forms/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../../store/actions/actionIndex";

class ContactData extends Component {

  constructor() {
    super();
    this.state = {
      orderForm: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your Name",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        street: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Street",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        zipCode: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Zip Code",
          },
          value: "",
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5,
          },
          valid: false,
          touched: false,
        },
        country: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Country",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },

        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Email",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        deliveryMethod: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "fastest", displayValue: "Fastest" },
              { value: "cheapest", displayValue: "Cheapest" },
            ],
          },
          value: "fastest",
          validation: {
            required: true,
          },
          valid: true,
        },
      },

      formIsValid: false,
    };
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElemIdentifier in this.state.orderForm) {
      formData[formElemIdentifier] = this.state.orderForm[
        formElemIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  checkValidity = (value, rule) => {
    let isValid = true;

    if (!rule) return true;

    if (rule.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rule.minLength) {
      isValid = value.length >= rule.minLength && isValid;
    }
    if (rule.maxLength) {
      isValid = value.length <= rule.maxLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidVar = true;
    for (let input in updatedOrderForm) {
      formIsValidVar = updatedOrderForm[input].valid && formIsValidVar;
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValidVar,
    });
  };

  render() {
    const formsElementsArray = [];
    for (let key in this.state.orderForm) {
      formsElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formsElementsArray.map((elem) => (
          <Input
            key={elem.id}
            elementType={elem.config.elementType}
            elementConfig={elem.config.elementConfig}
            value={elem.config.value}
            invalid={!elem.config.valid}
            shouldValidate={elem.config.validation}
            touched={elem.config.touched}
            changed={(event) => this.inputChangedHandler(event, elem.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Contact Data Please !</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orderReducer.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actionTypes.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
