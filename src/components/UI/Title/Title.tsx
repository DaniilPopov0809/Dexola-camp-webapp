import styles from "./Title.module.scss";
import { ReactNode } from "react";

type TitleTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TitleProps {
  text: ReactNode;
  number?: ReactNode;
  titleTag: TitleTag;
  globalClassName: string;
  localClassName?: string;
  additionalClassName?: string;
}

const Title = ({
  text,                            //text title
  number = "",                    //text for number if than need
  titleTag,                      //level title h1,h2....
  globalClassName,              //the global class is styles/common
  localClassName="",              //class is Title.module.scss
  additionalClassName = "",   //class is Title.module.scss
}: TitleProps) => {
  const TagName = titleTag;

  return (
    <TagName
      className={`${globalClassName} ${styles.title} ${styles[localClassName]}`}
    >
      <span className={styles[additionalClassName]}>{text}</span>
      {number && <span className={styles.title__number}>{number}</span>}
    </TagName>
  );
};

export default Title;
