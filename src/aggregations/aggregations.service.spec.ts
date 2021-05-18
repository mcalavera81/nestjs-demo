import { Test, TestingModule } from '@nestjs/testing';
import { MetricsRepository } from '../metrics/metrics.repository';
import { MetricsService } from '../metrics/metrics.service';
import { AggregationsService } from './aggregations.service';
import { Period } from './dto/get-averages.dto';

const mockMetricRepository = () => ({
  fetchRawMetrics: jest.fn(),
});

describe('AggregationsService', () => {
  let service: AggregationsService;
  let metricsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AggregationsService,
        MetricsService,
        { provide: MetricsRepository, useFactory: mockMetricRepository },
      ],
    }).compile();

    service = module.get<AggregationsService>(AggregationsService);
    metricsRepository = module.get<MetricsRepository>(MetricsRepository);
  });

  it('should be defined', async () => {
    metricsRepository.fetchRawMetrics.mockReturnValue({
      asset1: {
        metric1: [2, 4, 2, 4, 2, 4, 2, 4, 2, 4],
        metric2: [10, 0, 10, 0, 10, 0, 10, 0, 10, 0],
        time: [
          '2021-05-17T06:00:00.000Z',
          '2021-05-17T06:01:00.000Z',
          '2021-05-17T06:02:00.000Z',
          '2021-05-17T06:03:00.000Z',
          '2021-05-17T06:04:00.000Z',
          '2021-05-17T06:05:00.000Z',
          '2021-05-17T06:06:00.000Z',
          '2021-05-17T06:07:00.000Z',
          '2021-05-17T06:08:00.000Z',
          '2021-05-17T06:09:00.000Z',
        ],
      },
    });
    expect(service).toBeDefined();
    const averages = await service.calculateAverages({ period: Period.TEN });
    const asset1Averages = averages['asset1'];
    expect(asset1Averages['time']).toStrictEqual(['2021-05-17T06:00:00.000Z']);
    expect(asset1Averages['metric1']).toStrictEqual([3]);
    expect(asset1Averages['metric2']).toStrictEqual([5]);
  });
});
