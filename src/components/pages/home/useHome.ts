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

export interface IUseHome {
  getStockUSTickerListQuery: IUseGetStockUSTickerListQuery;
  getStockIDTickerListQuery: IUseGetStockIdTickerListQuery;
  getCryptoTickerListQuery: IUseGetCryptoTickerListQuery;
  handleStartDate: (date: string) => void;
  handleEndDate: (date: string) => void;
  handleRepeatType: (type: string) => void;
  handleSubmit: (investmentChoice: InvestmentChoice) => void;
  chartData: {
    [key: string]: number;
    month: string;
  }[];
}

export const useHome = () => {
  const getStockUSTickerListQuery = useGetStockUSTickerListQuery();
  const getStockIDTickerListQuery = useGetStockIdTickerListQuery();
  const getCryptoTickerListQuery = useGetCryptoTickerListQuery();
  const getHistoryDataStockUs = useGetHistoryDataStockUsMutation();
  const getHistoryDataStockId = useGetHistoryDataStockIdMutation();
  const getHistoryDataCrypto = useGetHistoryDataCryptoMutation();
  const getHistoryDataGold = useGetHistoryDataGoldMutation();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [repeatType, setRepeatType] = useState("monthly");
  const [chartData, setChartData] = useState<
    { month: string; [key: string]: number }[]
  >([]);

  const handleStartDate = useCallback((date: string) => {
    setStartDate(date);
  }, []);

  const handleEndDate = useCallback((date: string) => {
    setEndDate(date);
  }, []);

  const handleRepeatType = useCallback((type: string) => {
    setRepeatType(type);
  }, []);

  const calculateDCA = (
    historicalData: { [key: string]: number },
    initialInvestment: number,
    regularInvestment: number,
    interval: string
  ) => {
    let totalUnits = 0;
    let totalInvested = initialInvestment;
    let firstInvestment = true;

    const historyGrowth: { date: string; value: number }[] = []; // Array to track investment growth

    // Convert the string dates to Date objects for easier manipulation
    const sortedDates = Object.keys(historicalData).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    let lastInvestmentDate: Date | null = null;
    let lastMonthTracked: number | null = null;

    for (const date of sortedDates) {
      const price = historicalData[date];
      const currentDate = new Date(date);

      // Initial investment
      if (firstInvestment) {
        totalUnits += (initialInvestment + regularInvestment) / price;
        firstInvestment = false;
        lastInvestmentDate = currentDate;
      } else {
        // Check interval to determine whether to invest again
        let shouldInvest = false;

        if (interval === "daily") {
          shouldInvest = true; // Always invest if the interval is daily
        } else if (interval === "weekly") {
          const diffInDays =
            (currentDate.getTime() - lastInvestmentDate!.getTime()) /
            (1000 * 3600 * 24);
          shouldInvest = diffInDays >= 7; // Invest every 7 days
        } else if (interval === "monthly") {
          shouldInvest =
            currentDate.getMonth() !== lastInvestmentDate!.getMonth(); // Invest in a new month
        }

        if (shouldInvest) {
          totalUnits += regularInvestment / price;
          totalInvested += regularInvestment;
          lastInvestmentDate = currentDate; // Update the last investment date
        }
      }

      // Record investment value only at the last date of each month
      const currentMonth = currentDate.getMonth();
      if (lastMonthTracked === null || currentMonth !== lastMonthTracked) {
        // If we are in a new month, store the value of the last day of the previous month
        if (lastMonthTracked !== null) {
          historyGrowth.push({
            date, // Last date of the month
            value: Math.round(totalUnits * price), // Investment value based on the last price in that month
          });
        }
        lastMonthTracked = currentMonth;
      }
    }

    // Ensure the last available date in the data is included
    const lastDate = sortedDates[sortedDates.length - 1];
    historyGrowth.push({
      date: lastDate,
      value: Math.round(totalUnits * historicalData[lastDate]), // Value at the last available date
    });

    // Return total units owned, total amount invested, current value, and monthly growth
    return {
      totalUnits,
      totalInvested,
      currentValue:
        totalUnits * historicalData[sortedDates[sortedDates.length - 1]], // Value at the latest date
      historyGrowth, // Monthly growth values
    };
  };

  const handleSubmit = useCallback(
    async (data: InvestmentChoice) => {
      const allHistoryGrowth: { [key: string]: { [key: string]: number } } = {}; // To store merged history growth data

      // Helper function to extract year-month (YYYY-MM) from a date string
      const getYearMonth = (date: string) => date.substring(0, 7);

      const mergeHistoryGrowth = (historyGrowth, ticker) => {
        historyGrowth.forEach(({ date, value }) => {
          const yearMonth = getYearMonth(date);
          if (!allHistoryGrowth[yearMonth]) {
            allHistoryGrowth[yearMonth] = { date: yearMonth }; // Initialize with date
          }
          allHistoryGrowth[yearMonth][ticker] = value; // Add the value for the given ticker
        });
      };

      // Process US Stocks
      if (data.US_STOCK.length !== 0) {
        const param = data.US_STOCK.map((stock) => ({
          name: stock.ticker,
          start_date: startDate,
          end_date: endDate,
        }));
        const usStockHistory = await getHistoryDataStockUs.mutateAsync(param);

        Object.keys(usStockHistory).forEach((ticker) => {
          const history = usStockHistory[ticker];
          const stockData = data.US_STOCK.find(
            (stock) => stock.ticker === ticker
          );
          if (stockData) {
            const { historyGrowth } = calculateDCA(
              history,
              stockData.startInvestment,
              stockData.regularInvestment,
              repeatType
            );

            // Merge the historyGrowth data into the allHistoryGrowth object
            mergeHistoryGrowth(historyGrowth, ticker);
          }
        });
      }

      // Process ID Stocks
      if (data.ID_STOCK.length !== 0) {
        const param = data.ID_STOCK.map((stock) => ({
          name: stock.ticker,
          start_date: startDate,
          end_date: endDate,
        }));
        const idStockHistory = await getHistoryDataStockId.mutateAsync(param);

        Object.keys(idStockHistory).forEach((ticker) => {
          const history = idStockHistory[ticker];
          const stockData = data.ID_STOCK.find(
            (stock) => stock.ticker === ticker
          );
          if (stockData) {
            const { historyGrowth } = calculateDCA(
              history,
              stockData.startInvestment,
              stockData.regularInvestment,
              repeatType
            );

            // Merge the historyGrowth data into the allHistoryGrowth object
            mergeHistoryGrowth(historyGrowth, ticker);
          }
        });
      }
      if (data.CRYPTO.length !== 0) {
        const param = data.CRYPTO.map((stock) => ({
          name: stock.ticker,
          start_date: startDate,
          end_date: endDate,
        }));
        const cryptoHistory = await getHistoryDataCrypto.mutateAsync(param);

        Object.keys(cryptoHistory).forEach((ticker) => {
          const history = cryptoHistory[ticker];
          const cryptoData = data.CRYPTO.find(
            (stock) => stock.ticker === ticker
          );
          if (cryptoData) {
            const { historyGrowth } = calculateDCA(
              history,
              cryptoData.startInvestment,
              cryptoData.regularInvestment,
              repeatType
            );

            // Merge the historyGrowth data into the allHistoryGrowth object
            mergeHistoryGrowth(historyGrowth, ticker);
          }
        });
      }

      if (data.GOLD.length !== 0) {
        const param = data.GOLD.map(() => ({
          start_date: startDate,
          end_date: endDate,
        }));
        const goldHistory = await getHistoryDataGold.mutateAsync(param);
        console.log(goldHistory);
        Object.keys(goldHistory).forEach((ticker) => {
          const history = goldHistory[ticker];
          console.log(history);
          const goldData = data.GOLD.find((stock) => stock.ticker === ticker);
          console.log(goldData);
          if (goldData) {
            const { historyGrowth } = calculateDCA(
              history,
              goldData.startInvestment,
              goldData.regularInvestment,
              repeatType
            );
            console.log(historyGrowth);
            // Merge the historyGrowth data into the allHistoryGrowth object
            mergeHistoryGrowth(historyGrowth, ticker);
          }
        });
      }

      // Convert allHistoryGrowth object into an array for charting
      const chartData = Object.keys(allHistoryGrowth).map((yearMonth) => ({
        date: yearMonth,
        ...allHistoryGrowth[yearMonth],
      }));
      setChartData(chartData);

      // Now you can use the `chartData` for visualizations or state management
    },
    [
      getHistoryDataStockUs,
      startDate,
      endDate,
      repeatType,
      getHistoryDataStockId,
      getHistoryDataCrypto,
      getHistoryDataGold,
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
  };
};
