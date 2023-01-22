import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav + " mt-4 mb-4"}>
        <ul className={styles.navlist}>
          <li className={styles.navlistitem}>
            <ul className={styles.navlist}>
              <li>
                <a
                  href='/'
                  className={
                    styles.linkbox + " pl-5 pr-5 " + styles.linkbox_active
                  }
                >
                  <BurgerIcon type='primary' />
                  <span>Конструктор</span>
                </a>
              </li>

              <li>
                <a href='/feed' className={styles.linkbox + " pl-5 pr-5"}>
                  <ListIcon type='secondary' />
                  <span>Лента заказов</span>
                </a>
              </li>
            </ul>
          </li>

          <li className={styles.logo}>
            <Logo />
          </li>

          <li className={styles.navlistitem}>
            <a href='/profile' className={styles.linkbox + " pl-5 pr-5"}>
              <ProfileIcon type='secondary' />
              <span>Личный кабинет</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
