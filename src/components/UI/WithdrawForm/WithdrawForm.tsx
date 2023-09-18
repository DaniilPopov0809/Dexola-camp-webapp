// import { useState } from "react";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
// import { formatEther } from "viem";
// import Rate from "../Rate/Rate";
import MainButton from "../MainButton/MainButton";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
// import MessageModal from "../MessageModal/MessageModal";
// import TextMessageModall from "../TextMessageModal/TextMessageModal";
// import MessageIcon from "../MessageIcon/MessageIcon";
import FieldInput from "../FieldInput/FieldInput";
// import useWalletBalance from "../../../hooks/useWalletBalance";
// import {
//   approveTransaction,
//   stakedTokens,
//   waitForOperation,
// } from "../../../helpers/operations";
// import { useAllowance } from "../../../hooks/Abi";
// import { TokenStatus } from "../../../types";
import { baseValidationForm } from "../../../helpers/validation";
// import { Oval } from "react-loader-spinner";
import styles from "../AppForm/AppForm.module.scss";
import { InitialValueType } from "../../../types";

// import errorCross from "../../../images/errorCross.svg";
// import successCheck from "../../../images/successCheck.svg";

const initialValues: InitialValueType = {
    amount: "",
  };

const WithdrawForm = () => {
    // const [isLoading, setIsLoading] = useState(false);
 

    const isLoading= false;

  const handleSubmit = async (
    values: InitialValueType,
    { resetForm, setSubmitting }: FormikHelpers<InitialValueType>
  ) => {
   
    setSubmitting(true);
    console.log(values.amount);
    setSubmitting(false);
    resetForm();
 
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={baseValidationForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form} autoComplete="off">
            <Field name="amount">
              {({ field, meta, form }: FieldProps) => (
                <FieldInput
                  field={field}
                  meta={meta}
                  form={form}
                  placeholder="Enter withdraw amount"
                  type="text"
                  name={"amount"}
                  aria-label="Withdraw"
                />
              )}
            </Field>
            <div className={styles.rateWrap}>
              {/* <Rate
                label={"Available:"}
                rate={struBalance ? struBalance.formatted : "0"}
                unit={"STRU"}
              /> */}
            </div>
            <div className={styles.form__buttonWrap}>
              <MainButton
                children={<ButtonLoader text={"Withdraw"} isLoading={isLoading} />}
                type="submit"
                disabled={isSubmitting}
                globalClassName={"linkButton"}
                localClassName={"form__button"}
                additionalClassName={"form__buttonTextWrap"}
              />
              <MainButton
                children={<ButtonLoader text={"withdraw all & Claim rewards"} isLoading={isLoading} />}
                type="button"
                disabled={isSubmitting}
                globalClassName={"linkButton"}
                localClassName={"form__button"}
                additionalClassName={"form__buttonTextWrap"}
              />
            </div>
          </Form>
        )}
      </Formik>
      {/* <MessageModal
        text={
          <TextMessageModall
            title={"Adding"}
            amount={`${amountStru} STRU`}
            text={"to Staking"}
          />
        }
        children={
          <Oval
            height={32}
            width={32}
            color="#20FE51"
            wrapperStyle={{ marginRight: "8px" }}
            wrapperClass={isSendingToken ? "visibleSpinner" : "hiddenSpinner"}
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#6E758B"
            strokeWidth={8}
            strokeWidthSecondary={8}
          />
        }
        isSendingToken={isSendingToken}
      />
      <MessageModal
        text={
          status === "success" ? (
            <TextMessageModall
              title={`${amountStru} STRU`}
              text={"successfully added to Staking"}
            />
          ) : (
            <TextMessageModall
              title={"Connection Error."}
              text={"Please try again"}
            />
          )
        }
        children={
          status === "success" ? (
            <MessageIcon iconPath={successCheck} bgColor={"#20FE51"} />
          ) : (
            <MessageIcon iconPath={errorCross} bgColor={"#FE2D20"} />
          )
        }
        status={status}
      /> */}
    </>
  );
};

export default WithdrawForm;
