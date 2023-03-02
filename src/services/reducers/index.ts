import { combineReducers } from "redux";
import { ingredients } from "./ingredients";
import { burgerConstructor } from "./burger-contructor";
import { order } from "./order";
import { currentIngredient } from "./current-ingredient";
import { auth } from "./auth";

export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  order,
  currentIngredient,
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;
