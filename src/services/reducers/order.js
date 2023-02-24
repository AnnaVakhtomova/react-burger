import {
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  RESET_ORDER,
} from "../actions/order";

const initialState = {
  name: null,
  order: null,
  orderCreateRequest: false,
  orderCreateFailed: false,
};

//
// {
//   "name": "Краторный метеоритный бургер",
//   "order": {
//       "number": 6257
//   },
//   "success": true
// }

export const order = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        orderCreateFailed: false,
        orderCreateRequest: true,
      };
    case CREATE_ORDER_FAILED:
      return {
        ...state,
        orderCreateFailed: true,
        orderCreateRequest: false,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        name: action.name,
        order: action.order,
        orderCreateFailed: false,
        orderCreateRequest: false,
      };
    case RESET_ORDER:
      return initialState;
    default:
      return state;
  }
};
