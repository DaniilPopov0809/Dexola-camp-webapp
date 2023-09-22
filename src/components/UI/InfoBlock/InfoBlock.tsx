  import styles from "./InfoBlock.module.scss";
  import ToolTipMes from "../ToolTipMes/ToolTipMes";
  // import helpIcon from "../../../images/helpIcon.svg";

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
          // <img
          //   src={helpIcon}
          //   width="11px"
          //   height="11px"
          //   alt="About"
          // className={styles.infoBlock__image}
          // data-tooltip-id={tooltipId}
          // />
          <span
            className={styles.infoBlock__help}
            data-tooltip-id={tooltipId}
          ></span>
        )}
        <ToolTipMes
          id={tooltipId}
          position={"top"}
          content={`${messageToolTip}`}
        />
        <p className={styles.infoBlock__title}>{title}</p>
      </li>
    );
  };

  export default InfoBlock;
