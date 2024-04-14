import { EnvironmentVariables, validateUtil } from '@agency-os/common';
import { registerAs } from '@nestjs/config';
import { IsNumber, IsUrl, Max, Min } from 'class-validator';

export const CONFIG_GRPC_USER = 'agency-os-config-grpc-user';

class AppEnvironmentVariables extends EnvironmentVariables {
  @IsUrl({ require_port: true, require_tld: false })
  GRPC_USER_URL: string;

  @IsUrl({ require_tld: false })
  GRPC_USER_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  GRPC_USER_PORT: number;
}

export interface Iapp_grpc_user {
  user: {
    url: string;
    host: string;
    port: number;
  };
}

export const validate_user = registerAs(
  CONFIG_GRPC_USER,
  (): Iapp_grpc_user => {
    const configs: AppEnvironmentVariables = validateUtil(
      process.env,
      AppEnvironmentVariables,
    );
    const config: Iapp_grpc_user = {
      user: {
        host: configs.GRPC_USER_HOST,
        port: configs.GRPC_USER_PORT,
        url: configs.GRPC_USER_URL,
      },
    };
    return config;
  },
);
