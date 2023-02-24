import * as Api from "../../api";
import { RESET_CONSTRUCTOR } from "./burger-contructor";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const RESET_ORDER = "RESET_ORDER";

export function createOrder() {
  return function (dispatch, getState) {
    const state = getState();

    const bun = state.burgerConstructor.bun;
    const elements = state.burgerConstructor.elements;
    const ingredients = [bun._id, ...elements.map((el) => el._id), bun._id];

    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    Api.createOrder(ingredients)
      .then((res) => {
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
          dispatch({
            type: CREATE_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: CREATE_ORDER_FAILED,
        });
      });
  };
}
