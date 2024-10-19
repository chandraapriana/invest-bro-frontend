import {
  AssetHistoryParam,
  AssetHistoryResponse,
} from "@/interface/assetHistory";

import fetcher from "@/utils/api/fetcher";

export type GetHistoryDataStockUsResponses = AssetHistoryResponse;
export type GetHistoryDataStockUsParams = AssetHistoryParam;

export const getHistoryDataStockUsService = (
  param: GetHistoryDataStockUsParams
): Promise<GetHistoryDataStockUsResponses> => {
  return fetcher({
    method: "POST",
    data: param,
    url: `/stock/us/`,
  });
};
