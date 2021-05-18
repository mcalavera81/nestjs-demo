import { Module } from '@nestjs/common';
import { MetricsModule } from '../metrics/metrics.module';
import { AggregationsController } from './aggregations.controller';
import { AggregationsService } from './aggregations.service';

@Module({
  imports: [MetricsModule],
  controllers: [AggregationsController],
  providers: [AggregationsService],
})
export class AggregationsModule {}
