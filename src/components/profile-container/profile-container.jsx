import styles from "./profile-container.module.css";
import { useEffect, useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { logout } from "../../services/actions/auth";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const logoutHandle = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.leftBlock}>
        <NavLink
          end
          to={"/profile"}
          className={({ isActive }) =>
            "text text_type_main-medium " +
            styles.menu +
            " " +
            (isActive ? styles.menu_active : "")
          }
        >
          Профиль
        </NavLink>
        <NavLink
          end
          to={"/profile/orders"}
          className={({ isActive }) =>
            "text text_type_main-medium " +
            styles.menu +
            " " +
            (isActive ? styles.menu_active : "")
          }
        >
          История заказов
        </NavLink>
        <Link
          className={"text text_type_main-medium " + styles.menu}
          onClick={logoutHandle}
        >
          Выход
        </Link>
        <p className={"text text_type_main-default mt-20 " + styles.text}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={styles.rightBlock}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileContainer;
