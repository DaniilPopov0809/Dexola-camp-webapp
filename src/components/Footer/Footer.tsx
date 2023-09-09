import styles from "./Foter.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__wrap}`}>
          <p>Designed by Dexola - {new Date().getFullYear()}</p>
          <p>© All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
