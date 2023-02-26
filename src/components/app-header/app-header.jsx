import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav + " mt-4 mb-4"}>
        <ul className={styles.navlist}>
          <li className={styles.navlistitem}>
            <ul className={styles.navlist}>
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    styles.linkbox +
                    " pl-5 pr-5 " +
                    (isActive ? styles.linkbox_active : "")
                  }
                >
                  <BurgerIcon type='primary' />
                  <span>Конструктор</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/feed"}
                  className={({ isActive }) =>
                    styles.linkbox +
                    " pl-5 pr-5 " +
                    (isActive ? styles.linkbox_active : "")
                  }
                >
                  <ListIcon type='secondary' />
                  <span>Лента заказов</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className={styles.logo}>
            <Logo />
          </li>

          <li className={styles.navlistitem}>
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                styles.linkbox +
                " pl-5 pr-5 " +
                (isActive ? styles.linkbox_active : "")
              }
            >
              <ProfileIcon type='secondary' />
              <span>Личный кабинет</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
