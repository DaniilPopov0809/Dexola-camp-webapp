import  { useMemo } from "react";
import MessageModal from "../MessageModal/MessageModal";
import TextMessageModall from "../TextMessageModal/TextMessageModal";
import MessageIcon from "../MessageIcon/MessageIcon";
import { Oval } from "react-loader-spinner";
import findTextError from "../../../helpers/utils/findTextError";

import errorCross from "../../../images/errorCross.svg";
import successCheck from "../../../images/successCheck.svg";

interface OperationFeedbackSectionProps {
  title: string;
  amount?: string;
  text: string;
  isVisible: boolean;
  titleStatus: string;
  textStatus: string;
  errorMes: string;
  status: string | undefined;
  currentTable?: boolean;
}

const OperationFeedbackSection = ({
  title,
  amount,
  text,
  isVisible,
  titleStatus,
  textStatus,
  errorMes,
  status,
}: OperationFeedbackSectionProps) => {
  const isErrorMessage = useMemo(() => findTextError(errorMes), [errorMes]);
  return (
    <>
      { !status && isVisible &&  <MessageModal
        text={<TextMessageModall title={title} amount={amount} text={text} />}
        children={
          <Oval
            height={32}
            width={32}
            color="#20FE51"
            wrapperStyle={{ marginRight: "8px" }}
            wrapperClass={isVisible ? "visibleSpinner" : "hiddenSpinner"}
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#6E758B"
            strokeWidth={8}
            strokeWidthSecondary={8}
          />
        }
        isLoading={isVisible}
      />
}
      {status  && <MessageModal
        text={
          status === "success" ? (
            <TextMessageModall title={titleStatus} text={textStatus} />
          ) : (
            <TextMessageModall
              title={isErrorMessage ? "Failed." : "Connection Error."}
              text={
                isErrorMessage
                  ? "User rejected the request"
                  : "Please try again"
              }
              // title={"Connection Error."}
              // text={"Please try again"}
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
      />}
    </>
  );
};

export default OperationFeedbackSection;
