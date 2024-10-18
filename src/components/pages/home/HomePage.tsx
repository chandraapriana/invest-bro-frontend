import HomeTemplate from "@/components/templates/HomeTemplate";
import React from "react";
import { useHome } from "./useHome";

const HomePage = () => {
  const {
    getStockIDTickerListQuery,
    getCryptoTickerListQuery,
    getStockUSTickerListQuery,
  } = useHome();

  console.log(getStockIDTickerListQuery.data);
  return (
    <HomeTemplate
      onSubmit={(data) => console.log(data)}
      stockIdTickerList={getStockIDTickerListQuery.data ?? []}
      stockUsTickerList={getStockUSTickerListQuery.data ?? []}
      cryptoTickerList={getCryptoTickerListQuery.data ?? []}
    />
  );
};

export default HomePage;
