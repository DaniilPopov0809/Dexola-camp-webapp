import { NavLink } from "react-router-dom";
import styles from "./NavigationMenu.module.scss";

const NavigationMenu = () => {
  return (
    <nav className={`container ${styles.navigation}`}>
      <ul className={styles.navigation__list}>
        <li>
          <NavLink className={`${styles.navigation__link}`} to="/">
            Stake
          </NavLink>
        </li>
        <li>
          <NavLink className={`${styles.navigation__link}`}  to="/withdraw">
            Withdraw
          </NavLink>
        </li>
        <li>
          <NavLink className={`${styles.navigation__link}`} to="/claim">
            Claim rewards
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
