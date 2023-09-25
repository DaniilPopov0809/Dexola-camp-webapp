import React from "react";
import { HTMLInputTypeAttribute } from "react";
import { ErrorMessage, FieldProps } from "formik";
import { useAppContextValue } from "../../../hooks/useContextValue";
import styles from "./FieldInput.module.scss";

interface FieldInputProps extends FieldProps {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  name: string;
  formName?: string;
  children?: React.ReactNode;
}

const FieldInput = ({
  field,
  meta,
  placeholder,
  name,
  type,
  formName,
  children,
  ...props
}: FieldInputProps) => {
  // eslint-disable-next-line
  const { form, ...inputProps } = props;

  const context = useAppContextValue();
  const {setInputValue, inputValue} = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+e.target.value)) {
      if (formName === "stake") {
        setInputValue(e.target.value);
      }
      field.onChange(e);
    }
  };

  return (
    <div className={styles.field__container}>
      <input
        className={`mainFontSize ${styles.field__input} ${
          meta.touched && meta.error
            ? styles.error
            : meta.touched
            ? styles.success
            : ""
        }`}
        type={type}
        placeholder={placeholder}
        {...field}
        {...inputProps}
        value={formName === "stake" ? inputValue : field.value}
        onChange={handleChange}
      />
      {children}
      <ErrorMessage
        className={styles.field__error}
        name={name}
        component="div"
      />
    </div>
  );
};
export default FieldInput;
