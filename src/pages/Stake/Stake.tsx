import { useState, useEffect } from "react";
import { useContextValue } from "../../hooks/useContextValue";
import { useRewardRate } from "../../hooks/Abi";
import { calculateRewardRate } from "../../helpers/utils";
import NoWalletConnect from "../../components/UI/NoWalletConnect/NoWalletConnect";
import StakeForm from "../../components/UI/StakeForm/StakeForm";
import Title from "../../components/UI/Title/Title";
import Rate from "../../components/UI/Rate/Rate";

const Stake = () => {
  const context = useContextValue();
  const isConnected = context?.account?.isConnected;
  const stakedBalance = context?.stakeBalance;
  const periodFinish = context?.periodFinish;
  const totalSupply = context?.totalSupply;
  const userInputValue = context.inputValue;
  const rewardRate = useRewardRate();

  const [rate, setRate] = useState("0.00");

  useEffect(() => {
    if (
      totalSupply !== undefined &&
      stakedBalance !== undefined &&
      periodFinish !== undefined &&
      rewardRate !== undefined
    ) {
      const currentRate = calculateRewardRate(
        stakedBalance,
        periodFinish,
        rewardRate,
        totalSupply,
        userInputValue
      );
      setRate(currentRate);
    }
  }, [stakedBalance, periodFinish, rewardRate, totalSupply, userInputValue]);

  return (
    <section className="container mainSection">
      {isConnected ? (
        <div className="mainSection__formWrap">
          <Title
            text={"Stake"}
            globalClassName={"title__h2"}
            titleTag={"h2"}
            localClassName={"appForm"}
            number={
              <Rate
                label={"Reward rate:"}
                rate={`${rate}`}
                unit={"STRU/WEEK"}
                isTitle={true}
              />
            }
          />
          <StakeForm />
        </div>
      ) : (
        <NoWalletConnect />
      )}
    </section>
  );
};

export default Stake;
