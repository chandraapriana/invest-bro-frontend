import {
  AssetHistoryParam,
  AssetHistoryResponse,
} from "@/interface/assetHistory";

import fetcher from "@/utils/api/fetcher";

export type GetHistoryDataGoldResponses = AssetHistoryResponse;
export type GetHistoryDataGoldParams = AssetHistoryParam;

export const getHistoryDataGoldService = (
  param: GetHistoryDataGoldParams
): Promise<GetHistoryDataGoldResponses> => {
  return fetcher({
    method: "POST",
    data: param,
    url: `/gold/`,
  });
};
