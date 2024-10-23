import InvestmentChoice from "@/components/molecules/home/InvestmentChoice";
import {
  IUseGetCryptoTickerListQuery,
  useGetCryptoTickerListQuery,
} from "@/hooks/api/useGetCryptoTickerListQuery";
import { useGetHistoryDataCryptoMutation } from "@/hooks/api/useGetHistoryDataCryptoMutation";
import { useGetHistoryDataGoldMutation } from "@/hooks/api/useGetHistoryDataGoldMutation";
import { useGetHistoryDataStockIdMutation } from "@/hooks/api/useGetHistoryDataStockIdMutation";
import { useGetHistoryDataStockUsMutation } from "@/hooks/api/useGetHistoryDataStockUsMutation";
import {
  IUseGetStockIdTickerListQuery,
  useGetStockIdTickerListQuery,
} from "@/hooks/api/useGetStockIdTickerList";
import {
  IUseGetStockUSTickerListQuery,
  useGetStockUSTickerListQuery,
} from "@/hooks/api/useGetStockUSTickerListQuery";
import { useCallback, useState } from "react";
import { calculateDCA, calculateStableDCA } from "@/utils/calculationDCA";

// Define types for history data and growth
interface HistoryGrowth {
  date: string;
  value: number;
}

interface ChartData {
  month: string;
  [key: string]: number;
}

export interface IUseHome {
  getStockUSTickerListQuery: IUseGetStockUSTickerListQuery;
  getStockIDTickerListQuery: IUseGetStockIdTickerListQuery;
  getCryptoTickerListQuery: IUseGetCryptoTickerListQuery;
  handleStartDate: (date: string) => void;
  handleEndDate: (date: string) => void;
  handleRepeatType: (type: string) => void;
  handleSubmit: (investmentChoice: InvestmentChoice) => void;
  chartData: ChartData[];
  sumChartData: ChartData[];
}

export const useHome = (): IUseHome => {
  const getStockUSTickerListQuery = useGetStockUSTickerListQuery();
  const getStockIDTickerListQuery = useGetStockIdTickerListQuery();
  const getCryptoTickerListQuery = useGetCryptoTickerListQuery();
  const getHistoryDataStockUs = useGetHistoryDataStockUsMutation();
  const getHistoryDataStockId = useGetHistoryDataStockIdMutation();
  const getHistoryDataCrypto = useGetHistoryDataCryptoMutation();
  const getHistoryDataGold = useGetHistoryDataGoldMutation();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [repeatType, setRepeatType] = useState<string>("monthly");
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [sumChartData, setSumChartData] = useState<ChartData[]>([]);

  const handleStartDate = useCallback((date: string) => setStartDate(date), []);
  const handleEndDate = useCallback((date: string) => setEndDate(date), []);
  const handleRepeatType = useCallback(
    (type: string) => setRepeatType(type),
    []
  );

  // Helper function to extract year-month (YYYY-MM) from a date string
  const getYearMonth = useCallback(
    (date: string): string => date.substring(0, 7),
    []
  );

  const mergeHistoryGrowth = useCallback(
    (
      historyGrowth: HistoryGrowth[],
      ticker: string,
      allHistoryGrowth: { [key: string]: { [key: string]: number } }
    ) => {
      historyGrowth.forEach(({ date, value }) => {
        const yearMonth = getYearMonth(date);
        if (!allHistoryGrowth[yearMonth]) {
          allHistoryGrowth[yearMonth] = { date: yearMonth }; // Initialize with date
        }
        allHistoryGrowth[yearMonth][ticker] = value; // Add the value for the given ticker
      });
    },
    [getYearMonth]
  );

  // Generalized handler for fetching data and calculating DCA
  const processInvestmentData = useCallback(
    async (
      dataArray: { ticker: string; regularInvestment: number }[],
      fetchData: (
        param: { name: string; start_date: string; end_date: string }[]
      ) => Promise<{ [key: string]: HistoryGrowth[] }>,
      allHistoryGrowth: { [key: string]: { [key: string]: number } },
      repeatType: string,
      allHistoryCost: { [key: string]: { [key: string]: number } }
    ) => {
      const param = dataArray.map((stock) => ({
        name: stock.ticker,
        start_date: startDate,
        end_date: endDate,
      }));
      const historyData = await fetchData(param);

      Object.keys(historyData).forEach((ticker) => {
        const history = historyData[ticker];
        const stockData = dataArray.find((stock) => stock.ticker === ticker);
        if (stockData) {
          const { historyGrowth, historyCost } = calculateDCA(
            history,
            stockData.regularInvestment,
            repeatType
          );
          mergeHistoryGrowth(historyGrowth, ticker, allHistoryGrowth);
          mergeHistoryGrowth(historyCost, ticker + "-COST", allHistoryCost);
        }
      });
    },
    [startDate, endDate, mergeHistoryGrowth]
  );

  // No need for useCallback here, just a regular function
  const processStableData = useCallback(
    (
      type: "RDPT" | "RDPU",
      rate: number,
      data: InvestmentChoice,
      allHistoryGrowth: { [key: string]: { [key: string]: number } },
      allHistoryCost: { [key: string]: { [key: string]: number } }
    ) => {
      const dataType = data[type].find((stock) => stock.ticker === type);
      if (dataType) {
        const { historyGrowth, historyCost } = calculateStableDCA(
          dataType.regularInvestment,
          repeatType,
          startDate,
          endDate,
          rate
        );
        mergeHistoryGrowth(historyGrowth, type, allHistoryGrowth);
        mergeHistoryGrowth(historyCost, type + "-COST", allHistoryCost);
      }
    },
    [endDate, mergeHistoryGrowth, repeatType, startDate]
  );

  const handleSubmit = useCallback(
    async (data: InvestmentChoice) => {
      console.log(data);
      const allHistoryGrowth: { [key: string]: { [key: string]: number } } = {}; // To store merged history growth data
      const allHistoryCost: { [key: string]: { [key: string]: number } } = {}; // To store merged history growth data

      if (data.US_STOCK.length !== 0) {
        await processInvestmentData(
          data.US_STOCK,
          getHistoryDataStockUs.mutateAsync,
          allHistoryGrowth,
          repeatType,
          allHistoryCost
        );
      }

      if (data.ID_STOCK.length !== 0) {
        await processInvestmentData(
          data.ID_STOCK,
          getHistoryDataStockId.mutateAsync,
          allHistoryGrowth,
          repeatType,
          allHistoryCost
        );
      }

      if (data.CRYPTO.length !== 0) {
        await processInvestmentData(
          data.CRYPTO,
          getHistoryDataCrypto.mutateAsync,
          allHistoryGrowth,
          repeatType,
          allHistoryCost
        );
      }

      if (data.GOLD.length !== 0) {
        await processInvestmentData(
          data.GOLD,
          getHistoryDataGold.mutateAsync,
          allHistoryGrowth,
          repeatType,
          allHistoryCost
        );
      }

      // Process RDPT and RDPU separately due to different logic (StableDCA)
      if (data.RDPT.length !== 0)
        processStableData("RDPT", 6, data, allHistoryGrowth, allHistoryCost);
      if (data.RDPU.length !== 0)
        processStableData("RDPU", 4, data, allHistoryGrowth, allHistoryCost);
      console.log(allHistoryGrowth);
      // Convert allHistoryGrowth object into an array for charting
      const chartData = Object.keys(allHistoryGrowth).map((yearMonth) => ({
        ...allHistoryGrowth[yearMonth],
        ...allHistoryCost[yearMonth],
      }));
      console.log(chartData);
      const sumChartData = chartData.map((entry) => {
        let growth = 0;
        let cost = 0;

        // Iterate through keys and separate GROWTH and COST values
        Object.keys(entry).forEach((key) => {
          if (key !== "date") {
            if (key.includes("COST")) {
              cost += entry[key];
            } else {
              growth += entry[key];
            }
          }
        });

        return {
          date: entry.date,
          GROWTH: growth,
          COST: cost,
        };
      });
      setSumChartData(sumChartData);
      setChartData(chartData);
    },
    [
      processStableData,
      processInvestmentData,
      getHistoryDataStockUs.mutateAsync,
      repeatType,
      getHistoryDataStockId.mutateAsync,
      getHistoryDataCrypto.mutateAsync,
      getHistoryDataGold.mutateAsync,
    ]
  );

  return {
    getStockUSTickerListQuery,
    getStockIDTickerListQuery,
    getCryptoTickerListQuery,
    handleEndDate,
    handleStartDate,
    handleRepeatType,
    handleSubmit,
    chartData,
    sumChartData,
  };
};
