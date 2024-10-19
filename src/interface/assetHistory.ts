export interface AssetHistoryParamItem {
  name?: string;
  period?: string;
  start_date?: string;
  end_date?: string;
}

export type AssetHistoryParam = AssetHistoryParamItem[];

export interface AssetHistoryResponse {
  [assetName: string]: {
    [date: string]: number;
  };
}
