import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.4,
};

const addIngredient = (state, action) => {
  const updatedIngredByAdd = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredientsByAdd = updateObject(
    state.ingredients,
    updatedIngredByAdd
  );
  const updateStateByAdd = {
    ingredients: updatedIngredientsByAdd,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updateStateByAdd);
};
const removeIngredient = (state, action) => {
  const updatedIngredByRemove = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredientsByRemove = updateObject(
    state.ingredients,
    updatedIngredByRemove
  );
  const updateStateByRemove = {
    ingredients: updatedIngredientsByRemove,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updateStateByRemove);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingred.salad,
      bacon: action.ingred.bacon,
      cheese: action.ingred.cheese,
      meat: action.ingred.meat,
    },
    totalPrice: 4,
    error: false,
    building: false,
  });
};

const fetchIngredientFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return fetchIngredientFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
