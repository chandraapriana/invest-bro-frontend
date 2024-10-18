/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";
import MainContainer from "../layouts/MainContainer";

import Header from "../molecules/shared/Header";
import MainText from "../molecules/home/MainText";
import InvestmentSettings, {
  InvestmentSettingsProps,
} from "../organism/home/InvestmentSettings";

export interface HomeTemplateProps extends InvestmentSettingsProps {}

const HomeTemplate = (props: HomeTemplateProps) => {
  return (
    <MainContainer>
      <Header />
      <MainText />
      <InvestmentSettings
        onSubmit={props.onSubmit}
        stockIdTickerList={props.stockIdTickerList}
        stockUsTickerList={props.stockUsTickerList}
        cryptoTickerList={props.cryptoTickerList}
      />
    </MainContainer>
  );
};

export default HomeTemplate;
