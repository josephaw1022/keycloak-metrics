import { Controller, Get, Header } from '@nestjs/common';
import { KeycloakMetricServiceToPrometheus } from './keycloak-to-prometheus.service';

@Controller('keycloak')
export class KeycloakController {
  public constructor(
    private readonly keycloakToPrometheusService: KeycloakMetricServiceToPrometheus
  ) {}

  @Get('/metrics')
  @Header('Content-Type', 'text/plain; charset=utf-8')
  @Header('Cache-Control', 'no-cache')
  public async getMetrics() {
    return await this.keycloakToPrometheusService.createPrometheusMetrics();
  }

}
