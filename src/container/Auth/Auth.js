import React, { useState, useEffect} from "react";
import Input from "../../components/UI/Forms/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/actionIndex";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

const Auth = props =>  {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  })

  const [isSignUp, setIsSignUp] = useState(true)

  const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props 
  useEffect(()=>{
    if (!buildingBurger && authRedirectPath !== "/") {
        onSetAuthRedirectPath();
    }
  },[buildingBurger, authRedirectPath, onSetAuthRedirectPath])

 const checkValidity = (value, rule) => {
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
    if (rule.isNumeric) {
    }

    return isValid;
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      },
    };

    setControls(updatedControls)
  };

 const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignUp
    );
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp)
  };

  
    const formsElementsArray = [];
    for (let key in controls) {
      formsElementsArray.push({
        id: key,
        config: controls[key],
      });
    }

    let form = formsElementsArray.map((elem) => (
      <Input
        key={elem.id}
        elementType={elem.config.elementType}
        elementConfig={elem.config.elementConfig}
        value={elem.config.value}
        invalid={!elem.config.valid}
        shouldValidate={elem.config.validation}
        touched={elem.config.touched}
        changed={(event) => inputChangedHandler(event, elem.id)}
      />
    ));

    if (props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
      errorMessage = <p>{props.error.message}</p>;
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
      authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">Submit </Button>
        </form>
        <Button clicked={switchAuthModeHandler} btnType="Danger">
          Switch To {isSignUp ? "SignIn" : "SignUp"}
        </Button>
      </div>
    );
  }


const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
