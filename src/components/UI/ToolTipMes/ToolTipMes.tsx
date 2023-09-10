import { Tooltip, PlacesType } from "react-tooltip";
import styles from "./ToolTipMes.module.scss";

interface ToolTipMesProps {
  id: string;
  position: PlacesType;
  content: string;
}

const ToolTipMes = ({ id, position, content }: ToolTipMesProps) => {
  return (
    <Tooltip id={id} place={position} variant={"light"} className={styles.customTooltrip}>
      {content}
    </Tooltip>
  );
};

export default ToolTipMes;
