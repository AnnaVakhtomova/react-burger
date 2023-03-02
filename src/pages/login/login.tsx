import { useEffect, useState, useCallback } from "react";
import styles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { login } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { LoaderOverlay } from "../../components/loader/loader";
import { RootState } from "../../services/reducers/index";
import { AppDispatch } from "../../services/actions/types";

export const LoginPage = () => {
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const { loginRequest, loginRequestError, user, isAuth } = useSelector(
    (store: RootState) => store.auth
  );

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandle = useCallback<() => void>(() => {
    dispatch(login(email, password));
  }, [dispatch, email, password]);

  if (isAuth) {
    if (state && state.from) {
      return <Navigate to={state.from.pathname} replace />;
    } else {
      return <Navigate to='/' replace />;
    }
  }

  return (
    <div className={styles.container}>
      {loginRequest && <LoaderOverlay size={"200px"} />}
      <h2 className={styles.header}>Вход</h2>
      <EmailInput
        onChange={onChangeEmail}
        value={email}
        name={"email"}
        isIcon={false}
        extraClass='mt-6'
      />
      <PasswordInput
        onChange={onChangePassword}
        value={password}
        name={"password"}
        extraClass='mt-6'
      />
      <Button
        htmlType='button'
        type='primary'
        size='medium'
        extraClass='mt-6'
        onClick={loginHandle}
      >
        Войти
      </Button>
      <p className={styles.text + " text text_type_main-default mt-20"}>
        Вы — новый пользователь?
        <Link to={"/register"} className={styles.link + " ml-2"}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={styles.text + " text text_type_main-default mt-4"}>
        Забыли пароль?
        <Link to={"/forgot-password"} className={styles.link + " ml-2"}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};
