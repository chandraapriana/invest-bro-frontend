import {
  AssetHistoryParam,
  AssetHistoryResponse,
} from "@/interface/assetHistory";

import fetcher from "@/utils/api/fetcher";

export type GetHistoryDataStockIdResponses = AssetHistoryResponse;
export type GetHistoryDataStockIdParam = AssetHistoryParam;

export const getHistoryDataStockIdService = (
  param: GetHistoryDataStockIdParam
): Promise<GetHistoryDataStockIdResponses> => {
  return fetcher({
    method: "POST",
    data: param,
    url: `/stock/id/`,
  });
};
