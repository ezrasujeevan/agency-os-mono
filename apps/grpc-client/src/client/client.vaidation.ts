import { EnvironmentVariables, validateUtil } from '@agency-os/common';
import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';

export const CONFIG_JWT = 'agency-os-config-jwt';

export interface Igrpc_jwt {
  jwt: {
    secret: string;
    expiresIn: string;
    issuer: string;
  };
}

class MS_GRPC_AUTH extends EnvironmentVariables {
  //postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]

  @IsString()
  JWT_SECRET: string;

  @IsString()
  @IsOptional()
  JWT_EXPIRY: string;

  @IsString()
  @IsOptional()
  JWT_ISSUER: string;
}

export const validate_jwt = registerAs(CONFIG_JWT, (): Igrpc_jwt => {
  const configs: MS_GRPC_AUTH = validateUtil(process.env, MS_GRPC_AUTH);
  const config: Igrpc_jwt = {
    jwt: {
      secret: configs.JWT_SECRET,
      expiresIn: configs.JWT_EXPIRY ? configs.JWT_EXPIRY : '1d',
      issuer: configs.JWT_ISSUER ? configs.JWT_ISSUER : 'Agency-OS',
    },
  };
  return config;
});
