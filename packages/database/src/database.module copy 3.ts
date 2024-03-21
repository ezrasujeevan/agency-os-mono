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
//           useFactory: async (configService: ConfigService) => {
//             const configs = (await configService.get()) as ConfigInt.ConfigData;
//             return {
//               type: configs.db.type,
//               host: configs.db.host,
//               port: configs.db.port,
//               username: configs.db.username,
//               password: configs.db.password,
//               database: configs.db.name,
//               entities: [], // You'll provide entities later
//               synchronize: true,
//             };
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
