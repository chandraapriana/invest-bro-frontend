import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { thousandsSeparator } from "@/utils/helper";
import { useMemo } from "react";

interface InvestmentData {
  ticker: string;
  investmentGrowth: number;
  investmentCost: number;
  percentageGrowth: number;
  maxDrawdown: number;
}

interface DataEntry {
  date: string;
  [key: string]: number | string;
}

function calculateMaxDrawdown(values: number[]): number {
  let peak = values[0];
  let maxDrawdown = 0;

  for (const value of values) {
    if (value > peak) {
      peak = value;
    }
    const drawdown = (peak - value) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  return maxDrawdown * 100; // Convert to percentage
}

function processInvestmentData(data: DataEntry[]): InvestmentData[] {
  const result: InvestmentData[] = [];
  const tickers: Set<string> = new Set();

  // Identify all tickers (without "-COST" suffix)
  data.forEach((entry) => {
    Object.keys(entry).forEach((key) => {
      if (!key.includes("-COST") && key !== "date") {
        tickers.add(key);
      }
    });
  });

  // Process each ticker
  tickers.forEach((ticker) => {
    const investmentGrowthValues: number[] = [];
    const investmentCostValues: number[] = [];

    data.forEach((entry) => {
      const investmentGrowth = entry[ticker] as number;
      const investmentCost = entry[`${ticker}-COST`] as number;

      investmentGrowthValues.push(investmentGrowth);
      investmentCostValues.push(investmentCost);
    });

    const lastInvestmentGrowth =
      investmentGrowthValues[investmentGrowthValues.length - 1];
    const lastInvestmentCost =
      investmentCostValues[investmentCostValues.length - 1];
    const percentageGrowth =
      ((lastInvestmentGrowth - lastInvestmentCost) / lastInvestmentCost) * 100;
    const maxDrawdown = calculateMaxDrawdown(investmentGrowthValues);

    result.push({
      ticker,
      investmentGrowth: lastInvestmentGrowth,
      investmentCost: lastInvestmentCost,
      percentageGrowth,
      maxDrawdown,
    });
  });

  // Sort the result by investmentGrowth from highest to lowest
  result.sort((a, b) => b.investmentGrowth - a.investmentGrowth);

  return result;
}

export interface InvestmentTableComparisonProps {
  chartData: {
    date: string;
    [key: string]: number;
  }[];
}

export function InvestmentTableComparison(
  props: InvestmentTableComparisonProps
) {
  const dataComparison = useMemo(
    () => processInvestmentData(props.chartData),
    [props.chartData]
  );
  return (
    <Table className=" !rounded-xl shadow-md  border border-gray-200">
      <TableCaption>List perbandingan performa tiap asset.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Ticker</TableHead>
          <TableHead>Investasi Nilai</TableHead>
          <TableHead>Value Investasi</TableHead>
          <TableHead>Persentase Pertumbuhan</TableHead>
          <TableHead>Max Drawdown</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataComparison.map((data) => (
          <TableRow key={data.ticker}>
            <TableCell className="font-medium">{data.ticker}</TableCell>
            <TableCell>{thousandsSeparator(data.investmentCost)}</TableCell>
            <TableCell>{thousandsSeparator(data.investmentGrowth)}</TableCell>
            <TableCell>{data.percentageGrowth.toFixed(0)}%</TableCell>
            <TableCell>{data.maxDrawdown.toFixed(0)}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
