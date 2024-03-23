import { ClassConstructor, plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsUrl,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export interface IEnvironmentVariables {
  Node_env: string;
  host: string;
  port: number;
}

export abstract class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsUrl()
  HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;
}

export const validateUtil = (
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<any>,
) => {
  const validatedConfig = plainToInstance(envVariablesClass, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
