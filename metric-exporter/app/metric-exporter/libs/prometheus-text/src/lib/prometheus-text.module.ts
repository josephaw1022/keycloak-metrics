import { Module } from '@nestjs/common';
import { MetricService } from './metric.service';

@Module({
  controllers: [],
  providers: [MetricService],
  exports: [MetricService],
})
export class PrometheusTextModule {}
