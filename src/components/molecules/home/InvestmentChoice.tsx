import React, { useState } from "react";
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
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

interface SelectOption {
  id: number;
}

interface InvestmentOption {
  category: string;
  options: string[];
  selects: SelectOption[];
  isFixed: boolean;
}

const initialInvestmentOptions: InvestmentOption[] = [
  {
    category: "Saham Amerika",
    options: ["NASDAQ"],
    selects: [],
    isFixed: false,
  },
  { category: "Saham Indo", options: ["IHSG"], selects: [], isFixed: false },
  { category: "Crypto", options: ["BTC"], selects: [], isFixed: false },
  { category: "Gold", options: ["Gold"], selects: [], isFixed: true },
  {
    category: "Reksadana Pendapatan Tetap",
    options: ["RDPT"],
    selects: [],
    isFixed: true,
  },
  {
    category: "Reksadana Pasar Uang",
    options: ["RDPU"],
    selects: [],
    isFixed: true,
  },
];

const InvestmentChoice = () => {
  const [investmentOptions, setInvestmentOptions] = useState<
    InvestmentOption[]
  >(initialInvestmentOptions);

  const addSelect = (categoryIndex: number) => {
    setInvestmentOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      const newSelectId = newOptions[categoryIndex].selects.length;
      newOptions[categoryIndex].selects.push({ id: newSelectId });
      return newOptions;
    });
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <Card className="w-full  mx-auto">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>Simbol</div>
            <div>
              Alokasi Investasi Awal
              <br />
              (max total 10.000.000)
            </div>
            <div>
              Alokasi Investasi
              <br />
              Rutin
            </div>
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
              {option.selects.map((select) => (
                <div
                  key={select.id}
                  className="grid grid-cols-3 gap-4 items-end mt-2"
                >
                  <div>
                    {option.isFixed ? (
                      <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background flex items-center">
                        {option.options[0]}
                      </div>
                    ) : (
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {option.options.map((opt, i) => (
                            <SelectItem key={i} value={opt}>
                              {opt}
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
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="100.000"
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
      <Button className="w-full">Hitung Investasi</Button>
    </div>
  );
};

export default InvestmentChoice;
