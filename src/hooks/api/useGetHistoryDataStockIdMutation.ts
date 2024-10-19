import {
  GetHistoryDataStockIdParam,
  GetHistoryDataStockIdResponses,
  getHistoryDataStockIdService,
} from "@/service/getHistoryDataStockIdService";

import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export type IUseGetHistoryDataStockIdMutation = UseMutationResult<
  GetHistoryDataStockIdResponses,
  Error,
  GetHistoryDataStockIdParam,
  unknown
>;

export function useGetHistoryDataStockIdMutation(): IUseGetHistoryDataStockIdMutation {
  const getHistoryDataStockIdMutation = useMutation({
    mutationFn: getHistoryDataStockIdService,
    mutationKey: ["history-data-stock-id"],
  });

  return getHistoryDataStockIdMutation;
}
