import {
  GetStockUSTickerListResponses,
  getStockUSTickerListService,
} from "@/service/getStockUSTickerListService";

import { useQuery, UseQueryResult } from "@tanstack/react-query";

export type IUseGetStockUSTickerListQuery = UseQueryResult<
  GetStockUSTickerListResponses,
  Error
>;

export const KEY_GET_STOCK_US_TICKER_LIST = "STOCK_US_TICKER_LIST";

export function useGetStockUSTickerListQuery(): IUseGetStockUSTickerListQuery {
  return useQuery({
    queryKey: [KEY_GET_STOCK_US_TICKER_LIST],
    queryFn: getStockUSTickerListService,
  });
}
