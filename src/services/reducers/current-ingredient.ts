import { AnyAction } from "redux";
import {
  RESET_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
} from "../actions/current-ingredient";

const initialState = {
  ingredient: null,
};

export const currentIngredient = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return { ingredient: action.ingredient };
    case RESET_CURRENT_INGREDIENT:
      return initialState;
    default:
      return state;
  }
};
