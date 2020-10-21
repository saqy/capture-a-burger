import React from 'react'
import classes from "./Input.module.css"


const Input = props => {

    let inputElement = null;

    switch(props.elementTypes){
        case("input"):
        inputElement = <input 
        className={classes.InputElement} 
         {...props.elementConfig} 
         value={props.value}/>;
        break;
        case("select"):
        inputElement = ( 
            <select 
            className={classes.InputElement} 
            value={props.value}>
                {props.elementConfig.options.map(option => (
                    <option value={option.value}> {option.displayValue} </option>
                ))}
                
            </select>
            );
        break;
        case("textarea"):
        inputElement = <textarea 
        className= {classes.InputElement} 
        {...props.elementConfig} 
        value={props.value}/>;
        break;
        
        default:
            inputElement = <input 
            className={classes.InputElement}
             {...props.elementConfig}
              value={props.value}/>;
    }
console.log(inputElement)
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input
