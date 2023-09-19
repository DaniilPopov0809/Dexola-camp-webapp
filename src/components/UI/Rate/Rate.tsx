import styles from "./Rate.module.scss";
 interface RateProps {
label: string,
rate: string,
unit: string,
isTitle: boolean,
}
const Rate =({label, rate, unit, isTitle}:RateProps) => {

    return (
        <>
        <label className={styles.label}>{label}</label>
        <span className={isTitle? styles.rateTitle : styles.rateForm }>{rate}</span>
        <span className={isTitle? styles.unitTitle : styles.unitForm}>{unit}</span>
        </>
    )
}

export default Rate;