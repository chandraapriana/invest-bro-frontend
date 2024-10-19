import {
  GetHistoryDataGoldParams,
  GetHistoryDataGoldResponses,
  getHistoryDataGoldService,
} from "@/service/getHistoryDataGoldService";

import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export type IUseGetHistoryDataGoldMutation = UseMutationResult<
  GetHistoryDataGoldResponses,
  Error,
  GetHistoryDataGoldParams,
  unknown
>;

export function useGetHistoryDataGoldMutation(): IUseGetHistoryDataGoldMutation {
  const getHistoryDataGoldMutation = useMutation({
    mutationFn: getHistoryDataGoldService,
    mutationKey: ["history-data-gold"],
  });

  return getHistoryDataGoldMutation;
}
