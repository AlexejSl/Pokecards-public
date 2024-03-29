import { NavLink } from "react-router-dom";
import { useLogout } from "../../api/ApiHooks";
import { PiCardsBold } from "react-icons/pi";
import { MdManageAccounts } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import styles from "./Menu.module.scss";

function Menu({ windowWidth, isAuthenticated }) {
  const { logout } = useLogout();

  if (!isAuthenticated) {
    return (
      <NavLink to="login" className={styles.logIn}>
        Log in
      </NavLink>
    );
  }

  return (
    <ul className={styles.nav}>
      <li className={styles.nav__item}>
        <NavLink to="my-cards" className={styles.nav__item_txt}>
          {windowWidth < 750 ? (
            <PiCardsBold className={styles.nav__item_icon} />
          ) : (
            "My cards"
          )}
        </NavLink>
      </li>
      <li className={styles.nav__item}>
        <NavLink to="user" className={styles.nav__item_txt}>
          {windowWidth < 750 ? (
            <MdManageAccounts className={styles.nav__item_icon} />
          ) : (
            "My account"
          )}
        </NavLink>
      </li>
      <li>
        <button className={styles.nav__item_log} onClick={logout} to="/login">
          {windowWidth < 750 ? (
            <TbLogout
              className={`${styles.nav__item_icon} ${styles.color_white}`}
            />
          ) : (
            "Log out"
          )}
        </button>
      </li>
    </ul>
  );
}

export default Menu;
