import { EnvironmentVariables, validateUtil } from '@agency-os/common';
import { registerAs } from '@nestjs/config';
import { IsEnum, IsNumber, IsUrl, Max, Min } from 'class-validator';

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

  @IsUrl({ require_tld: false })
  HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;
}

export interface Igrpc_app {
  env: Environment;
  app: {
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
      host: configs.HOST,
      port: configs.PORT,
    },
  };
  return config;
});
