import { Module } from '@nestjs/common';
import { KeycloakMetricScraperModule } from '@metric-exporter/keycloak-metric-scraper';

@Module({
  imports: [KeycloakMetricScraperModule],
})
export class AppModule {}
