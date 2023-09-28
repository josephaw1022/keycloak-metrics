import { PrometheusTextModule } from '@metric-exporter/prometheus-text';
import { SqlServerExporterModule } from '@metric-exporter/sql-server-exporter';
import { Module } from '@nestjs/common';
import { KeycloakController } from './keycloak.controller';
import { KeycloakMetricService } from './keycloak-metrics.service';
import { KeycloakMetricServiceToPrometheus } from './keycloak-to-prometheus.service';

@Module({
  imports: [SqlServerExporterModule, PrometheusTextModule],
  providers: [KeycloakMetricService,KeycloakMetricServiceToPrometheus],
  controllers: [KeycloakController],
})
export class KeycloakMetricScraperModule {}
