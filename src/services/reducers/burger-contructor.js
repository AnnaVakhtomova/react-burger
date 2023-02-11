import {
  ADD_INGREDIENT,
  ADD_BUN,
  COUNTERS_INCREMENT,
  COUNTERS_DECREMENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  RESET_CONSTRUCTOR,
} from "../actions/burger-contructor";

const initialState = {
  bun: null,
  elements: [],
  counters: {},
};

export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return { ...state, bun: action.bun };
    case ADD_INGREDIENT:
      return {
        ...state,
        elements: [...state.elements, action.ingredient],
      };
    case DELETE_INGREDIENT:
      const elements = [...state.elements];
      elements.splice(action.index, 1);
      return {
        ...state,
        elements: elements,
      };
    case MOVE_INGREDIENT:
      const newElements = [...state.elements];
      const element = newElements.at(action.fromIndex);
      newElements.splice(action.fromIndex, 1);
      newElements.splice(action.toIndex, 0, element);
      return { ...state, elements: newElements };
    case COUNTERS_INCREMENT:
      return {
        ...state,
        counters: {
          ...state.counters,
          [action.id]: state.counters[action.id]
            ? state.counters[action.id] + 1
            : 1,
        },
      };
    case COUNTERS_DECREMENT:
      return {
        ...state,
        counters: {
          ...state.counters,
          [action.id]: state.counters[action.id]
            ? state.counters[action.id] === 1
              ? 0
              : state.counters[action.id] - 1
            : 0,
        },
      };
    case RESET_CONSTRUCTOR:
      return initialState;
    default:
      return state;
  }
};
