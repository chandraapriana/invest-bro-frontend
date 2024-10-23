/* eslint-disable @typescript-eslint/no-empty-object-type */
import InvestmentAmount, {
  InvestmentAmountProps,
} from "@/components/molecules/home/InvestmentAmount";
import InvestmentChoice, {
  InvestmentChoiceProps,
} from "@/components/molecules/home/InvestmentChoice";
import InvestmentStrategy from "@/components/molecules/home/InvestmentStrategy";
import React, { useState } from "react";

export interface InvestmentSettingsProps
  extends Omit<InvestmentChoiceProps, "investmentStrategy">,
    InvestmentAmountProps {}

const InvestmentSettings = (props: InvestmentSettingsProps) => {
  const [investmentStrategy, setInvestmentStrategy] = useState({});
  return (
    <div className="flex gap-5 mt-10 flex-row w-full">
      <div className="flex flex-col gap-4">
        <InvestmentAmount
          onChangeEndDate={props.onChangeEndDate}
          onChangeStartDate={props.onChangeStartDate}
          onChangeRepeatType={props.onChangeRepeatType}
        />
        <InvestmentStrategy
          onSelectStrategyRecommended={(data) => setInvestmentStrategy(data)}
        />
      </div>
      <InvestmentChoice
        investmentStrategy={investmentStrategy}
        onSubmit={props.onSubmit}
        stockIdTickerList={props.stockIdTickerList}
        stockUsTickerList={props.stockUsTickerList}
        cryptoTickerList={props.cryptoTickerList}
      />
    </div>
  );
};

export default InvestmentSettings;
