import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import ProvideUserInfo from "../../api/ProvideUserInfo";
import SearchBar from "./SearchBar";
import Menu from "./Menu";
import Logo from "../../assets/Logo.svg";
import styles from "./Header.module.scss";

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        {windowWidth < 900 || (
          <img src={Logo} alt="Logo" className={styles.header__logo_image} />
        )}
        <NavLink className={styles.header__logo_name} to="main">
          Poke<span className={styles.red}>cards</span>
        </NavLink>
      </div>
      <SearchBar className={styles.header__search} windowWidth={windowWidth} />
      <ProvideUserInfo>
        <Menu windowWidth={windowWidth} />
      </ProvideUserInfo>
    </div>
  );
}

export default Header;
