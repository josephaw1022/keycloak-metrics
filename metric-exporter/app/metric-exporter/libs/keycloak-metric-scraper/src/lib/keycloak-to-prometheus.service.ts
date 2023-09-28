import { Injectable } from '@nestjs/common';
import {
  MetricService,
  MetricGroup,
  ValueLine,
} from '@metric-exporter/prometheus-text';
import { Logger } from '@nestjs/common';
import { KeycloakMetricService } from './keycloak-metrics.service';

@Injectable()
export class KeycloakMetricServiceToPrometheus {

  private readonly logger = new Logger(KeycloakMetricServiceToPrometheus.name)

  constructor(
    private readonly metricService: MetricService,
    private readonly keycloakMetricService: KeycloakMetricService
  ) {}

  private createMetricGroup(
    name: string,
    description: string,
    type: string,
    valueLines: ValueLine[]
  ): string {
    const metricGroup: MetricGroup = {
      name,
      helpLine: { description },
      typeLine: { type },
      valueLines,
    };
    return this.metricService.createMetricLines(metricGroup);
  }

  public async createPrometheusMetrics(): Promise<string> {
    let prometheusString = ``;

    try {
      prometheusString += this.createMetricGroup(
        'keycloak_rows_per_table',
        'Number of rows per table in Keycloak DB',
        'gauge',
        (await this.keycloakMetricService.rowsPerTable()).map((table) => ({
          labels: [{ key: 'table', value: table.tableName }],
          endValue: table.rows,
        }))
      );
    } catch (error) {
      this.logger.error('Error creating rows_per_table metric group:', error);
    }

    try {
      prometheusString += this.createMetricGroup(
        'keycloak_user_attributes',
        'Attributes of users in Keycloak',
        'gauge',
        (await this.keycloakMetricService.fetchUsersAndTheirAttributes()).map(
          (attr) => ({
            labels: [
              { key: 'user_id', value: attr.userID },
              { key: 'username', value: attr.username },
              { key: 'attribute_name', value: attr.attributeName },
            ],
            endValue: attr.value,
          })
        )
      );
    } catch (error) {
      this.logger.error('Error creating user_attributes metric group:', error);
    }

    try {
      prometheusString += this.createMetricGroup(
        'keycloak_clients',
        'Clients registered in Keycloak',
        'gauge',
        (await this.keycloakMetricService.fetchClients()).map((client) => ({
          labels: [{ key: 'client_id', value: client.clientId }],
          endValue: 1, // indicating the presence of the client
        }))
      );
    } catch (error) {
      this.logger.error('Error creating clients metric group:', error);
    }

    try {
      prometheusString += this.createMetricGroup(
        'keycloak_client_sessions',
        'Client sessions in Keycloak',
        'gauge',
        (await this.keycloakMetricService.fetchClientSessions()).map(
          (session) => ({
            labels: [
              { key: 'client_id', value: session.clientId },
              { key: 'user_id', value: session.userId },
            ],
            endValue: 1, // indicating the presence of the client session
          })
        )
      );
    } catch (error) {
      this.logger.error('Error creating client_sessions metric group:', error);
    }

    // Uncomment the below ones when you implement the respective methods in KeycloakMetricService

    // try {
    //   prometheusString += this.createMetricGroup(
    //     'keycloak_role_mappings',
    //     'Role mappings in Keycloak',
    //     'gauge',
    //     (await this.keycloakMetricService.fetchRoleMappings()).map((mapping) => ({
    //       labels: [
    //         { key: 'user_id', value: mapping.userId },
    //         { key: 'role_id', value: mapping.roleId },
    //         { key: 'client_id', value: mapping.clientId },
    //       ],
    //       endValue: 1, // indicating the presence of the role mapping
    //     }))
    //   );
    // } catch (error) {
    //   this.logger.error('Error creating role_mappings metric group:', error);
    // }

    // try {
    //   prometheusString += this.createMetricGroup(
    //     'keycloak_client_default_roles',
    //     'Default roles of clients in Keycloak',
    //     'gauge',
    //     (await this.keycloakMetricService.fetchClientDefaultRoles()).map((role) => ({
    //       labels: [
    //         { key: 'client_id', value: role.clientId },
    //         { key: 'role_name', value: role.roleName },
    //       ],
    //       endValue: 1, // indicating the presence of the default role for the client
    //     }))
    //   );
    // } catch (error) {
    //   this.logger.error('Error creating client_default_roles metric group:', error);
    // }

    return prometheusString.trim();
  }
}
