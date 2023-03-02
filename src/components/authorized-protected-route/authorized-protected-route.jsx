import { Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

export function AuthorizedProtectedRouteElement({ element }) {
  const { authInit, isAuth } = useSelector((store) => store.auth);
  const { state } = useLocation();

  if (!authInit) {
    return null;
  }

  return isAuth ? (
    state && state.from ? (
      <Navigate to={state.from.pathname} replace />
    ) : (
      <Navigate to='/profile' replace />
    )
  ) : (
    element
  );
}

AuthorizedProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};
