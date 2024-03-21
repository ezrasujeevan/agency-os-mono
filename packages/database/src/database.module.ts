/* eslint-disable prefer-const */
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions, DatabaseType } from 'typeorm';
import { ConfigService, ConfigModule, ConfigInt } from '@agency-os/config'; // Adjust path if needed
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Module({
  providers: [ConfigService], // Important to include for configuration access
})
export class DatabaseModule {
  static forRootAsync(type: DatabaseType): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule], // Import ConfigModule for access to config
          useFactory: async (configService: ConfigService) => {
            const optionn: Partial<DataSourceOptions> = {
              url: configService.getDB('url'),
              host: configService.getDB('host'),
              port: +configService.getDB('port'), // Convert port to number
              username: configService.getDB('username'),
              password: configService.getDB('password'),
              database: configService.getDB('name'),
              entities: [], // Replace with your entities
              synchronize: true, // Adjust as needed
            };
            let asd: TypeOrmModuleOptions = { ...optionn };
            switch (type) {
              case 'mysql':
                return { ...asd, type: 'mysql' };
                break;
              case 'postgres':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'cockroachdb':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'sap':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'mariadb':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'sqlite':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'cordova':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'react-native':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'nativescript':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'sqljs':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'oracle':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'mssql':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'mongodb':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'aurora-mysql':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'aurora-postgres':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'expo':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'better-sqlite3':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'capacitor':
                asd = { ...asd, type: 'mysql' };
                break;
              case 'spanner':
                asd = { ...asd, type: 'mysql' };
                break;
            }

            return asd;
          },
          inject: [ConfigService],
        }),
      ],
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static forFeature(entities: any): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forFeature(entities)],
    };
  }
}
