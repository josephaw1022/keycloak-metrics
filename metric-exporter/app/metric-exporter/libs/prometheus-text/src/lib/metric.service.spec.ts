import { Test, TestingModule } from '@nestjs/testing';
import { MetricService } from './metric.service';
import { MetricGroup, Label, ValueLine } from './metric.interface';

describe('MetricService', () => {
  let service: MetricService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricService],
    }).compile();

    service = module.get<MetricService>(MetricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMetricLines', () => {
    it('should create correct metric lines', () => {
      const metricGroup: MetricGroup = {
        name: 'test_metric',
        helpLine: { description: 'This is a test metric' },
        typeLine: { type: 'gauge' },
        valueLines: [
          {
            endValue: 1,
            labels: [{ key: 'label1', value: 'value1' }]
          }
        ]
      };

      const expectedLines =
        `# HELP test_metric This is a test metric\n` +
        `# TYPE test_metric gauge\n` +
        `test_metric{label1="value1"} 1`;

      expect(service.createMetricLines(metricGroup)).toBe(expectedLines);
    });

    it('should create correct metric lines without labels', () => {
      const metricGroup: MetricGroup = {
        name: 'test_metric',
        helpLine: { description: 'This is a test metric' },
        typeLine: { type: 'gauge' },
        valueLines: [{ endValue: 1 }]
      };

      const expectedLines =
        `# HELP test_metric This is a test metric\n` +
        `# TYPE test_metric gauge\n` +
        `test_metric 1`;

      expect(service.createMetricLines(metricGroup)).toBe(expectedLines);
    });
  });
});
