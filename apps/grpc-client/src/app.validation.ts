import { EnvironmentVariables, validateUtil } from '@agency-os/common';
import { registerAs } from '@nestjs/config';
import { IsEnum, IsNumber, IsString, IsUrl, Max, Min } from 'class-validator';

export const CONFIG_APP = 'agency-os-config-app';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class AppEnvironmentVariables extends EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  GRPC_CLIENT_NAME: string;

  @IsUrl({ require_tld: false })
  GRPC_CLIENT_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  GRPC_CLIENT_PORT: number;
}

export interface Igrpc_app {
  env: Environment;
  app: {
    name: string;
    host: string;
    port: number;
  };
}

export const validateApp = registerAs(CONFIG_APP, (): Igrpc_app => {
  const configs: AppEnvironmentVariables = validateUtil(
    process.env,
    AppEnvironmentVariables,
  );
  const config: Igrpc_app = {
    env: configs.NODE_ENV,
    app: {
      name: configs.GRPC_CLIENT_NAME,
      host: configs.GRPC_CLIENT_HOST,
      port: configs.GRPC_CLIENT_PORT,
    },
  };
  return config;
});
