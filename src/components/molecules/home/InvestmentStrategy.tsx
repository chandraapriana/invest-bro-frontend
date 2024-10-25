import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { useMemo } from "react";

export interface InvestmentStrategyProps {
  onSelectStrategyRecommended: (data: any) => void;
}

export default function InvestmentStrategy(props: InvestmentStrategyProps) {
  const strategies = [
    "7 Magnificent Stock",
    "Aggresive",
    "Moderat",
    "Konservatif",
    "Sangat Konservatif",
  ];

  const investmentRecommend = useMemo(
    () => ({
      "7 Magnificent Stock": {
        US_STOCK: [
          {
            id: 0,
            ticker: "AAPL",
            startInvestment: "0",
            regularInvestment: "200000",
          },
          {
            id: 1,
            ticker: "MSFT",
            startInvestment: "0",
            regularInvestment: "200000",
          },
          {
            id: 2,
            ticker: "GOOG",
            startInvestment: "0",
            regularInvestment: "200000",
          },
          {
            id: 2,
            ticker: "NVDA",
            startInvestment: "0",
            regularInvestment: "200000",
          },
          {
            id: 2,
            ticker: "AMZN",
            startInvestment: "0",
            regularInvestment: "200000",
          },
          {
            id: 2,
            ticker: "META",
            startInvestment: "0",
            regularInvestment: "200000",
          },
          {
            id: 2,
            ticker: "TSLA",
            startInvestment: "0",
            regularInvestment: "200000",
          },
        ],
      },
      Aggresive: {
        US_STOCK: [
          {
            id: 0,
            ticker: "QQQ",
            startInvestment: "0",
            regularInvestment: "500000",
          },
        ],
        ID_STOCK: [
          {
            id: 0,
            ticker: "^JKSE",
            startInvestment: "0",
            regularInvestment: "250000",
          },
        ],
        CRYPTO: [
          {
            id: 0,
            ticker: "BTC",
            startInvestment: "0",
            regularInvestment: "150000",
          },
        ],
        GOLD: [
          {
            id: 0,
            ticker: "GOLD",
            startInvestment: "0",
            regularInvestment: "50000",
          },
        ],
        RDPT: [
          {
            id: 0,
            ticker: "GOLD",
            startInvestment: "0",
            regularInvestment: "50000",
          },
        ],
      },
      Moderat: {
        US_STOCK: [
          {
            id: 0,
            ticker: "QQQ",
            startInvestment: "0",
            regularInvestment: "350000",
          },
        ],
        ID_STOCK: [
          {
            id: 0,
            ticker: "^JKSE",
            startInvestment: "0",
            regularInvestment: "200000",
          },
        ],
        CRYPTO: [
          {
            id: 0,
            ticker: "BTC",
            startInvestment: "0",
            regularInvestment: "100000",
          },
        ],
        GOLD: [
          {
            id: 0,
            ticker: "GOLD",
            startInvestment: "0",
            regularInvestment: "150000",
          },
        ],
        RDPT: [
          {
            id: 0,
            ticker: "RDPT",
            startInvestment: "0",
            regularInvestment: "150000",
          },
        ],
        RDPU: [
          {
            id: 0,
            ticker: "RDPU",
            startInvestment: "0",
            regularInvestment: "50000",
          },
        ],
      },
      Konservatif: {
        US_STOCK: [
          {
            id: 0,
            ticker: "QQQ",
            startInvestment: "0",
            regularInvestment: 200000,
          },
        ],
        ID_STOCK: [
          {
            id: 0,
            ticker: "^JKSE",
            startInvestment: "0",
            regularInvestment: 100000,
          },
        ],
        CRYPTO: [
          {
            id: 0,
            ticker: "BTC",
            startInvestment: "0",
            regularInvestment: 50000,
          },
        ],
        GOLD: [
          {
            id: 0,
            ticker: "GOLD",
            startInvestment: "0",
            regularInvestment: 250000,
          },
        ],
        RDPT: [
          {
            id: 0,
            ticker: "RDPT",
            startInvestment: "0",
            regularInvestment: 250000,
          },
        ],
        RDPU: [
          {
            id: 0,
            ticker: "RDPU",
            startInvestment: "0",
            regularInvestment: "150000",
          },
        ],
      },
      "Sangat Konservatif": {
        US_STOCK: [
          {
            id: 0,
            ticker: "QQQ",
            startInvestment: "0",
            regularInvestment: 100000,
          },
        ],
        ID_STOCK: [
          {
            id: 0,
            ticker: "^JKSE",
            startInvestment: "0",
            regularInvestment: 50000,
          },
        ],

        GOLD: [
          {
            id: 0,
            ticker: "GOLD",
            startInvestment: "0",
            regularInvestment: 300000,
          },
        ],
        RDPT: [
          {
            id: 0,
            ticker: "RDPT",
            startInvestment: "0",
            regularInvestment: 400000,
          },
        ],
        RDPU: [
          {
            id: 0,
            ticker: "RDPU",
            startInvestment: "0",
            regularInvestment: "150000",
          },
        ],
      },
    }),
    []
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">
          Rekomendasi Strategi
        </CardTitle>
        <TrendingUp className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {strategies.map((strategy, index) => (
            <Button
              key={index}
              onClick={() =>
                props.onSelectStrategyRecommended(investmentRecommend[strategy])
              }
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              {strategy}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
