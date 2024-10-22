/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";
import MainContainer from "../layouts/MainContainer";

import Header from "../molecules/shared/Header";
import MainText from "../molecules/home/MainText";
import InvestmentSettings, {
  InvestmentSettingsProps,
} from "../organism/home/InvestmentSettings";
import {
  ChartPerformanceEachAssets,
  ChartPerformanceEachAssetsProps,
} from "../organism/home/ChartPerformanceEachAssets";

export interface HomeTemplateProps
  extends InvestmentSettingsProps,
    ChartPerformanceEachAssetsProps {
  sumChartData: {
    [key: string]: number;
    date: string;
  }[];
}

const HomeTemplate = (props: HomeTemplateProps) => {
  return (
    <MainContainer>
      <Header />
      <MainText />
      <InvestmentSettings
        onChangeEndDate={props.onChangeEndDate}
        onChangeRepeatType={props.onChangeRepeatType}
        onChangeStartDate={props.onChangeStartDate}
        onSubmit={props.onSubmit}
        stockIdTickerList={props.stockIdTickerList}
        stockUsTickerList={props.stockUsTickerList}
        cryptoTickerList={props.cryptoTickerList}
      />
      {props.sumChartData.length !== 0 && (
        <ChartPerformanceEachAssets
          title="Performa Keseluruhan Portfolio"
          key={JSON.stringify(props.sumChartData)}
          chartData={props.sumChartData}
        />
      )}
      {props.chartData.length !== 0 && (
        <ChartPerformanceEachAssets
          title="Performa Portfolio Setiap Aset"
          key={JSON.stringify(props.chartData)}
          chartData={props.chartData}
        />
      )}
    </MainContainer>
  );
};

export default HomeTemplate;
