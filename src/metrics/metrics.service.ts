import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AssetsDto } from './metrics-input.dto';
import { MetricsRepository } from './metrics.repository';

@Injectable()
export class MetricsService {
  // constructor(private configService: ConfigService) {}
  constructor(private metricsRepository: MetricsRepository) {}
  async getMetrics(): Promise<AssetsDto> {
    try {
      const rawData: AssetsDto = await this.metricsRepository.fetchRawMetrics();
      this.validateInput(rawData);
      return rawData;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  // private async fetchRawMetrics(): Promise<AssetsDto> {
  //   const metricsProvider = this.configService.get('METRICS_PROVIDER');
  //   if (!metricsProvider) throw new Error();
  //   const results = await axios.get(metricsProvider);

  //   const data: AssetsDto = results.data;
  //   return data;
  // }
  private validateInput(data: AssetsDto) {
    for (const asset_id of Object.keys(data)) {
      const asset = data[asset_id];
      const timeSeriesLength = asset.time.length;
      try {
        asset.time.forEach((timeStr) => {
          if (!this.isValidDate(Date.parse(timeStr))) {
            throw new InternalServerErrorException(`Error Date ${timeStr}`);
          }
        });
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }

      for (const metric_id of Object.keys(asset)) {
        if (metric_id !== 'time') {
          const metric = asset[metric_id];
          // console.log(`metric ${metric_id} Length`, metric.length);
          if (metric.length !== timeSeriesLength) {
            throw new InternalServerErrorException();
          }
        }
      }
    }
  }

  private isValidDate(d: any) {
    return !isNaN(d);
  }
}
