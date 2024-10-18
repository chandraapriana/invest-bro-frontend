import { TickerList } from "@/interface/ticker";
import fetcher from "@/utils/api/fetcher";

export type GetCryptoTickerListResponses = TickerList;

export const getCryptoTickerListService =
  (): Promise<GetCryptoTickerListResponses> => {
    return fetcher({
      method: "GET",
      url: `/crypto/ticker-list`,
    });
  };
