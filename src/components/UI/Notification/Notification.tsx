import { useMemo } from "react";
import TextMessage from "../TextMessage/TextMessage";
import MessageIcon from "../MessageIcon/MessageIcon";
import { Oval } from "react-loader-spinner";
import findTextError from "../../../helpers/utils/findTextError";

import errorCross from "../../../images/errorCross.svg";
import successCheck from "../../../images/successCheck.svg";
import MessageContainer from "../MessageContainer/MessageContainer";

interface NotificationProps {
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

const Notification = ({
  title,
  amount,
  text,
  isVisible,
  titleStatus,
  textStatus,
  errorMes,
  status,
}: NotificationProps) => {
  const isErrorMessage = useMemo(() => findTextError(errorMes), [errorMes]);
  return (
    <>
      {!status && isVisible && (
        <MessageContainer
          text={<TextMessage title={title} amount={amount} text={text} />}
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
      )}
      {status && (
        <MessageContainer
          text={
            status === "success" ? (
              <TextMessage title={titleStatus} text={textStatus} />
            ) : (
              <TextMessage
                title={isErrorMessage ? "Failed." : "Connection Error."}
                text={
                  isErrorMessage
                    ? "User rejected the request"
                    : "Please try again"
                }
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
        />
      )}
    </>
  );
};

export default Notification;
