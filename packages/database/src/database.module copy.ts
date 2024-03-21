// import { Global, Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@agency-os/config';
// import { DatabaseConfig } from './database.interface';
// import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { ConfigDatabase } from '@agency-os/config/dist/config.interface';
// @Global()
// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => {
//         return DatabaseModule.getConnectionOptions(configService);
//       },
//       inject: [ConfigService],
//     }),
//   ],
//   controllers: [],
//   providers: [],
//   exports: [],
// })
// export class DatabaseModule {
//   private static getConnectionOptions(
//     config: ConfigService,
//   ): TypeOrmModuleOptions {
//     const dbData: ConfigDatabase = config.get().db;
//     if (!dbData) {
//       throw Error('');
//     }
//     let connectionOptions;
//     switch (dbData.type) {
//       case 'postgres':
//         connectionOptions = this.getConnectionOptionsPostgres(dbData);
//         break;
//       default:
//         connectionOptions = this.getConnectionOptionsPostgres(dbData);
//     }
//     return {
//       ...connectionOptions,
//       synchronize: true,
//       logging: true,
//     };
//   }

//   private static getConnectionOptionsPostgres(
//     dbData: ConfigDatabase,
//   ): TypeOrmModuleOptions {
//     return {
//       type: 'postgres',
//       // url: dbData.url,
//       host: dbData.host,
//       port: dbData.port,
//       username: dbData.username,
//       password: dbData.password,
//       database: dbData.name,
//     };
//   }

//   // public static forRoot() {
//   //   return {
//   //     module: DatabaseModule,
//   //     imports: [
//   //       TypeOrmModule.forRootAsync({
//   //         imports: [ConfigModule],
//   //         useFactory: (configService: ConfigService) => {
//   //           return DatabaseModule.getConnectionOptions(configService, dbConfig);
//   //         },
//   //         inject: [ConfigService],
//   //       }),
//   //     ],
//   //     controllers: [],
//   //     providers: [],
//   //     exports: [],
//   //   };
//   // }
// }
