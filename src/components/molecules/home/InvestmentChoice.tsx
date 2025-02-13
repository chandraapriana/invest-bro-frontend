/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TickerList } from "@/interface/ticker";
import { ModalSaveStrategy } from "@/components/organism/home/ModalSaveStrategy";

interface SelectOption {
  id: number;
  ticker: string;
  startInvestment: string;
  regularInvestment: string;
}

export interface InvestmentItem {
  ticker: string;
  startInvestment: number;
  regularInvestment: number;
}

interface InvestmentChoice {
  US_STOCK: InvestmentItem[];
  ID_STOCK: InvestmentItem[];
  CRYPTO: InvestmentItem[];
  GOLD: InvestmentItem[];
  RDPT: InvestmentItem[];
  RDPU: InvestmentItem[];
}

type InvestmentKey = keyof InvestmentChoice;

interface InvestmentOption {
  category: string;
  options: TickerList;
  selects: SelectOption[];
  isFixed: boolean;
  key: InvestmentKey; // This ensures 'key' is one of the keys of InvestmentChoice
}

export interface InvestmentChoiceProps {
  stockIdTickerList: TickerList;
  stockUsTickerList: TickerList;
  cryptoTickerList: TickerList;
  onSubmit: (data: InvestmentChoice) => void;
  investmentStrategy: any;
}

const InvestmentChoice = (props: InvestmentChoiceProps) => {
  const initialInvestmentOptions = useMemo<InvestmentOption[]>(
    () => [
      {
        category: "Saham Amerika",
        options: props.stockUsTickerList,
        selects: props.investmentStrategy["US_STOCK"] ?? [],
        isFixed: false,
        key: "US_STOCK", // Valid key
      },
      {
        category: "Saham Indo",
        options: props.stockIdTickerList,
        selects: props.investmentStrategy["ID_STOCK"] ?? [],
        isFixed: false,
        key: "ID_STOCK", // Valid key
      },
      {
        category: "Crypto",
        options: props.cryptoTickerList,
        selects: props.investmentStrategy["CRYPTO"] ?? [],
        isFixed: false,
        key: "CRYPTO", // Valid key
      },
      {
        category: "Gold",
        options: [{ ticker: "GOLD", name: "", logo: "" }],
        selects: props.investmentStrategy["GOLD"] ?? [],
        isFixed: true,
        key: "GOLD", // Valid key
      },
      {
        category: "Reksadana Pendapatan Tetap",
        options: [{ ticker: "RDPT", name: "", logo: "" }],
        selects: props.investmentStrategy["GOLD"] ?? [],
        isFixed: true,
        key: "RDPT", // Valid key
      },
      {
        category: "Reksadana Pasar Uang",
        options: [{ ticker: "RDPU", name: "", logo: "" }],
        selects: props.investmentStrategy["RDPU"] ?? [],
        isFixed: true,
        key: "RDPU", // Valid key
      },
    ],
    [
      props.stockIdTickerList,
      props.stockUsTickerList,
      props.cryptoTickerList,
      props.investmentStrategy,
    ]
  );

  const [investmentOptions, setInvestmentOptions] = useState<
    InvestmentOption[]
  >(initialInvestmentOptions);

  useEffect(() => {
    setInvestmentOptions(initialInvestmentOptions);
  }, [initialInvestmentOptions]);

  const addSelect = useCallback((categoryIndex: number) => {
    setInvestmentOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      const newSelectId = newOptions[categoryIndex].selects.length;
      newOptions[categoryIndex].selects.push({
        id: newSelectId,
        ticker: newOptions[categoryIndex].isFixed
          ? newOptions[categoryIndex].options[0].ticker
          : "",
        startInvestment: "",
        regularInvestment: "",
      });
      return newOptions;
    });
  }, []);

  const updateSelect = useCallback(
    (
      categoryIndex: number,
      selectIndex: number,
      field: keyof SelectOption,
      value: string
    ) => {
      setInvestmentOptions((prevOptions) => {
        const newOptions = [...prevOptions];
        newOptions[categoryIndex].selects[selectIndex] = {
          ...newOptions[categoryIndex].selects[selectIndex],
          [field]: value,
        };
        return newOptions;
      });
    },
    []
  );

  const removeSelect = useCallback(
    (categoryIndex: number, selectIndex: number) => {
      setInvestmentOptions((prevOptions) => {
        const newOptions = [...prevOptions];
        newOptions[categoryIndex].selects = newOptions[
          categoryIndex
        ].selects.filter((_, idx) => idx !== selectIndex);
        return newOptions;
      });
    },
    []
  );

  const handleSubmit = useCallback(() => {
    console.log("submit", investmentOptions);
    const result: InvestmentChoice = {
      US_STOCK: [],
      ID_STOCK: [],
      CRYPTO: [],
      GOLD: [],
      RDPT: [],
      RDPU: [],
    };

    investmentOptions.forEach((option) => {
      option.selects.forEach((select) => {
        if (
          (select.ticker || option.isFixed) &&
          select.startInvestment &&
          select.regularInvestment
        ) {
          result[option.key].push({
            ticker: option.isFixed ? option.options[0].ticker : select.ticker,
            startInvestment: parseInt(select.startInvestment),
            regularInvestment: parseInt(select.regularInvestment),
          });
        }
      });
    });
    console.log(result);

    props.onSubmit(result);
  }, [investmentOptions, props]);

  return (
    <div className="flex flex-col w-full gap-4">
      <Card className="w-full mx-auto">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>Simbol</div>
            <div>Alokasi Investasi Awal</div>
            <div>Alokasi Investasi Rutin</div>
          </div>
          {investmentOptions.map((option, categoryIndex) => (
            <div key={categoryIndex} className="border-t border-gray-200 py-4">
              <div className="flex justify-between items-center mb-2">
                <Label>{option.category}</Label>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => addSelect(categoryIndex)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {option.selects.map((select, selectIndex) => (
                <div
                  key={select.id}
                  className="grid grid-cols-3 gap-4 items-end mt-2"
                >
                  <div>
                    {option.isFixed ? (
                      <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background flex items-center">
                        {option.options[0].ticker}
                      </div>
                    ) : (
                      <Select
                        value={select.ticker}
                        onValueChange={(value) =>
                          updateSelect(
                            categoryIndex,
                            selectIndex,
                            "ticker",
                            value
                          )
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {option.options.map((opt, i) => (
                            <SelectItem key={i} value={opt.ticker}>
                              <div className="flex flex-row gap-2">
                                <img
                                  src={opt.logo}
                                  className="min-w-4 w-4 object-scale-down"
                                  alt=""
                                />{" "}
                                <p>
                                  {" "}
                                  {opt.ticker} - {opt.name}
                                </p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="1.000.000"
                      className="w-full"
                      value={select.startInvestment}
                      onChange={(e) =>
                        updateSelect(
                          categoryIndex,
                          selectIndex,
                          "startInvestment",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-row gap-2">
                    <Input
                      type="number"
                      placeholder="100.000"
                      className="w-full"
                      value={select.regularInvestment}
                      onChange={(e) =>
                        updateSelect(
                          categoryIndex,
                          selectIndex,
                          "regularInvestment",
                          e.target.value
                        )
                      }
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => removeSelect(categoryIndex, selectIndex)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex flex-row gap-2">
        <ModalSaveStrategy />
        <Button className="w-full" onClick={handleSubmit}>
          Hitung Investasi
        </Button>
      </div>
    </div>
  );
};

export default InvestmentChoice;
