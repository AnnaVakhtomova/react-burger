import * as Api from "../../api";
import { withAccessToken } from "./auth";
import { RESET_CONSTRUCTOR } from "./burger-contructor";
import { AppThunk } from "./types";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const RESET_ORDER = "RESET_ORDER";

export function createOrder(): AppThunk<void> {
  return async function (dispatch, getState) {
    const state = getState();

    const bun = state.burgerConstructor.bun;
    const elements = state.burgerConstructor.elements;

    const ingredients = [...elements.map((el) => el._id)];
    if (bun) {
      ingredients.push(bun._id);
      ingredients.push(bun._id);
    }

    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const request = () =>
      Api.createOrder(ingredients, getState().auth.accessToken);

    try {
      const res = await withAccessToken(request, dispatch);
      if (res && res.success) {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          name: res.name,
          order: res.order,
        });
        dispatch({
          type: RESET_CONSTRUCTOR,
        });
      } else {
        dispatch({ type: CREATE_ORDER_FAILED });
      }
    } catch (err) {
      dispatch({
        type: CREATE_ORDER_FAILED,
      });
    }
  };
}
