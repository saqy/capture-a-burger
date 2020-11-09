import * as actionTypes from "./actionTypes";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingred: ingredients,
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
  };
};
