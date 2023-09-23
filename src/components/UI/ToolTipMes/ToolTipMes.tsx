import { Tooltip, PlacesType } from "react-tooltip";
import styles from "./ToolTipMes.module.scss";

interface ToolTipMesProps {
  id: string;
  position: PlacesType;
  content: string;
  title?: string;
}

const ToolTipMes = ({ id, position, content, title }: ToolTipMesProps) => {
  return (
    <>
      <Tooltip
        id={id}
        place={position}
        variant={"light"}
        className={
          id === "fullAmount" || id === "fullRewardRate"
            ? styles.form
            : styles.infoBlock
        }
      >
        {content}
      </Tooltip>
      <Tooltip
        id={id}
        variant={"light"}
        className={styles.mobileToolTip}
        classNameArrow={styles.arrow}
        
      >
        {title && <span className={styles.mobileTitle}>{title}</span>}
        {content}
      </Tooltip>
    </>
  );
};

export default ToolTipMes;
