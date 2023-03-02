import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../services/reducers/index";

export const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({
  element,
}) => {
  const { authInit, isAuth } = useSelector((store: RootState) => store.auth);
  const location = useLocation();
  if (!authInit) {
    return null;
  }

  return isAuth ? (
    <>{element}</>
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  );
};

interface IProtectedRouteElementProps {
  element: ReactNode;
}
