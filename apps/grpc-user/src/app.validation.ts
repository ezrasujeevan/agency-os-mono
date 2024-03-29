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

interface IAppEnvironmentVariables {
  NODE_ENV: Environment;
  PORT: number;
  HOST: string;
}

class AppEnvironmentVariables
  extends EnvironmentVariables
  implements IAppEnvironmentVariables
{
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsUrl()
  HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;
}

export interface Igrpc_app {
  env: string;
  app: {
    host: string;
    port: number;
  };
}

export const validate_app = registerAs(CONFIG_APP, (): Igrpc_app => {
  const configs: IAppEnvironmentVariables = validateUtil(
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
