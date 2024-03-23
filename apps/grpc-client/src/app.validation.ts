import {
  EnvironmentVariables,
  IEnvironmentVariables,
  validateUtil,
} from '@agency-os/common';
import { registerAs } from '@nestjs/config';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

interface Igrpc_user extends IEnvironmentVariables {
  db_url: string;
  db_host: string;
  db_port: string;
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
    db_url: process.env.DB_URL,
    db_host: process.env.DB_HOST,
    db_port: parseInt(process.env.DB_PORT),
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    db_schema: process.env.DB_SCHEMA,
  };
});
