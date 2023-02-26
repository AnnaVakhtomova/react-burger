import { useEffect, useState, useRef } from "react";
import styles from "./profile.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateUserInfo } from "../../services/actions/auth";
import Loader, { LoaderOverlay } from "../../components/loader/loader";

export const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const { user, getUserRequest, getUserRequestError } = useSelector(
    (store) => store.auth
  );

  if (!user) return null;

  return getUserRequest ? (
    <Loader size={"200px"} />
  ) : getUserRequestError ? (
    <div>ERROR</div>
  ) : (
    <ProfileForm />
  );
};

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user, updateUserRequest, updateUserRequestError } = useSelector(
    (store) => store.auth
  );

  const [nameInputDisabled, setNameInputDisabled] = useState(true);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [name, setName] = useState(user.name);

  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setpasswordChanged] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);

  const onChangeName = (e) => {
    setName(e.target.value);
    if (!nameChanged) {
      setNameChanged(true);
    }
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (!emailChanged) {
      setEmailChanged(true);
    }
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (!passwordChanged) {
      setpasswordChanged(true);
    }
  };

  const inputRef = useRef(null);

  const onIconClick = () => {
    setNameInputDisabled(false);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const onBlur = () => {
    setNameInputDisabled(true);
  };

  const cancelHandle = () => {
    setEmail(user.email);
    setName(user.name);
    setPassword("");

    setEmailChanged(false);
    setNameChanged(false);
    setpasswordChanged(false);
  };

  const updateInfoHandle = (event) => {
    event.preventDefault();
    if (emailChanged || passwordChanged || nameChanged) {
      const form = Object.assign(
        {},
        emailChanged ? { email } : null,
        passwordChanged ? { password } : null,
        nameChanged ? { name } : null
      );

      dispatch(updateUserInfo(form));
    }
  };
  return (
    <>
      {updateUserRequest && <LoaderOverlay size={"200px"} />}
      <form onSubmit={updateInfoHandle}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChangeName}
          value={name}
          disabled={nameInputDisabled}
          icon='EditIcon'
          name={"name"}
          ref={inputRef}
          onIconClick={onIconClick}
          onBlur={onBlur}
        />
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          isIcon={true}
          extraClass='mt-6'
        />
        <PasswordInput
          onChange={onChangePassword}
          value={password}
          name={"password"}
          icon='EditIcon'
          extraClass='mt-6'
        />
        {(emailChanged || passwordChanged || nameChanged) && (
          <div className={styles.buttons + " mt-6"}>
            <Button
              htmlType='button'
              type='secondary'
              size='medium'
              onClick={cancelHandle}
            >
              Отмена
            </Button>
            <Button
              htmlType='submit'
              type='primary'
              size='medium'
              // onClick={updateInfoHandle}
            >
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </>
  );
};
