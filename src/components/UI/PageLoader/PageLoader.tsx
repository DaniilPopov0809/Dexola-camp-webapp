import styles from "./PageLoader.module.scss";
import { RotatingLines } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <RotatingLines
        strokeColor="#204ffe"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default PageLoader;
