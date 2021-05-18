import { Module } from '@nestjs/common';
import { MetricsRepository } from './metrics.repository';
import { MetricsService } from './metrics.service';

@Module({
  providers: [MetricsService, MetricsRepository],
  exports: [MetricsService],
})
export class MetricsModule {}
