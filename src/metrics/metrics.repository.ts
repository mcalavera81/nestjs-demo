import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AssetsDto } from './metrics-input.dto';

@Injectable()
export class MetricsRepository {
  constructor(private configService: ConfigService) {}

  async fetchRawMetrics(): Promise<AssetsDto> {
    const metricsProvider = this.configService.get('METRICS_PROVIDER');
    if (!metricsProvider) throw new Error();
    const results = await axios.get(metricsProvider);

    const data: AssetsDto = results.data;
    return data;
  }
}
