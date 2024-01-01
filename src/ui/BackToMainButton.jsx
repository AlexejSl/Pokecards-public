import { NavLink } from "react-router-dom";
import styles from "../pages/PageNotFound.module.scss";

function BackToMainButton() {
  return (
    <NavLink to="/main" className={styles.btnBack}>
      Go to the main page
    </NavLink>
  );
}

export default BackToMainButton;
