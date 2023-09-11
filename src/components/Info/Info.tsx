import styles from "./Info.module.scss";
import Title from "../UI/Title/Title";
import InfoBlock from "../UI/InfoBlock/InfoBlock";

const Info = () => {
  return (
    <section className={`container ${styles.info}`}>
      <Title
        text={"StarRunner Token staking"}
        globalClassName={"title__h1"}
        localClassName={"info"}
        titleTag={"h1"}
      />
      <ul className={styles.info__wrap}>
      <InfoBlock
        showInfo={true}
        showStru={true}
        count={"0.00"}
        title={"Staked balance"}
        messageToolTip={"Staking rewards get allocated on this sum"}
        tooltipId={"tolTrip1"}
      />
        <InfoBlock
        showInfo={true}
        showStru={false}
        count={`≈${'8'}%`}
        title={"APR"}
        messageToolTip={"Displays the average for APR. Interest rate is calculated for each amount of tokens"}
        tooltipId={"tolTrip2"}
      />
       <InfoBlock
        showInfo={false}
        showStru={false}
        count={`0`}
        title={"Days"}
      />
      <InfoBlock
        showInfo={true}
        showStru={true}
        count={"0.00"}
        title={"Rewards"}
        messageToolTip={"Rewards get allocated every second"}
        tooltipId={"tolTrip4"}
      />
      </ul>
    </section>
  );
};

export default Info;
