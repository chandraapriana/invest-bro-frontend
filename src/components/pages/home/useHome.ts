import InvestmentChoice from "@/components/molecules/home/InvestmentChoice";
import {
  IUseGetCryptoTickerListQuery,
  useGetCryptoTickerListQuery,
} from "@/hooks/api/useGetCryptoTickerListQuery";
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
  handleSubmit: (invetmentChoice: InvestmentChoice) => void;
}

export const useHome = () => {
  const getStockUSTickerListQuery = useGetStockUSTickerListQuery();
  const getStockIDTickerListQuery = useGetStockIdTickerListQuery();
  const getCryptoTickerListQuery = useGetCryptoTickerListQuery();
  const getHistoryDataStockUs = useGetHistoryDataStockUsMutation();
  const getHistoryDataStockId = useGetHistoryDataStockIdMutation();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [repeatType, setRepeatType] = useState("monthly");

  const handleStartDate = useCallback((date: string) => {
    setStartDate(date);
  }, []);

  const handleEndDate = useCallback((date: string) => {
    setEndDate(date);
  }, []);

  const handleRepeatType = useCallback((type: string) => {
    setRepeatType(type);
  }, []);

  const handleSubmit = useCallback(
    (data: InvestmentChoice) => {
      if (data.US_STOCK.length !== 0) {
        const param = data.US_STOCK.map((data) => ({
          name: data.ticker,
          start_date: startDate,
          end_date: endDate,
        }));
        getHistoryDataStockUs.mutateAsync(param);
      }

      if (data.ID_STOCK.length !== 0) {
        const param = data.ID_STOCK.map((data) => ({
          name: data.ticker,
          start_date: startDate,
          end_date: endDate,
        }));
        getHistoryDataStockId.mutateAsync(param);
      }
    },
    [startDate, endDate, repeatType]
  );

  return {
    getStockUSTickerListQuery,
    getStockIDTickerListQuery,
    getCryptoTickerListQuery,
    handleEndDate,
    handleStartDate,
    handleRepeatType,
    handleSubmit,
  };
};
