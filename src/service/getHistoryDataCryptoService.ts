import {
  AssetHistoryParam,
  AssetHistoryResponse,
} from "@/interface/assetHistory";

import fetcher from "@/utils/api/fetcher";

export type GetHistoryDataCryptoResponses = AssetHistoryResponse;
export type GetHistoryDataCryptoParams = AssetHistoryParam;

export const getHistoryDataCryptoService = (
  param: GetHistoryDataCryptoParams
): Promise<GetHistoryDataCryptoResponses> => {
  return fetcher({
    method: "POST",
    data: param,
    url: `/crypto/`,
  });
};
