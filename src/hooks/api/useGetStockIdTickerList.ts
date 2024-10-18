import {
  GetStockIdTickerListResponses,
  getStockIdTickerListService,
} from "@/service/getStockIdTickerListService";

import { useQuery, UseQueryResult } from "@tanstack/react-query";

export type IUseGetStockIdTickerListQuery = UseQueryResult<
  GetStockIdTickerListResponses,
  Error
>;

export const KEY_GET_STOCK_ID_TICKER_LIST = "STOCK_ID_TICKER_LIST";

export function useGetStockIdTickerListQuery(): IUseGetStockIdTickerListQuery {
  return useQuery({
    queryKey: [KEY_GET_STOCK_ID_TICKER_LIST],
    queryFn: getStockIdTickerListService,
  });
}
