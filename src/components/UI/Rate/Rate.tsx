import styles from "./Rate.module.scss";
 interface RateProps {
label: string,
rate: string,
unit: string,
}
const Rate =({label, rate, unit}:RateProps) => {

    return (
        <>
        <label className={styles.label}>{label}</label>
        <span className={styles.rate}>{rate}</span>
        <span className={styles.unit}>{unit}</span>
        </>
    )
}

export default Rate;