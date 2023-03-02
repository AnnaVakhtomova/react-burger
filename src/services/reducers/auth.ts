import { AnyAction } from "redux";
import {
  SAVE_USER,
  UPDATE_TOKEN,
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_REQUEST_ERROR,
  REGISTER_REQUEST_SUCCESS,
  LOGOUT,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_REQUEST_ERROR,
  GET_USER_INFO_REQUEST_SUCCESS,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_REQUEST_ERROR,
  UPDATE_USER_INFO_REQUEST_SUCCESS,
  AUTH_INIT_SUCCESS,
  AUTH_INIT_FAIL,
} from "../actions/auth";

const initialState = {
  user: null,
  accessToken: null,

  loginRequest: false,
  loginRequestError: false,

  registerRequest: false,
  registerRequestError: false,

  getUserRequest: false,
  getUserRequestError: false,

  updateUserRequest: false,
  updateUserRequestError: false,

  authInit: false,
  isAuth: false,
};

export const auth = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case AUTH_INIT_SUCCESS:
      return {
        ...state,
        authInit: true,
        accessToken: action.accessToken,
        isAuth: true,
      };
    case AUTH_INIT_FAIL:
      return { ...state, authInit: true, isAuth: false };
    case REGISTER_REQUEST:
      return { ...state, registerRequest: true, registerRequestError: false };
    case REGISTER_REQUEST_ERROR:
      return { ...state, registerRequest: false, registerRequestError: true };
    case REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        registerRequest: false,
        registerRequestError: false,
        user: action.user,
        accessToken: action.accessToken,
        isAuth: true,
      };
    case LOGIN_REQUEST:
      return { ...state, loginRequest: true, loginRequestError: false };
    case LOGIN_REQUEST_ERROR:
      return { ...state, loginRequest: false, loginRequestError: true };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loginRequest: false,
        loginRequestError: false,
        user: action.user,
        accessToken: action.accessToken,
        isAuth: true,
      };

    case LOGOUT:
      return { ...state, user: null, accessToken: null, isAuth: false };
    case SAVE_USER:
      return { ...state, user: action.user, accessToken: action.accessToken };

    case GET_USER_INFO_REQUEST:
      return { ...state, getUserRequest: true, getUserRequestError: false };
    case GET_USER_INFO_REQUEST_ERROR:
      return { ...state, getUserRequest: false, getUserRequestError: true };
    case GET_USER_INFO_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.user,
        getUserRequest: false,
        getUserRequestError: false,
      };
    case UPDATE_USER_INFO_REQUEST:
      return {
        ...state,
        updateUserRequest: true,
        updateUserRequestError: false,
      };
    case UPDATE_USER_INFO_REQUEST_ERROR:
      return {
        ...state,
        updateUserRequest: false,
        updateUserRequestError: true,
      };
    case UPDATE_USER_INFO_REQUEST_SUCCESS:
      return {
        ...state,
        updateUserRequest: false,
        updateUserRequestError: false,
        user: action.user,
      };

    case UPDATE_TOKEN:
      return { ...state, accessToken: action.accessToken };

    default:
      return state;
  }
};
