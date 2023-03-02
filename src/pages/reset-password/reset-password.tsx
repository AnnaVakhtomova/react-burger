import { useEffect, useState } from "react";
import styles from "./reset-password.module.css";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../api";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!(location.state && location.state.email)) {
      navigate("/forgot-password", { replace: true });
    }
  }, [location]);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const onClick = () => {
    setLoading(true);
    setError(false);

    resetPassword(password, code)
      .then((res) => {
        setLoading(false);
        if (res && res.success) {
          navigate("/login");
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Восстановление пароля</h2>
      <PasswordInput
        onChange={onChangePassword}
        value={password}
        placeholder='Введите новый пароль'
        name={"password"}
        extraClass='mt-6'
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onChangeCode}
        value={code}
        name={"code"}
        extraClass='mt-6'
      />
      <Button
        htmlType='button'
        type='primary'
        size='medium'
        extraClass='mt-6'
        onClick={onClick}
      >
        Сохранить
      </Button>
      <p className={styles.text + " text text_type_main-default mt-20"}>
        Вспомнили пароль?
        <Link to={"/login"} className={styles.link + " ml-2"}>
          Войти
        </Link>
      </p>
    </div>
  );
};
