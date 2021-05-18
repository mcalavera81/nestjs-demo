import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AggregationsService } from './aggregations.service';
import { GetAveragesDto } from './dto/get-averages.dto';

@Controller('aggregations')
export class AggregationsController {
  constructor(private aggregationsService: AggregationsService) {}

  @Post()
  @HttpCode(200)
  getMetricsAverage(@Body(ValidationPipe) getAveragesDto: GetAveragesDto) {
    return this.aggregationsService.calculateAverages(getAveragesDto);
  }
}
