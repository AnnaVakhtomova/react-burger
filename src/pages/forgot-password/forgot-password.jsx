import { useEffect, useState } from "react";
import styles from "./forgot-password.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const navigate = useNavigate();

  const onClick = () => {
    forgotPassword(email)
      .then((res) => {
        if (res && res.success) {
          setError(false);
          navigate("/reset-password", { replace: true, state: { email } });
        } else {
          setError(true);
        }
      })
      .catch((err) => setError(true));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Восстановление пароля</h2>
      <EmailInput
        onChange={onChangeEmail}
        value={email}
        placeholder='Укажите e-mail'
        name={"email"}
        isIcon={false}
        extraClass='mt-6'
      />
      <Button
        htmlType='button'
        type='primary'
        size='medium'
        extraClass='mt-6'
        onClick={onClick}
      >
        Восстановить
      </Button>
      <p className={styles.text + " text text_type_main-default mt-20"}>
        Вспомнили пароль?
        <Link className={styles.link + " ml-2"} to={"/login"}>
          Войти
        </Link>
      </p>
    </div>
  );
};
