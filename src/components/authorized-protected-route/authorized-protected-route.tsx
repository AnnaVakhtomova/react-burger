import { Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { FC, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/reducers/index";

interface IProps {
  element: ReactNode;
}

export const AuthorizedProtectedRouteElement: FC<IProps> = ({ element }) => {
  const { authInit, isAuth } = useSelector((store: RootState) => store.auth);
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
    <>{element}</>
  );
};
