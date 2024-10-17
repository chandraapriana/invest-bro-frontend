import React from "react";
import MainContainer from "../layouts/MainContainer";

import Header from "../molecules/shared/Header";
import MainText from "../molecules/home/MainText";
import InvestmentSettings from "../organism/home/InvestmentSettings";

const HomeTemplate = () => {
  return (
    <MainContainer>
      <Header />
      <MainText />
      <InvestmentSettings />
    </MainContainer>
  );
};

export default HomeTemplate;
