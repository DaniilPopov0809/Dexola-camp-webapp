import { Oval } from "react-loader-spinner";

interface ButtonLoaderProps {
  text: string;
  isLoading: boolean;
}

const ButtonLoader = ({ text, isLoading }: ButtonLoaderProps) => {
  return (
    <>
        <Oval
          height={20}
          width={20}
          color="#204FFE"
          wrapperStyle={{ marginRight: "8px" }}
          wrapperClass={isLoading? "visibleSpinner" : "hiddenSpinner"}
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#204FFE"
          strokeWidth={8}
          strokeWidthSecondary={8}
        />
      <span>{text}</span>
    </>
  );
};

export default ButtonLoader;
