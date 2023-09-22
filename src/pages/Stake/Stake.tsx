import { useState, useEffect, useMemo } from "react";
import { useContextValue } from "../../hooks/useContextValue";
import { useRewardRate } from "../../hooks/Abi";
import { calculateRewardRate } from "../../helpers/utils";
import { reduceDecimals } from "../../helpers/utils";
import NoWalletConnect from "../../components/UI/NoWalletConnect/NoWalletConnect";
import StakeForm from "../../components/UI/StakeForm/StakeForm";
import Title from "../../components/UI/Title/Title";
import Rate from "../../components/UI/Rate/Rate";
import ToolTipMes from "../../components/UI/ToolTipMes/ToolTipMes";

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

  const reduceRate = useMemo(()=> reduceDecimals(rate, 2), [rate]);

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
                rate={`${reduceRate}`}
                unit={"STRU/WEEK"}
                isTitle={true}
                tooltipId={"fullRewardRate"}
              />
            }
          />
          <StakeForm />
          <ToolTipMes
              id={"fullRewardRate"}
              position={"bottom"}
              content={`Full reward rate: ${rate} STRU`}
            />
        </div>
      ) : (
        <NoWalletConnect />
      )}
    </section>
  );
};

export default Stake;
