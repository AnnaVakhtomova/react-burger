import * as Api from "../../api";

export const SAVE_USER = "SAVE_USER";
export const UPDATE_TOKEN = "UPDATE_TOKEN";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST_ERROR = "LOGIN_REQUEST_ERROR";
export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_REQUEST_ERROR = "REGISTER_REQUEST_ERROR";
export const REGISTER_REQUEST_SUCCESS = "REGISTER_REQUEST_SUCCESS";

export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_REQUEST_ERROR = "GET_USER_INFO_REQUEST_ERROR";
export const GET_USER_INFO_REQUEST_SUCCESS = "GET_USER_INFO_REQUEST_SUCCESS";

export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO_REQUEST";
export const UPDATE_USER_INFO_REQUEST_ERROR = "UPDATE_USER_INFO_REQUEST_ERROR";
export const UPDATE_USER_INFO_REQUEST_SUCCESS =
  "UPDATE_USER_INFO_REQUEST_SUCCESS";

export const LOGOUT = "LOGOUT";
export const AUTH_INIT_SUCCESS = "AUTH_INIT_SUCCESS";
export const AUTH_INIT_FAIL = "AUTH_INIT_FAIL";

export function register(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    Api.register(email, password, name)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_REQUEST_SUCCESS,
            user: res.user,
            accessToken: getTokenFromResponse(res.accessToken),
          });

          localStorage.setItem("refreshToken", res.refreshToken);
        } else {
          dispatch({
            type: REGISTER_REQUEST_ERROR,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_REQUEST_ERROR,
        });
      });
  };
}

export function login(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    Api.login(email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_REQUEST_SUCCESS,
            user: res.user,
            accessToken: getTokenFromResponse(res.accessToken),
          });

          localStorage.setItem("refreshToken", res.refreshToken);
        } else {
          dispatch({
            type: LOGIN_REQUEST_ERROR,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_REQUEST_ERROR,
        });
      });
  };
}

function getTokenFromResponse(accessToken) {
  return accessToken.split("Bearer ")[1];
}

export function logout() {
  return function (dispatch) {
    const token = localStorage.getItem("refreshToken");

    Api.logout(token)
      .then((res) => {})
      .catch((err) => {});

    localStorage.removeItem("refreshToken");
    dispatch({
      type: LOGOUT,
    });
  };
}

export function getUserInfo() {
  return async function (dispatch, getState) {
    dispatch({ type: GET_USER_INFO_REQUEST });
    const request = () => Api.getUserInfo(getState().auth.accessToken);

    try {
      const res = await withAccessToken(request, dispatch);
      if (res && res.success) {
        dispatch({
          type: GET_USER_INFO_REQUEST_SUCCESS,
          user: res.user,
        });
      } else {
        dispatch({ type: GET_USER_INFO_REQUEST_ERROR });
      }
    } catch (err) {
      dispatch({ type: GET_USER_INFO_REQUEST_ERROR });
    }
  };
}

export function updateUserInfo(form) {
  return async function (dispatch, getState) {
    dispatch({ type: UPDATE_USER_INFO_REQUEST });

    const request = () => Api.updateUserInfo(getState().auth.accessToken, form);

    try {
      const res = await withAccessToken(request, dispatch);
      if (res && res.success) {
        dispatch({
          type: UPDATE_USER_INFO_REQUEST_SUCCESS,
          user: res.user,
        });
      } else {
        dispatch({ type: UPDATE_USER_INFO_REQUEST_ERROR });
      }
    } catch (err) {
      dispatch({ type: UPDATE_USER_INFO_REQUEST_ERROR });
    }
  };
}

export const withAccessToken = async (request, dispatch) => {
  try {
    let res = await request();
    return Promise.resolve(res);
  } catch (err) {
    if (err && typeof err === "object" && err.status === 403) {
      try {
        await updateToken(dispatch);
        return await request();
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(err);
    }
  }
};

export function checkAuth() {
  return async function (dispatch) {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      dispatch({ type: AUTH_INIT_FAIL });
      return;
    }

    try {
      const res = await Api.token(token);

      const accessToken = getTokenFromResponse(res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      dispatch({ type: AUTH_INIT_SUCCESS, accessToken });
    } catch (err) {
      localStorage.removeItem("refreshToken");
      dispatch({ type: AUTH_INIT_FAIL });
    }
  };
}

async function updateToken(dispatch) {
  const token = localStorage.getItem("refreshToken");
  if (!token) {
    Promise.reject();
  }

  try {
    const res = await Api.token(token);

    const accessToken = getTokenFromResponse(res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);

    dispatch({ type: UPDATE_TOKEN, accessToken });

    Promise.resolve();
  } catch (err) {
    localStorage.removeItem("refreshToken");
    Promise.reject();
  }
}
