import { EnvironmentVariables, validateUtil } from '@agency-os/common';
import { registerAs } from '@nestjs/config';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export const CONFIG_DB = 'agency-os-db-grpc-client';

export interface Igrpc_db {
  db: {
    url?: string;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    schema: string;
  };
}

class MS_GRPC_ENV extends EnvironmentVariables {
  //postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
  @IsString()
  @IsOptional()
  DB_URL: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @IsString()
  DB_HOST: string;

  @IsString()
  TCP_COMPANY_SERVICE_DB: string;

  @IsString()
  DB_SCHEMA: string;
}

export const validateDB = registerAs(CONFIG_DB, (): Igrpc_db => {
  const configs: MS_GRPC_ENV = validateUtil(process.env, MS_GRPC_ENV)!;
  const config: Igrpc_db = {
    db: {
      url: configs.DB_URL,
      host: configs.DB_HOST,
      port: configs.DB_PORT,
      username: configs.DB_USERNAME,
      password: configs.DB_PASSWORD,
      name: configs.TCP_COMPANY_SERVICE_DB,
      schema: configs.DB_SCHEMA,
    },
  };
  return config;
});
