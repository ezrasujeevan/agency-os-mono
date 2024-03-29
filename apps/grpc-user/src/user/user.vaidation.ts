// import {
//   EnvironmentVariables,
//   IEnvironmentVariables,
//   validateUtil,
// } from '@agency-os/common';
// import { registerAs } from '@nestjs/config';
// import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
// import { env } from 'process';

// export const CONFIG_DB = 'agency-os-config-db';

// export interface Igrpc_auth extends IEnvironmentVariables {
//   auth: {
//     secret: string;
//   };
// }

// class MS_GRPC_DB extends EnvironmentVariables {
//   //postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
//   @IsString()
//   @IsOptional()
//   DB_URL: string;

//   @IsString()
//   DB_USERNAME: string;

//   @IsString()
//   DB_PASSWORD: string;

//   @IsNumber()
//   @Min(0)
//   @Max(65535)
//   DB_PORT: number;

//   @IsString()
//   DB_HOST: string;

//   @IsString()
//   DB_NAME: string;

//   @IsString()
//   DB_SCHEMA: string;
// }

// export const validate_db = registerAs(CONFIG_DB, (): Igrpc_auth => {
//   validateUtil(process.env, MS_GRPC_DB);
//   const config: Igrpc_auth = {
//     auth: {
//       secret: env.JWT_SECRET || '',
//     },
//     Node_env: '',
//     host: '',
//     port: 0,
//   };
//   return config;
// });
