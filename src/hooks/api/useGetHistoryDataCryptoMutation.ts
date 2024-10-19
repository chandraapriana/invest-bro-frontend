import {
  GetHistoryDataCryptoParams,
  GetHistoryDataCryptoResponses,
  getHistoryDataCryptoService,
} from "@/service/getHistoryDataCryptoService";

import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export type IUseGetHistoryDataCryptoMutation = UseMutationResult<
  GetHistoryDataCryptoResponses,
  Error,
  GetHistoryDataCryptoParams,
  unknown
>;

export function useGetHistoryDataCryptoMutation(): IUseGetHistoryDataCryptoMutation {
  const getHistoryDataCryptoMutation = useMutation({
    mutationFn: getHistoryDataCryptoService,
    mutationKey: ["history-data-crypto"],
  });

  return getHistoryDataCryptoMutation;
}
