  import styles from "./InfoBlock.module.scss";
  import ToolTipMes from "../ToolTipMes/ToolTipMes";

  interface InfoBlockProps {
    showInfo: boolean;
    showStru: boolean;
    count: string;
    title: string;
    messageToolTip?: string;
    tooltipId?: string;
  }

  const InfoBlock = ({
    showInfo,
    showStru,
    count,
    title,
    messageToolTip,
    tooltipId = "",
  }: InfoBlockProps) => {
    return (
      <li className={styles.infoBlock}>
        <div className={styles.infoBlock__wrap}>
          <p className={styles.infoBlock__count}>{count}</p>
          {showStru && <p className={styles.infoBlock__stru}>stru</p>}
        </div>
        {showInfo && (
          <span
            className={styles.infoBlock__help}
            
            data-tooltip-id={tooltipId}
          ></span>
        )}
        <ToolTipMes
          id={tooltipId}
          position={"top"}
          content={`${messageToolTip}`}
          title={title}
        />
        <p className={styles.infoBlock__title}>{title}</p>
      </li>
    );
  };

  export default InfoBlock;
