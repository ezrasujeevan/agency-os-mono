import {
  EnvironmentVariables,
  IEnvironmentVariables,
  validateUtil,
} from '@agency-os/common';
import { registerAs } from '@nestjs/config';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { env } from 'process';

export interface Igrpc_user extends IEnvironmentVariables {
  db_url?: string;
  db_host: string;
  db_port: number;
  db_username: string;
  db_password: string;
  db_name: string;
  db_schema: string;
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
  DB_NAME: string;

  @IsString()
  DB_SCHEMA: string;
}

export default registerAs('agency-os-config-grpc-user', (): Igrpc_user => {
  validateUtil(process.env, MS_GRPC_ENV);
  return {
    Node_env: env.NODE_ENV || 'DEV',
    host: env.HOST || 'localhost',
    port: parseInt(env.PORT || '5000'),
    db_host: env.DB_HOST || 'localhost',
    db_port: parseInt(env.DB_PORT || '5432'),
    db_username: env.DB_USERNAME || 'postgres',
    db_password: env.DB_PASSWORD || '',
    db_name: env.DB_NAME || 'postgres',
    db_schema: env.DB_SCHEMA || 'public',
  };
});
