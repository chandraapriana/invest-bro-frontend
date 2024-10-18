/* eslint-disable react-hooks/rules-of-hooks */

import type {
  AxiosResponse,
  RawAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import axios from "axios";

/**
 * Helper for axios which automatically returns the JSON.
 *
 * @param config Base request config for axios.
 */

export interface IfetcherParams extends RawAxiosRequestConfig {
  version?: string;
}

export default async function fetcher({
  url,
  data,
  method,
  headers,
  ...config
}: IfetcherParams) {
  try {
    const res: AxiosResponse = await axios({
      baseURL: process.env.NEXT_PUBLIC_ENDPOINT_URL,
      data,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...(headers as RawAxiosRequestHeaders),
      },
      method,
      url,
      ...config,
    });

    const response = res.data;
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
