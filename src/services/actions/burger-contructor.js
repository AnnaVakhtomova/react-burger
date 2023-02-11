import { v4 as uuidv4 } from "uuid";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const COUNTERS_INCREMENT = "COUNTERS_INCREMENT";
export const COUNTERS_DECREMENT = "COUNTERS_DECREMENT";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";

export function addIngredient(id) {
  return function (dispatch, getState) {
    const state = getState();
    const ingredient = state.ingredients.ingredients.find((x) => x._id === id);

    if (ingredient.type === "bun") {
      dispatch({ type: ADD_BUN, bun: ingredient });
      if (state.burgerConstructor.bun != null) {
        dispatch({
          type: COUNTERS_DECREMENT,
          id: state.burgerConstructor.bun._id,
        });
      }
    } else {
      const uuid = uuidv4();
      dispatch({ type: ADD_INGREDIENT, ingredient: { ...ingredient, uuid } });
    }

    dispatch({ type: COUNTERS_INCREMENT, id: ingredient._id });
  };
}

export function deleteIngredient(index) {
  return function (dispatch, getState) {
    const state = getState();

    const element = state.burgerConstructor.elements[index];
    dispatch({ type: COUNTERS_DECREMENT, id: element._id });
    dispatch({ type: DELETE_INGREDIENT, index: index });
  };
}

export function moveIngredient(fromIndex, toIndex) {
  return function (dispatch) {
    dispatch({ type: MOVE_INGREDIENT, fromIndex, toIndex });
  };
}
