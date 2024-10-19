import {
  GetHistoryDataStockUsParams,
  GetHistoryDataStockUsResponses,
  getHistoryDataStockUsService,
} from "@/service/getHistoryDataStockUsService";

import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export type IUseGetHistoryDataStockUsMutation = UseMutationResult<
  GetHistoryDataStockUsResponses,
  Error,
  GetHistoryDataStockUsParams,
  unknown
>;

export function useGetHistoryDataStockUsMutation(): IUseGetHistoryDataStockUsMutation {
  const getHistoryDataStockUsMutation = useMutation({
    mutationFn: getHistoryDataStockUsService,
    mutationKey: ["history-data-stock-id"],
  });

  return getHistoryDataStockUsMutation;
}
