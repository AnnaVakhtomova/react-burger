import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import {
  ConstructorPage,
  ForgotPasswordPage,
  IngredientPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from "../../pages";
import AppHeader from "../app-header/app-header";
import ProfileContainer from "../profile-container/profile-container";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import { AuthorizedProtectedRouteElement } from "../authorized-protected-route/authorized-protected-route";
import { useDispatch } from "react-redux";
import { checkAuth } from "../../services/actions/auth";
import { useEffect } from "react";
import { AppDispatch } from "../../services/actions/types";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <RoutesList />
      </BrowserRouter>
    </>
  );
};

const RoutesList = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route
        path='/login'
        element={<AuthorizedProtectedRouteElement element={<LoginPage />} />}
      />
      <Route
        path='/register'
        element={<AuthorizedProtectedRouteElement element={<RegisterPage />} />}
      />
      <Route
        path='/forgot-password'
        element={
          <AuthorizedProtectedRouteElement element={<ForgotPasswordPage />} />
        }
      />
      <Route
        path='/reset-password'
        element={
          <AuthorizedProtectedRouteElement element={<ResetPasswordPage />} />
        }
      />
      <Route
        path='/profile'
        element={<ProtectedRouteElement element={<ProfileContainer />} />}
      >
        <Route path='' element={<ProfilePage />} />
        <Route path='orders' element={<div>История заказов</div>} />
        <Route path='orders/:id' element={<div>Информация о заказе</div>} />
      </Route>
      <Route
        path='/ingredients/:id'
        element={
          location.state && location.state.modal ? (
            <ConstructorPage />
          ) : (
            <IngredientPage />
          )
        }
      />
      <Route path='*' element={<ConstructorPage />} />
    </Routes>
  );
};

export default App;
