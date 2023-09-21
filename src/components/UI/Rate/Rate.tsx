import styles from "./Rate.module.scss";
 interface RateProps {
label: string,
rate: string,
unit: string,
isTitle: boolean,
tooltipId?:string,
}
const Rate =({label, rate, unit, isTitle, tooltipId}:RateProps) => {

    return (
        <div className={styles.rateContainer} data-tooltip-id={tooltipId? tooltipId: ""}>
        <label className={styles.label}>{label}</label>
        <span className={isTitle? styles.rateTitle : styles.rateForm }>{rate}</span>
        <span className={isTitle? styles.unitTitle : styles.unitForm}>{unit}</span>
        </div>
    )
}

export default Rate;