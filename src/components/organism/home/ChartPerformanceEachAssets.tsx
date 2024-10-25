"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { chartColor } from "@/utils/listChartColor";
import useIsMobile from "@/hooks/useIsMobile";
import { thousandsSeparator } from "@/utils/helper";
import { calculateMaxDrawdown } from "@/utils/calculationDCA";

export const description = "A multiple line chart";

export interface ChartPerformanceEachAssetsProps {
  chartData: {
    [key: string]: number;
    date: string;
  }[];
  title: string;
}

export function ChartPerformanceEachAssets(
  props: ChartPerformanceEachAssetsProps
) {
  const isMobile = useIsMobile();
  const listTicker = useMemo(
    () =>
      Object.keys(props.chartData[props.chartData.length - 1]).filter(
        (data) => data !== "date"
      ),
    [props.chartData]
  );

  const chartConfig = useMemo(() => {
    let config = {};
    listTicker.forEach((ticker, idx) => {
      config[ticker] = {
        label: ticker,
        color: chartColor[idx % chartColor.length],
      };
    });
    return config;
  }, [listTicker]);

  const totalGrowth = useMemo(
    () => props.chartData[props.chartData.length - 1]["GROWTH"],
    [props.chartData]
  );
  const totalCost = useMemo(
    () => props.chartData[props.chartData.length - 1]["COST"],
    [props.chartData]
  );
  const growthPercentage = useMemo(
    () => (((totalGrowth - totalCost) / totalCost) * 100).toFixed(0),
    [totalCost, totalGrowth]
  );

  const maxDrawdown = useMemo(
    () => calculateMaxDrawdown(props.chartData).toFixed(0),
    [props.chartData]
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{props.title}</CardTitle>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Total Pembelian
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {thousandsSeparator(totalCost ?? 0)}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Total Value</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {thousandsSeparator(totalGrowth ?? 0)}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Persentase Pertumbuhan
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {thousandsSeparator(parseInt(growthPercentage) ?? 0)}%
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Kerugian Maksimum
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {maxDrawdown}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={props.chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 7)}
            />
            {!isMobile && (
              <YAxis
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                tickCount={10}
              />
            )}

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="bg-white" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            {listTicker.map((ticker) => (
              <Line
                key={ticker}
                dataKey={ticker}
                type="monotone"
                stroke={chartConfig[ticker].color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
