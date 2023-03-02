import { useState } from "react";
import styles from "./register.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/actions/auth";
import { useNavigate } from "react-router-dom";
import { LoaderOverlay } from "../../components/loader/loader";
import { RootState } from "../../services/reducers";
import { AppDispatch } from "../../services/actions/types";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { registerRequest, registerRequestError, user } = useSelector(
    (store: RootState) => store.auth
  );

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const registerHandle = () => {
    dispatch(register(email, password, name));
  };

  if (user) {
    navigate("/");
  }

  return (
    <div className={styles.container}>
      {registerRequest && <LoaderOverlay size={"200px"} />}
      <h2 className={styles.header}>Регистрация</h2>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChangeName}
        value={name}
        name={"name"}
        extraClass='mt-6'
      />
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
        onClick={registerHandle}
      >
        Зарегистрироваться
      </Button>
      <p className={styles.text + " text text_type_main-default mt-20"}>
        Уже зарегистрированы?
        <Link className={styles.link + " ml-2"} to={"/login"}>
          Войти
        </Link>
      </p>
    </div>
  );
};
