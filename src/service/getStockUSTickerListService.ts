import { TickerList } from "@/interface/ticker";
import fetcher from "@/utils/api/fetcher";

export type GetStockUSTickerListResponses = TickerList;

export const getStockUSTickerListService =
  (): Promise<GetStockUSTickerListResponses> => {
    return fetcher({
      method: "GET",
      url: `/stock/us/ticker-list`,
    });
  };
