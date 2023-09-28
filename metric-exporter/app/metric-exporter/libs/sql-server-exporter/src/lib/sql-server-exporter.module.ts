import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

interface Env {
  [key: string]: string | undefined;
}

const env: Env = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      name: env['KEYCLOAK_DB_NAME'] || 'key-cloak-db',
      host: env['KEYCLOAK_DB_HOST'] || 'localhost',
      port: +env['KEYCLOAK_DB_PORT']! || 1433,
      username: env['KEYCLOAK_DB_USER'] || 'sa',
      password: env['KEYCLOAK_DB_PASS'] || 'RunningMan323#',
      database: env['KEYCLOAK_DB_DATABASE'] || 'keycloak',
      synchronize: false,
      options: { 
        trustServerCertificate: true,
      }
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      name: env['MASTER_DB_NAME'] || 'master-db',
      host: env['MASTER_DB_HOST'] || 'localhost',
      port: +env['MASTER_DB_PORT']! || 1433,
      username: env['MASTER_DB_USER'] || 'sa',
      password: env['MASTER_DB_PASS'] || 'RunningMan323#',
      database: env['MASTER_DB_DATABASE'] || 'master',
      synchronize: false,
      options: { 
        trustServerCertificate: true,
      }
    }),
  ],
  exports: [TypeOrmModule],
})
export class SqlServerExporterModule {}