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
  TCP_DELIVERY_SERVICE_NAME: string;

  @IsUrl({ require_tld: false })
  TCP_DELIVERY_SERVICE_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  TCP_DELIVERY_SERVICE_PORT: number;
}

export interface Igrpc_app {
  env: string;
  app: {
    name: string;
    host: string;
    port: number;
  };
}

export const validate_app = registerAs(CONFIG_APP, (): Igrpc_app => {
  const configs: AppEnvironmentVariables = validateUtil(
    process.env,
    AppEnvironmentVariables,
  );
  const config: Igrpc_app = {
    env: configs.NODE_ENV,
    app: {
      name: configs.TCP_DELIVERY_SERVICE_NAME,
      host: configs.TCP_DELIVERY_SERVICE_HOST,
      port: configs.TCP_DELIVERY_SERVICE_PORT,
    },
  };
  return config;
});
