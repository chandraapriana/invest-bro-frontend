import { TickerList } from "@/interface/ticker";
import fetcher from "@/utils/api/fetcher";

export type GetStockIdTickerListResponses = TickerList;

export const getStockIdTickerListService =
  (): Promise<GetStockIdTickerListResponses> => {
    return fetcher({
      method: "GET",
      url: `/stock/id/ticker-list`,
    });
  };
