export interface AssetsDto {
  [asset_id: string]: MetricsDto;
}

export type MetricsDto = {
  [metric_id: string]: (number | null)[];
} & { time: string[] };
