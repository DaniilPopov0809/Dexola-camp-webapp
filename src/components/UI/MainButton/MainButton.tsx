import  { ReactNode, ButtonHTMLAttributes  } from "react";
import styles from "./MainButton.module.scss";

interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  globalClassName: string;
  localClassName?: string;
  additionalClassName?: string;
}

const MainButton = ({
  children,                      //text in button
  onClick, 
  globalClassName,            //the global class is styles/common
  localClassName="",             //class is MainButton.module.scss
  additionalClassName = "",   //class is MainButton.module.scss
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${globalClassName} ${styles[localClassName]}`}
      onClick={onClick}
      {...props}
    >
      <span className={styles[additionalClassName]}>{children}</span>
    </button>
  );
};

export default MainButton;
