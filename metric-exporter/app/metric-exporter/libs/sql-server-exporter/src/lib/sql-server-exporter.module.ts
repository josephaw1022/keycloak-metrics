import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      name: 'key-cloak-db',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'RunningMan323#',
      database: 'keycloak',
      synchronize: false,
      options: { 
        trustServerCertificate: true,
      }
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      name: 'master-db',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'RunningMan323#',
      database: 'master',
      synchronize: false,
      options: { 
        trustServerCertificate: true,
      }
    }),
  ],
  exports: [TypeOrmModule],
})
export class SqlServerExporterModule {}
