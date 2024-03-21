// import { DynamicModule, Module } from '@nestjs/common';
// import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { DataSourceOptions } from 'typeorm';
// import { ConfigService, ConfigModule, ConfigInt } from '@agency-os/config'; // Adjust path if needed
// import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

// @Module({
//   providers: [ConfigService], // Important to include for configuration access
// })
// export class DbModule {
//   static forRootAsync(): DynamicModule {
//     return {
//       module: DbModule,
//       imports: [
//         TypeOrmModule.forRootAsync({
//           imports: [ConfigModule], // Import ConfigModule for access to config
//           useFactory: (configService: ConfigService) => {
//             const dbConfig = configService.get(
//               'db',
//             ) as ConfigInt.ConfigDatabase;
//             if (typeof dbConfig === 'object' && dbConfig !== null && dbConfig) {
//               let option: TypeOrmModuleOptions = {};
//               if (dbConfig.type === 'aurora-mysql') {
//                 // eslint-disable-next-line no-unused-labels
//                 option = {
//                   type: 'mysql',
//                   host: dbConfig.host,
//                   port: dbConfig.port,
//                   username: dbConfig.username,
//                   password: dbConfig.password,
//                   database: dbConfig.name,
//                   entities: [], // You'll provide entities later
//                   synchronize: true,
//                 };
//               }
//               return option;
//               // const options: Partial<BaseDataSourceOptions> = {
//               //   type: dbConfig.type, // Common optionshost: dbConfig.host,
//               //   host: dbConfig.host,
//               //   port: dbConfig.port,
//               //   username: dbConfig.username,
//               //   password: dbConfig.password,
//               //   database: dbConfig.name,
//               //   entities: [], // You'll provide entities later
//               //   synchronize: true,
//               // };
//               return option;

//               // return {
//               //   type: this.getType(dbConfig.type),
//               //   host: dbConfig.host,
//               //   port: dbConfig.port,
//               //   username: dbConfig.username,
//               //   password: dbConfig.password,
//               //   database: dbConfig.name,
//               //   entities: [], // You'll provide entities later
//               //   synchronize: true,
//               // };
//             } else {
//               throw new Error('Invalid configuration for database');
//             }
//           },
//           inject: [ConfigService],
//         }),
//       ],
//     };
//   }

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   static forFeature(entities: any): DynamicModule {
//     return {
//       module: DbModule,
//       imports: [TypeOrmModule.forFeature(entities)],
//     };
//   }
// }
