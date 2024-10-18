import {
  GetCryptoTickerListResponses,
  getCryptoTickerListService,
} from "@/service/getCryptoTickerListService";

import { useQuery, UseQueryResult } from "@tanstack/react-query";

export type IUseGetCryptoTickerListQuery = UseQueryResult<
  GetCryptoTickerListResponses,
  Error
>;

export const KEY_GET_CRYPTO_TICKER_LIST = "CRYPTO_TICKER_LIST";

export function useGetCryptoTickerListQuery(): IUseGetCryptoTickerListQuery {
  return useQuery({
    queryKey: [KEY_GET_CRYPTO_TICKER_LIST],
    queryFn: getCryptoTickerListService,
  });
}
