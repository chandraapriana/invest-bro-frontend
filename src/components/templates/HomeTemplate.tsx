import React from "react";
import MainContainer from "../layouts/MainContainer";

import Header from "../molecules/shared/Header";
import MainText from "../molecules/home/MainText";

const HomeTemplate = () => {
  return (
    <MainContainer>
      <Header />
      <MainText />
    </MainContainer>
  );
};

export default HomeTemplate;
