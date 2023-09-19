import styles from "./Foter.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`additionalСontainer ${styles.footer__wrap}`}>
      {/* <div className={styles.footer__backgroundGradient}></div> */}
          <p>Designed by Dexola - {new Date().getFullYear()}</p>
          <p>© All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
