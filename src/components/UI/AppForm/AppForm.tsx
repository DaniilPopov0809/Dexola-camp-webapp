// import styles from "./AppForm.module.scss";

// export interface InitialValue {
//   count: string;
// }

// import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
// import Rate from "../Rate/Rate";
// import MainButton from "../MainButton/MainButton";
// import FieldInput from "../FieldInput/FieldInput";
// import useWalletBalance from "../../../hooks/useWalletBalance";
// import { TokenStatus } from "../../../types";

// // import styles from "./RegistrationForm.module.scss";

// const AppForm = () => {
//     const struBalance = useWalletBalance(TokenStatus.Token);

//   const initialValues: InitialValue = {
//     count: "",
//   };

//   const handleSubmit = async (
//     values: InitialValue,
//     { resetForm, setSubmitting }: FormikHelpers<InitialValue>
//   ) => {
//     const sendData: InitialValue = {
//       count: values.count,
//     };
//     console.log("🚀 ~ file: AppForm.tsx:37 ~ AppForm ~ sendData:", sendData);

//     setSubmitting(true);

//     //отправка формы

//     setSubmitting(false);
//     resetForm();
//   };
//   return (
//     <Formik
//       initialValues={initialValues}
//       // validationSchema={validationRegitrationForm}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form className={styles.form} autoComplete="off">
//           <Field name="count">
//             {({ field, meta, form }: FieldProps) => (
//               <FieldInput
//                 field={field}
//                 meta={meta}
//                 form={form}
//                 placeholder="Enter stake amount"
//                 type="text"
//                 name={"count"}
//                 aria-label="Stake amount"
//               />
//             )}
//           </Field>
//           <div className={styles.rateWrap}>
//             <Rate label={"Available:"} rate={struBalance? struBalance.formatted: "0"} unit={"STRU"} />
//           </div>
//           <div className={styles.form__buttonWrap}>
//             <MainButton
//               children={"Stake"}
//               type="submit"
//               disabled={isSubmitting}
//               globalClassName={"linkButton"}
//               localClassName={"form__button"}
//               //   additionalClassName={"form__buttonTextWrap"}
//             />
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default AppForm;
