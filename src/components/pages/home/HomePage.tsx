import HomeTemplate from "@/components/templates/HomeTemplate";
import React from "react";
import { useHome } from "./useHome";

const HomePage = () => {
  const {
    getStockIDTickerListQuery,
    getCryptoTickerListQuery,
    getStockUSTickerListQuery,
    handleEndDate,
    handleRepeatType,
    handleStartDate,
    handleSubmit,
  } = useHome();

  return (
    <HomeTemplate
      onChangeEndDate={handleEndDate}
      onChangeStartDate={handleStartDate}
      onChangeRepeatType={handleRepeatType}
      onSubmit={handleSubmit}
      stockIdTickerList={getStockIDTickerListQuery.data ?? []}
      stockUsTickerList={getStockUSTickerListQuery.data ?? []}
      cryptoTickerList={getCryptoTickerListQuery.data ?? []}
    />
  );
};

export default HomePage;
