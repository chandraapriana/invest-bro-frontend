import InvestmentAmount from "@/components/molecules/home/InvestmentAmount";
import InvestmentChoice from "@/components/molecules/home/InvestmentChoice";
import InvestmentStrategy from "@/components/molecules/home/InvestmentStrategy";
import React from "react";

const InvestmentSettings = () => {
  return (
    <div className="flex gap-5 mt-10 flex-row w-full">
      <div className="flex flex-col gap-4">
        <InvestmentAmount />
        <InvestmentStrategy />
      </div>
      <InvestmentChoice />
    </div>
  );
};

export default InvestmentSettings;
