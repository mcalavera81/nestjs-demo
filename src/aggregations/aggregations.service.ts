import { Injectable } from '@nestjs/common';
import { AssetsDto, MetricsDto } from '../metrics/metrics-input.dto';
import { MetricsService } from '../metrics/metrics.service';
import { GetAveragesDto } from './dto/get-averages.dto';
import { Period } from './dto/get-averages.dto';
import { array_chunks_processor } from '../utils/arrayUtils';

@Injectable()
export class AggregationsService {
  constructor(private metricsService: MetricsService) {}

  async calculateAverages(getAveragesDto: GetAveragesDto): Promise<AssetsDto> {
    const { period } = getAveragesDto;
    const assets: AssetsDto = await this.metricsService.getMetrics();

    const assetsMetricsAveraged: AssetsDto = Object.fromEntries(
      Object.entries(assets).map(([asset_id, assetMetrics]) => {
        const assetMetricsAveraged = this.assetMetricsAveraged(
          assetMetrics,
          period,
        );
        return [asset_id, assetMetricsAveraged];
      }),
    );
    return assetsMetricsAveraged;
  }

  private assetMetricsAveraged(
    assetMetrics: MetricsDto,
    period: Period,
  ): MetricsDto {
    return <MetricsDto>Object.fromEntries(
      Object.keys(assetMetrics).map((metric_id) => {
        let averages;
        if (metric_id === 'time') {
          averages = this.chunks_timestamp(assetMetrics[metric_id], period);
        } else {
          averages = this.chunks_average(assetMetrics[metric_id], period);
        }
        return [metric_id, averages];
      }),
    );
  }

  private chunks_timestamp(array: string[], chunk_size: Period): string[] {
    const chunk_timestamp = (chunk: string[]) => {
      return chunk[0];
    };
    const averages = array_chunks_processor(array, chunk_size, chunk_timestamp);
    return averages;
  }

  private chunks_average(
    array: (number | null)[],
    chunk_size: Period,
  ): number[] {
    const chunk_averager = (chunk: (number | null)[]) => {
      const validNumbers = chunk.filter((_): _ is number => !isNaN(Number(_)));
      return validNumbers.reduce((a, b) => a + b) / validNumbers.length;
    };
    const averages = array_chunks_processor<number | null, number>(
      array,
      chunk_size,
      chunk_averager,
    );

    return averages;
  }
}
