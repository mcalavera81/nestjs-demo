import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AggregationsModule } from './aggregations/aggregations.module';
import { MetricsModule } from './metrics/metrics.module';
import * as Joi from 'joi';

@Module({
  imports: [
    AggregationsModule,
    MetricsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SERVER_PORT: Joi.number().required(),
        METRICS_PROVIDER: Joi.string().uri().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
