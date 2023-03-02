import { Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

export function ProtectedRouteElement({ element }) {
  const { authInit, isAuth } = useSelector((store) => store.auth);
  const location = useLocation();
  if (!authInit) {
    return null;
  }

  return isAuth ? (
    element
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  );
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};
