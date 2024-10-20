"use client";

import { Area, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { chartColor } from "@/utils/listChartColor";

export const description = "A multiple line chart";

export interface ChartPerformanceEachAssetsProps {
  chartData: {
    [key: string]: number;
    date: string;
  }[];
}

export function ChartPerformanceEachAssets(
  props: ChartPerformanceEachAssetsProps
) {
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chart Performa Setiap Asset</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
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
            <YAxis
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickCount={10}
            />
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
                strokeWidth={4}
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
